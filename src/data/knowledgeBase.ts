/**
 * Ask Harshil - Portfolio Knowledge Base
 * Centralized, structured source of truth for the Ask Harshil conversational AI assistant.
 * Verified facts from portfolio data, resume, and project engineering documentation.
 */

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

/**
 * Lightweight relevance scoring to retrieve the top 2-3 knowledge sections matching the query.
 */
export function retrieveRelevantKnowledge(query: string, maxSections: number = 3): KnowledgeSection[] {
  const normalized = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const tokens = normalized.split(/\s+/).filter((t) => t.length > 2);

  const scored = PORTFOLIO_KNOWLEDGE_BASE.map((section) => {
    let score = 0;

    // Check keyword hits (weighted high)
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

    // Check content token hits
    const contentLower = section.content.toLowerCase();
    for (const token of tokens) {
      if (contentLower.includes(token)) score += 1;
    }

    // Special boosts for key project topics
    if (normalized.includes('vetanam') && section.id.startsWith('vetanam')) score += 15;
    if (normalized.includes('saarthi') && section.id.startsWith('saarthi')) score += 15;
    if ((normalized.includes('test') || normalized.includes('validation')) && (section.id.includes('testing') || section.id.includes('validation'))) score += 10;
    if ((normalized.includes('who is') || normalized.includes('about harshil') || normalized.includes('tell me about')) && section.id === 'personal_background') score += 20;

    // Boost for resume and CV queries
    if (
      (normalized.includes('resume') || normalized.includes('cv') || normalized.includes('curriculum vitae')) &&
      (section.id === 'verified_links_and_socials' || section.id === 'personal_background')
    ) {
      score += 40;
    }

    // Boost for link and contact queries
    if (
      (normalized.includes('link') || normalized.includes('github') || normalized.includes('linkedin') || normalized.includes('repo') || normalized.includes('demo') || normalized.includes('contact') || normalized.includes('email') || normalized.includes('leetcode')) &&
      section.id === 'verified_links_and_socials'
    ) {
      score += 25;
    }

    // Boost for philosophy, thinking, principles
    if (
      (normalized.includes('principle') || normalized.includes('philosophy') || normalized.includes('how you think') || normalized.includes('how he thinks') || normalized.includes('values') || normalized.includes('mindset')) &&
      section.id === 'portfolio_philosophy_and_principles'
    ) {
      score += 25;
    }

    return { section, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Filter sections with positive score, defaulting to personal background if query is generic
  const relevant = scored.filter((item) => item.score > 0).slice(0, maxSections).map((item) => item.section);

  if (relevant.length === 0) {
    return [PORTFOLIO_KNOWLEDGE_BASE[0], PORTFOLIO_KNOWLEDGE_BASE[1]];
  }

  return relevant;
}
