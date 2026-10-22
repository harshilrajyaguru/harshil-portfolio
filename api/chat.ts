import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';
import Groq from 'groq-sdk';
import { retrieveRelevantKnowledge } from '../src/data/knowledgeBase';
import { portfolioData } from '../src/data/portfolioData';

// Helper to verify whether the actual resume PDF exists on disk or in deployment
function checkResumeFileExists(): boolean {
  try {
    const candidatePaths = [
      path.join(process.cwd(), 'public', 'files', 'Harshil_Rajyaguru_Resume.pdf'),
      path.join(process.cwd(), 'public', 'files', 'Harshil_Resume.pdf')
    ];
    if (candidatePaths.some((p) => fs.existsSync(p))) {
      return true;
    }
  } catch {
    // ignore
  }
  // In Vercel serverless functions, public assets are served directly from the CDN edge
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    return Boolean(portfolioData?.personal?.resumeUrl);
  }
  return false;
}

// Load environment variables server-side from .env.local / .env if not already present
function loadLocalEnv(): void {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const envPath = path.join(process.cwd(), file);
    if (fs.existsSync(envPath)) {
      try {
        const content = fs.readFileSync(envPath, 'utf8');
        for (const line of content.split('\n')) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx !== -1) {
            const key = trimmed.slice(0, eqIdx).trim();
            const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
            if (key && (!process.env[key] || process.env[key]?.trim() === '')) {
              process.env[key] = val;
            }
          }
        }
      } catch {
        // ignore
      }
    }
  }
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  message?: string;
  history?: ChatMessage[];
}

// In-memory rate limiting map: IP -> timestamp array
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(clientIp) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(clientIp, validTimestamps);
  return false;
}

// Parse request body helper for Vercel Serverless / Node HTTP
async function parseBody(req: any): Promise<ChatRequestBody> {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk: any) => {
      raw += chunk;
      if (raw.length > 50000) {
        req.destroy();
        resolve({});
      }
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw || '{}'));
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

function sendJson(res: any, status: number, data: any) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(status).json(data);
  }
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

export default async function handler(req: any, res: any) {
  // CORS & Options check
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method Not Allowed. Use POST.' });
  }

  // Basic rate limiting
  const forwardedFor = (req.headers && (req.headers['x-forwarded-for'] || req.headers['x-real-ip'])) || 'anonymous';
  const clientIp = Array.isArray(forwardedFor) ? forwardedFor[0] : String(forwardedFor).split(',')[0].trim();

  if (isRateLimited(clientIp)) {
    return sendJson(res, 429, {
      error: 'Rate limit exceeded. Please wait a minute before sending more messages.'
    });
  }

  const body = await parseBody(req);
  const userMessage = (body.message || '').trim();
  const rawHistory: ChatMessage[] = Array.isArray(body.history) ? body.history : [];

  if (!userMessage) {
    return sendJson(res, 400, { error: 'Message content is required.' });
  }

  if (userMessage.length > 1000) {
    return sendJson(res, 400, { error: 'Message exceeds the 1,000 character limit. Please shorten your question.' });
  }

  // Bound conversation history to last 8 messages
  const boundedHistory = rawHistory.slice(-8);

  // Combine user query with recent conversation context for follow-up retrieval
  const lastUserTurn = rawHistory.filter((m) => m.role === 'user').slice(-1)[0]?.content || '';
  const retrievalQuery = lastUserTurn ? `${lastUserTurn} ${userMessage}` : userMessage;

  // Retrieve relevant knowledge sections
  const relevantSections = retrieveRelevantKnowledge(retrievalQuery, 3);
  const retrievedContext = relevantSections
    .map((sec) => `### SECTION: ${sec.title} (${sec.topic})\n${sec.content.trim()}`)
    .join('\n\n');

  // Verify server environment variable for Groq API from environment or .env.local
  loadLocalEnv();
  const apiKey = process.env.GROQ_API_KEY;
  const modelName = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';

  if (!apiKey) {
    return sendJson(res, 503, {
      error: 'Chat is temporarily unavailable. Please try again later.'
    });
  }

  const resumeUrl = portfolioData.personal.resumeUrl;
  const isResumeAvailable = checkResumeFileExists();

  const systemInstruction = `
You are "Talk with Harshil", an articulate, technically sharp AI assistant representing Harshil Rajyaguru on his software engineering portfolio website.

YOUR ROLE & IDENTITY:
- You showcase Harshil's background, engineering work, projects, technical skills, and problem-solving approach.
- You speak *about* Harshil in the third person ("Harshil is...", "In Vetanam, Harshil engineered...", "His approach was..."). Never impersonate Harshil or claim personal first-person experiences ("I built").
- Default to concise, well-structured conversational answers. Format identifiers, files, and technologies with \`inline code\`.

CRITICAL QUERY ROUTING & BEHAVIOR RULES (MANDATORY):

1. QUESTIONS ABOUT HARSHIL'S PORTFOLIO & WORK (ANSWER DEEPLY & NORMALLY):
- Do NOT refuse or redirect questions about:
  * Harshil's skills, technical strengths, background, education (LNMIIT CSE), CGPA (7.07), or experience (CereBulb, AI TA).
  * Vetanam's architecture, concurrency control (OCC with MongoDB '__v'), idempotency (Redis SETNX), ledger correctness, BullMQ, or 77 automated tests.
  * Saarthi's multi-agent workflow, 5 specialist agents, single-writer orchestrator, 3-layer Responsible AI safety gate, or 76 Bedrock tests.
  * 6G VANET simulation pipeline (OMNeT++, Simu5G, Veins, SUMO) and 1.02M+ dataset.
  * Harshil's 16 principles, working philosophy, and core triad.
  * His GitHub, LinkedIn, LeetCode, contact email, live demos, or repository links.
- Answer these thoroughly, technically, and conversationally, using the verified facts below and your own engineering reasoning to explain how and why mechanisms work together.

2. UNRELATED STANDALONE TECHNICAL / CODING QUESTIONS (PLAYFUL HIRING CTA):
- You are Harshil's portfolio representative, NOT a general-purpose coding assistant or free homework solver.
- When someone asks a random or standalone technical question that is NOT about Harshil's portfolio or projects, such as:
  * "Reverse a linked list."
  * "Solve this random LeetCode problem."
  * "Write a sorting algorithm."
  * "Explain an unrelated coding problem."
  * "Build me a random React application."
  DO NOT solve the problem or generate extensive code.
  Instead, respond with this short, confident, playful hiring-oriented message:
  "Looking for a solution to that? 👀 Harshil enjoys tackling challenging engineering problems. [Hire Harshil](https://mail.google.com/mail/?view=cm&fs=1&to=harshilrajyaguru22@gmail.com) to find out how he'd approach it.

Want to know what he's built? Ask me about Vetanam, Saarthi, or his engineering experience."
- Keep the tone friendly, witty, confident, and professional. Do not sound rude or arrogant.

3. INTERVIEW-STYLE QUESTIONS ABOUT HARSHIL'S THINKING:
- If someone asks a general interview question specifically to understand Harshil's technical thinking (e.g. "How does Harshil approach race conditions?" or "How would he handle cache stampedes?"):
  Briefly answer by connecting it to how he solved similar challenges in Vetanam (OCC, Redis idempotency) or Saarthi (single-writer orchestrator), rather than blindly refusing.

4. UNRELATED NON-TECHNICAL OR RANDOM QUESTIONS:
- For unrelated requests such as general trivia, entertainment, weather, or casual non-portfolio questions, politely explain that you focus on Harshil's work:
  "I'm best at talking about Harshil's engineering work. Ask me about his projects, technical decisions, or experience."
  Do not force the hiring message into these non-technical conversations.

5. RESUME & CV REQUESTS (MANDATORY DIRECT DOWNLOAD):
- When asked for Harshil's resume or CV, use the configured portfolio resume URL and return a direct clickable download link. Do not substitute LinkedIn or claim the resume is unavailable if the configured file exists. For links and contact details, use the portfolio's verified configuration rather than guessing.
${isResumeAvailable ? `- When someone asks questions such as:
  "Give me the resume download link."
  "Can I download Harshil's resume?"
  "Share his CV."
  "Where can I find his resume?"
  Return a clickable Markdown link with this exact label and destination:
  [Download Harshil's Resume](${resumeUrl})
- Do NOT substitute LinkedIn, do NOT claim that no downloadable resume is available, and do NOT invent another URL or use href="#".` : `- If the PDF is missing, do not pretend it exists or provide a broken link; politely inform the user that the updated resume is being finalized and invite them to connect via [Hire Harshil](https://mail.google.com/mail/?view=cm&fs=1&to=harshilrajyaguru22@gmail.com).`}

LINK FORMATTING RULES:
- When mentioning profiles, repositories, demos, resume, or email, ALWAYS format them as standard, clean Markdown links:
  * Resume / CV: [Download Harshil's Resume](${resumeUrl})
  * GitHub: [GitHub](https://github.com/harshilrajyaguru)
  * LinkedIn: [LinkedIn](https://www.linkedin.com/in/harshil-rajyaguru-3b56b7286/)
  * LeetCode: [LeetCode](https://leetcode.com/u/harshilrajyaguru22/)
  * Hire / Contact: [Hire Harshil](https://mail.google.com/mail/?view=cm&fs=1&to=harshilrajyaguru22@gmail.com)
  * Vetanam Source Code: [Vetanam Source Code](https://github.com/harshilrajyaguru/vetanam-payment-ledger)
  * Vetanam Live Demo: [Vetanam Live Demo](https://vetanam-payment-ledger.vercel.app/login)
  * Saarthi Source Code: [Saarthi Source Code](https://github.com/harshilrajyaguru/Saarthi)
  * Saarthi Live Demo: [Saarthi Live Demo](https://saarthi-harshil15.vercel.app)
- NEVER use raw angle-bracket links like <https://...> or output naked long URLs.

VERIFIED KNOWLEDGE CONTEXT:
${retrievedContext}
`.trim();

  try {
    const groq = new Groq({ apiKey });

    // Format conversation history for Groq chat completions
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      {
        role: 'system',
        content: systemInstruction
      }
    ];

    for (const msg of boundedHistory) {
      messages.push({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      });
    }

    // Add current user prompt
    messages.push({
      role: 'user',
      content: userMessage
    });

    const completion = await groq.chat.completions.create({
      model: modelName,
      messages,
      temperature: 0.35,
      max_tokens: 900
    });

    const replyText =
      completion.choices[0]?.message?.content ||
      'I was unable to generate an answer at this moment. Please try asking again.';

    return sendJson(res, 200, {
      reply: replyText,
      modelUsed: modelName,
      retrievedSections: relevantSections.map((s) => s.id)
    });
  } catch (error: any) {
    const errorMsg = String(error?.message || error || '');
    console.error('Groq API Error in /api/chat:', errorMsg);

    // Clean, visitor-friendly error handling without leaking technical details
    return sendJson(res, 503, {
      error: 'Chat is temporarily unavailable. Please try again later.'
    });
  }
}

