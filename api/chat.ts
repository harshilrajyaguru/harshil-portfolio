import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';
import Groq from 'groq-sdk';

const GroqClient = (Groq as any).default || Groq;

const RESUME_URL = '/files/Harshil_Rajyaguru_Resume.pdf';

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
    return true;
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

export interface KnowledgeSection {
  id: string;
  topic: string;
  title: string;
  keywords: string[];
  content: string;
}

export const PORTFOLIO_KNOWLEDGE_BASE: KnowledgeSection[] = [
  {
    id: 'personal_background',
    topic: 'Background & Education',
    title: 'Harshil Rajyaguru - Identity, Education & Core Focus',
    keywords: [
      'harshil', 'who is', 'background', 'education', 'college', 'lnmiit', 'degree',
      'cgpa', 'gpa', 'graduation', 'about', 'bio', 'location', 'interests', 'contact',
      'resume', 'cv', 'download resume', 'resume link'
    ],
    content: `
Harshil Rajyaguru is a Computer Science and Engineering undergraduate student at The LNM Institute of Information Technology (LNMIIT), Jaipur, Rajasthan (2023 - 2027 expected graduation).
Current CGPA: 7.07 / 10.0.
Location: Ahmedabad, Gujarat and Jaipur, Rajasthan.
Email: harshilrajyaguru22@gmail.com
Phone: +91 9408224391 (Call: tel:+919408224391)
Resume / CV (Direct Download): [Download Harshil's Resume](/files/Harshil_Rajyaguru_Resume.pdf)
GitHub: https://github.com/harshilrajyaguru
LinkedIn: https://www.linkedin.com/in/harshil-rajyaguru-3b56b7286/
LeetCode: https://leetcode.com/u/harshilrajyaguru22/ (700+ problems solved)

Core Engineering Philosophy & Focus:
Harshil is grounded in fundamental software engineering principles:
- Algorithmic optimization and low-level memory reasoning
- Distributed systems architecture, consistency models, and fault tolerance
- Concurrency control, transaction processing, and database indexing
- Agentic AI systems with deterministic safety loops and guardrails
Strong command over Data Structures & Algorithms, Operating Systems, OOP, DBMS, and Computer Networks.
`
  },
  {
    id: 'skills_and_achievements',
    topic: 'Technical Skills & Achievements',
    title: 'Technical Skills, Problem Solving & Competition Honors',
    keywords: [
      'skills', 'languages', 'tech stack', 'technologies', 'dsa', 'leetcode',
      'achievements', 'awards', 'deloitte', 'hacksplosion', 'strengths', 'python', 'java', 'cpp'
    ],
    content: `
Technical Skills:
- Languages: Java, C++, Python, JavaScript, TypeScript, SQL, Bash.
- Backend & Systems: Node.js, Express.js, FastAPI, BullMQ, REST APIs, Webhooks, Idempotency architectures.
- Databases & Caching: MongoDB, PostgreSQL, Redis (distributed locks, caching, key expiration), Mongoose.
- Cloud, AI & DevOps: Amazon Bedrock (Claude, Titan), Google Gemini API, Docker, Docker Compose, Git, GitHub Actions CI/CD, Swagger/OpenAPI, Linux.
- Frontend: React, TypeScript, Tailwind CSS / Vanilla CSS, Responsive UI Design.
- Core Disciplines: Concurrency Control (OCC, multi-document transactions), Double-Entry Accounting, Distributed Task Queues, Multi-Agent Systems, Schema Validation (Pydantic, Joi).

Key Achievements:
- 700+ Data Structures & Algorithms problems solved across LeetCode and competitive programming platforms, demonstrating deep command of graph theory, dynamic programming, trees, and concurrency.
- Pre-Finalist at Deloitte Hacksplosion 2026 (GenAI Track) — ranked among top ~1,300 teams out of 21,000+ national student registrations with an innovative generative AI application.
`
  },
  {
    id: 'experience_cerebulb',
    topic: 'Work Experience - CereBulb',
    title: 'Software Engineer Intern at CereBulb (May 2024 - July 2024)',
    keywords: [
      'cerebulb', 'intern', 'internship', 'experience', 'work', 'job', 'react', 'api'
    ],
    content: `
CereBulb — Software Engineer Intern (May 2024 - July 2024, Gandhinagar, Gujarat):
- Engineered 10+ reusable, production-ready React components with TypeScript and modern styling for an industrial IoT solutions demo platform.
- Integrated 20+ REST API endpoints handling real-time telemetry display, device monitoring, and operational state synchronization.
- Collaborated in an Agile sprint cadence, contributing to code reviews, PR audits, and version-controlled feature delivery using Git.
`
  },
  {
    id: 'experience_ta',
    topic: 'Academic Experience - Teaching Assistant',
    title: 'Teaching Assistant for Artificial Intelligence at LNMIIT (Aug 2024 - Dec 2024)',
    keywords: [
      'teaching assistant', 'ta', 'lnmiit ta', 'mentorship', 'ai lab', 'lab assistant'
    ],
    content: `
Teaching Assistant — Artificial Intelligence (CS304), LNMIIT (August 2024 - December 2024):
- Mentored 80+ third-year CSE undergraduate students in weekly AI laboratory sessions.
- Guided students through state-space search algorithms (A*, minimax, alpha-beta pruning), heuristic optimization, and probabilistic reasoning.
- Resolved 100+ technical debugging and algorithmic implementation issues across Python and scientific computing libraries throughout the semester.
`
  },
  {
    id: 'vetanam_overview',
    topic: 'Vetanam Payment Ledger - Overview & Invariants',
    title: 'Vetanam: Distributed Payment Ledger & Transaction Engine',
    keywords: [
      'vetanam', 'ledger', 'payment', 'double-entry', 'accounting', 'transactions',
      'invariants', 'balance', 'negative balance', 'double spend'
    ],
    content: `
Vetanam is a production-grade distributed payment ledger engineered to guarantee mathematical financial correctness, zero double-spending, and zero negative balances under extreme concurrency.

Core Architectural Invariants:
1. Double-Entry Accounting Invariant: Every financial transfer consists of balanced debits and credits recorded in an immutable ledger journal. Money cannot appear or vanish arbitrarily: sum(debits) == sum(credits).
2. Non-Negative Balance Invariant: An account's balance can never drop below zero. Balance reductions are enforced atomically with transactional boundary checks.
3. Immutability: Ledger entries are append-only. Adjustments or reversals require balancing compensating journal entries rather than destructive database overwrites.
`
  },
  {
    id: 'vetanam_concurrency_and_idempotency',
    topic: 'Vetanam - Concurrency Control & Idempotency',
    title: 'Vetanam: Optimistic Concurrency Control, Redis Idempotency & BullMQ',
    keywords: [
      'occ', 'optimistic concurrency', 'concurrency', 'race condition', 'idempotency',
      'redis', 'bullmq', 'mongodb transactions', 'atomic', 'k6', 'latency', 'stress test'
    ],
    content: `
Technical Implementation in Vetanam:
1. Optimistic Concurrency Control (OCC):
   - Rather than holding heavy database-level pessimistic read/write locks that kill database throughput, Vetanam leverages versioned account documents (using MongoDB's '__v' sequence).
   - When a transfer commits, it executes a conditional atomic update: 'updateOne({ _id: accountId, __v: currentVersion }, { $inc: { balance: -amount, __v: 1 } })'.
   - If a concurrent transaction modified the account in the interim, the version mismatch triggers a transient transaction abort and retry policy, preventing race conditions without blocking concurrent readers.
2. Header-Based Idempotency with Redis:
   - Clients supply an 'Idempotency-Key' header on financial requests.
   - Redis checks and locks the key atomically using SETNX with an expiration TTL (e.g., 24 hours).
   - If a network failure occurs and the client retries the request, the server detects the cached key and returns the identical settled transfer receipt rather than re-executing the transfer.
3. Asynchronous BullMQ & Redis Transfer Queue:
   - Sustains bursts of concurrent transfers by offloading ledger entry persistence and notification jobs to background worker processes managed by BullMQ.
4. Deterministic Fraud Evaluation & Security:
   - Analyzes transfer velocity, sudden high-magnitude spikes, and unauthorized sender patterns before ledger mutation.
   - Protected with JWT authentication, refresh-token rotation, Role-Based Access Control (RBAC), and distributed sliding-window rate limiting.

Verified Testing Evidence:
- Verified under k6 distributed stress testing: 0 double-spends and 0 negative balances across 1,000+ simulated concurrent transfers.
- Sustained 500 concurrent transfers with <100ms p95 latency.
- 77 automated test suites with 100% pass rate covering unit logic, race conditions, and ledger reconciliation.
(Note: These are rigorous automated testing results from simulated stress validation, not claims from a commercial production banking deployment.)
`
  },
  {
    id: 'saarthi_overview_and_agents',
    topic: 'Saarthi AI Classroom Orchestration - 5 Agents',
    title: 'Saarthi: 5-Agent Classroom Orchestration Platform',
    keywords: [
      'saarthi', 'multi-agent', 'agents', 'specialist agents', 'orchestrator',
      'progress agent', 'curriculum agent', 'resource agent', 'activity agent',
      'bedrock', 'amazon bedrock', 'single writer'
    ],
    content: `
Saarthi is an intelligent multi-agent classroom orchestration platform engineered to solve the complex operational challenge of multi-grade, multi-level classrooms where one teacher must manage competing learning needs under strict time and resource constraints.

The 5 Specialist Agents (and their distinct boundaries):
1. Progress Agent:
   - Ingests student assessment signals and mastery trackers.
   - Diagnoses persistent learning deficits vs transient errors (e.g., identified a 42% decimal multiplication gap).
2. Curriculum Agent:
   - Reasons over educational syllabi and pedagogical dependencies.
   - Decides whether a grade should ADVANCE, HOLD, or receive targeted REMEDIATION.
3. Resource Agent:
   - Matches recommendations to physical classroom inventory (e.g. 5 shared digital tablets vs printed worksheets) and teacher instructional minutes.
4. Activity Agent:
   - Dynamically synthesizes targeted exercises, step-by-step instructions, and rubrics (e.g., "Decimal Place Value Fixer") tailored to the remediated grade.
5. Orchestrator Agent (The Single-Writer Authority):
   - Specialist agents return recommendations, but only the Orchestrator holds write authority over shared classroom state.
   - Resolves competing agent proposals (e.g., Curriculum recommending advance while Progress signals critical failure) using deterministic priority rules.
   - Strictly enforces Pydantic schema contracts to eliminate state corruption.

IMPORTANT ARCHITECTURAL DISTINCTION:
There are exactly 5 specialist agents, with the Orchestrator being one of the five. The Safety Gate is an INDEPENDENT verification pipeline, NOT a sixth specialist agent.
`
  },
  {
    id: 'saarthi_safety_gate_and_validation',
    topic: 'Saarthi - Responsible AI Safety Gate & Testing',
    title: 'Saarthi: 3-Layer Safety Gate & 76 Automated Tests',
    keywords: [
      'safety gate', 'responsible ai', 'hallucination', 'guardrails', 'pydantic',
      'bedrock validation', '76 tests', 'automated tests', 'strands sdk', 'adaptive loop'
    ],
    content: `
Saarthi's 3-Layer Responsible AI Safety Pipeline:
Before any generated activity or instruction reaches the teacher or students, it must pass through an independent safety gate:
- Layer 1: Deterministic Rules & Pydantic Schema Validation: Enforces structural integrity, required fields, bounded time parameters, and regex constraints.
- Layer 2: Factual Verification & Hallucination Checks: Cross-checks mathematical operations, problem consistency, and pedagogical age suitability.
- Layer 3: Adversarial LLM Review & Guardrails: Evaluates against safety, bias, offensive content, and unsafe physical instructions (e.g. asking children to run across classrooms).
If validation fails, the system executes bounded regeneration (up to 2 retries); if failure persists, it escalates to human-in-the-loop review.

Adaptive Classroom Feedback Loop:
Observe → Reason → Resolve Conflicts → Decide → Act → Monitor & Adapt.
Classroom signals enter, the 5 agents coordinate, safety validates the plan, and the teacher receives one single prioritized action card rather than a flood of conflicting agent outputs.

Verified Testing Evidence:
- Validated across 76 automated tests covering individual agent logic, full adaptive-loop coordination, and live Amazon Bedrock foundation model execution (Claude 3 / Titan).
- 100% test pass rate across unit, integration, safety-gate, orchestrator, and classroom-loop suites.
- Supports 7 regional languages for localization.
(Note: The 76 tests prove software safety and orchestration correctness; they are not empirical claims of measured student learning outcomes.)
`
  },
  {
    id: 'vanet_research',
    topic: '6G VANET Research & Telemetry Pipeline',
    title: '6G Vehicular Ad-Hoc Network (VANET) Simulation & Dataset Pipeline',
    keywords: [
      'vanet', '6g', 'omnet', 'simu5g', 'veins', 'sumo', 'telemetry', 'research', 'ids'
    ],
    content: `
6G VANET Simulation & Traffic Telemetry Research:
- Designed an end-to-end vehicular network simulation pipeline for high-speed 6G vehicular ad-hoc networks (VANETs).
- Co-simulated traffic dynamics and radio communications using OMNeT++, Simu5G (5G/6G radio protocol stack), Veins (vehicular framework), INET, and SUMO (Simulation of Urban MObility).
- Engineered network traffic extraction producing a labeled telemetry dataset of 1.02M+ high-resolution vehicle records across 49 network and mobility features.
- Developed to train and benchmark explainable Intrusion Detection Systems (IDS) against adversarial network attacks in dense autonomous vehicle fleets.
`
  },
  {
    id: 'portfolio_philosophy_and_principles',
    topic: 'Engineering Principles & Working Philosophy',
    title: 'Harshil Rajyaguru - Working Philosophy, Mindset & How I Think',
    keywords: [
      'philosophy', 'principles', 'how i think', 'mindset', 'values', 'thinking',
      'working style', 'culture', 'approach', 'craft', 'triad'
    ],
    content: `
Harshil's Engineering Triad (Core Craft):
1. Concurrency: OCC & Idempotency — Reason about race conditions, shared state mutation, and deterministic outcomes.
2. System Design: Distributed Ledgers & Queues — Build decoupled, resilient asynchronous pipelines that maintain invariants under load.
3. Agentic AI: Multi-Agent & Safety Loops — Orchestrate specialized models with strict schemas and independent verification gates.

Harshil's 16 Engineering Principles:
01. Edge Cases Define Quality — Getting it to work is one thing; making sure it still works in edge cases is what matters.
02. Remove Unnecessary Complexity — Prefer the simplest solution that actually works and stays easy to modify later.
03. Evidence Over Assumptions — Don't guess what the issue is. Measure it, test it, and let the data tell you.
04. Learn With Intention — When something breaks or confuses you, treat it as a chance to dig in and learn how it works.
05. Make Others More Effective — Write clear docs, share context early, and help unblock teammates whenever you can.
06. Correctness Is a Feature — Protect invariants, validate boundaries, and treat failure cases as real design requirements.
07. Design for Change — Keep components decoupled so when requirements shift, you only touch what actually needs to move.
08. Make Progress Verifiable — Build in small steps so you can test what works instead of guessing.
09. Work Within Constraints — You rarely have infinite time or compute. Put effort where it genuinely makes a difference.
10. Make Your Work Dependable — Be clear about progress, flag blockers early, and close the loop on every commitment.
11. Find the Root Cause — Don't just patch the symptom. Find out why it happened.
12. Disagree With Reason — Speak up if you see a flaw, bring evidence, and once a decision is made, back the team 100%.
13. Measure What Matters — Know what success looks like before you start tuning, then verify if your fix actually helped.
14. Build for Collaboration — Write code that someone else can read and maintain without needing to call you.
15. Consider the Consequences — Think about security, privacy, and who gets affected when your system fails.
16. Reason from First Principles — Understand the underlying mechanisms before reaching for abstractions.
`
  },
  {
    id: 'verified_links_and_socials',
    topic: 'Verified Profiles, Project Links & Contact',
    title: 'Verified Links, Repositories, Live Demos & Contact URLs',
    keywords: [
      'links', 'github', 'linkedin', 'leetcode', 'contact', 'email', 'social',
      'source code', 'repo', 'repository', 'demo', 'live demo', 'url', 'profile',
      'resume', 'cv', 'download', 'curriculum vitae', 'resume link'
    ],
    content: `
Verified Links and URLs for Harshil Rajyaguru:
- Harshil's Resume / CV (Direct Download): [Download Harshil's Resume](/files/Harshil_Rajyaguru_Resume.pdf)
- GitHub: [GitHub](https://github.com/harshilrajyaguru)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/harshil-rajyaguru-3b56b7286/)
- LeetCode: [LeetCode](https://leetcode.com/u/harshilrajyaguru22/)
- Email / Contact: [Email Harshil](https://mail.google.com/mail/?view=cm&fs=1&to=harshilrajyaguru22@gmail.com) (harshilrajyaguru22@gmail.com)
- Vetanam Source Code: [Vetanam Source Code](https://github.com/harshilrajyaguru/vetanam-payment-ledger)
- Vetanam Live Demo: [Vetanam Live Demo](https://vetanam-payment-ledger.vercel.app/login)
- Saarthi Source Code: [Saarthi Source Code](https://github.com/harshilrajyaguru/Saarthi)
- Saarthi Live Demo: [Saarthi Live Demo](https://saarthi-harshil15.vercel.app)

IMPORTANT RESUME RULE:
When asked for Harshil's resume, CV, download link, or where to find his resume, ALWAYS provide the direct clickable download link:
[Download Harshil's Resume](/files/Harshil_Rajyaguru_Resume.pdf)
Do NOT substitute LinkedIn and do NOT claim that no downloadable resume is available.

IMPORTANT LINK FORMATTING RULE:
Always format links using standard Markdown links with clean labels, such as [GitHub](https://github.com/harshilrajyaguru) or [Vetanam Source Code](https://github.com/harshilrajyaguru/vetanam-payment-ledger).
NEVER use raw angle-bracket URL syntax like <https://...> or display excessively long naked URLs.
`
  }
];

export function retrieveRelevantKnowledge(query: string, maxSections: number = 3): KnowledgeSection[] {
  const normalized = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const tokens = normalized.split(/\s+/).filter((t) => t.length > 2);

  const scored = PORTFOLIO_KNOWLEDGE_BASE.map((section) => {
    let score = 0;

    for (const kw of section.keywords) {
      if (normalized.includes(kw)) {
        score += 8;
      } else {
        const kwParts = kw.split(/\s+/);
        for (const part of kwParts) {
          if (tokens.includes(part)) score += 3;
        }
      }
    }

    const contentLower = section.content.toLowerCase();
    for (const token of tokens) {
      if (contentLower.includes(token)) score += 1;
    }

    if (normalized.includes('vetanam') && section.id.startsWith('vetanam')) score += 15;
    if (normalized.includes('saarthi') && section.id.startsWith('saarthi')) score += 15;
    if ((normalized.includes('test') || normalized.includes('validation')) && (section.id.includes('testing') || section.id.includes('validation'))) score += 10;
    if ((normalized.includes('who is') || normalized.includes('about harshil') || normalized.includes('tell me about')) && section.id === 'personal_background') score += 20;

    if (
      (normalized.includes('resume') || normalized.includes('cv') || normalized.includes('curriculum vitae')) &&
      (section.id === 'verified_links_and_socials' || section.id === 'personal_background')
    ) {
      score += 40;
    }

    if (
      (normalized.includes('link') || normalized.includes('github') || normalized.includes('linkedin') || normalized.includes('repo') || normalized.includes('demo') || normalized.includes('contact') || normalized.includes('email') || normalized.includes('leetcode')) &&
      section.id === 'verified_links_and_socials'
    ) {
      score += 25;
    }

    if (
      (normalized.includes('principle') || normalized.includes('philosophy') || normalized.includes('how you think') || normalized.includes('how he thinks') || normalized.includes('values') || normalized.includes('mindset')) &&
      section.id === 'portfolio_philosophy_and_principles'
    ) {
      score += 25;
    }

    return { section, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const relevant = scored.filter((item) => item.score > 0).slice(0, maxSections).map((item) => item.section);

  if (relevant.length === 0) {
    return [PORTFOLIO_KNOWLEDGE_BASE[0], PORTFOLIO_KNOWLEDGE_BASE[1]];
  }

  return relevant;
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

  const resumeUrl = RESUME_URL;
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
    const groq = new GroqClient({ apiKey });

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
