export interface ProjectImpactMetric {
  id: string;
  value: string;
  label: string;
  caption: string;
  tag: string;
  accent: 'green' | 'yellow' | 'lilac';
}

export interface ProjectImpact {
  sectionLabel: string;
  beforeHeadline: string;
  afterHeadline: string;
  metrics: ProjectImpactMetric[];
  disclaimer: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badgeColor: 'lilac' | 'yellow' | 'green' | 'white';
  description: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  architectureDiagram?: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
  impact?: ProjectImpact | null;
  isPrimary?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'Industry' | 'Academic';
  bulletPoints: string[];
  tags: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: { name: string; iconKey: string; level?: string }[];
}

export interface Principle {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    firstName: string;
    lastName: string;
    shortGreeting: string;
    tagline: string;
    subRole: string;
    college: string;
    degree: string;
    location: string;
    email: string;
    phone: string;
    phoneCallUrl: string;
    resumeUrl: string;
    resumeFilename: string;
    contactUrl: string;
    gmailComposeUrl: string;
    bio: string;
    socials: {
      github: string | null;
      linkedin: string | null;
      leetcode: string | null;
      email: string;
      phone?: string;
    };
  };
  triad: {
    node1: { label: string; subtext: string; icon: string };
    node2: { label: string; subtext: string; icon: string };
    node3: { label: string; subtext: string; icon: string };
    center: string;
  };
  projects: Project[];
  experiences: Experience[];
  skills: SkillCategory[];
  principles: Principle[];
  achievements: {
    title: string;
    metric: string;
    description: string;
    highlight: string;
  }[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Harshil Rajyaguru",
    firstName: "HARSHIL",
    lastName: "RAJYAGURU",
    shortGreeting: "HI, I'M",
    tagline: "I build the systems behind the screen, experiment with ideas, and turn problems into products. Take a look around and explore what I've been creating.",
    subRole: "SOFTWARE ENGINEER · AI",
    college: "The LNM Institute of Information Technology (LNMIIT)",
    degree: "B.Tech in Computer Science and Engineering (2023 - Present)",
    location: "Ahmedabad, Gujarat · Jaipur, Rajasthan",
    email: "harshilrajyaguru22@gmail.com",
    phone: "+91 9408224391",
    phoneCallUrl: "tel:+919408224391",
    resumeUrl: "/files/Harshil_Rajyaguru_Resume.pdf",
    resumeFilename: "Harshil_Rajyaguru_Resume.pdf",
    contactUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=harshilrajyaguru22@gmail.com",
    gmailComposeUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=harshilrajyaguru22@gmail.com",
    bio: "Computer Science and Engineering student at LNMIIT with a strong command of Data Structures & Algorithms, Operating Systems, OOP, DBMS, and Computer Networks. Grounded in software engineering principles, from algorithmic optimization and memory management to concurrency control, transaction processing, database design, and scalable system architecture. Focused on engineering reliable, high-performance software by reasoning about complexity, consistency, fault tolerance, and architectural trade-offs.",
    socials: {
      github: "https://github.com/harshilrajyaguru",
      linkedin: "https://www.linkedin.com/in/harshil-rajyaguru-3b56b7286/",
      leetcode: "https://leetcode.com/u/harshilrajyaguru22/",
      email: "https://mail.google.com/mail/?view=cm&fs=1&to=harshilrajyaguru22@gmail.com",
      phone: "tel:+919408224391"
    }
  },
  triad: {
    node1: {
      label: "CONCURRENCY",
      subtext: "OCC & Idempotency",
      icon: "ShieldAlert"
    },
    node2: {
      label: "SYSTEM DESIGN",
      subtext: "Distributed Ledgers & Queues",
      icon: "Cpu"
    },
    node3: {
      label: "AGENTIC AI",
      subtext: "Multi-Agent & Safety Loops",
      icon: "Bot"
    },
    center: "CORE CRAFT"
  },
  projects: [
    {
      id: "vetanam",
      title: "Vetanam",
      subtitle: "Distributed Payment Ledger & High-Throughput Transaction Engine",
      category: "Featured System · Primary",
      badgeColor: "green",
      isPrimary: true,
      description: "A production-grade distributed payment ledger engineered with strict double-entry accounting principles, Optimistic Concurrency Control (OCC), and idempotent transactions to guarantee zero double-spending.",
      highlights: [
        "Maintained 0 double-spends and 0 negative balances across 1,000+ simulated concurrent transfers verified under k6 stress testing.",
        "Built asynchronous transfer pipeline with Redis and BullMQ, sustaining 500 concurrent transfers with <100ms p95 latency and zero duplicate ledger entries.",
        "Engineered JWT authentication, RBAC, distributed rate limiting, and immutable audit logs.",
        "Integrated Google Gemini API for real-time AI-driven fraudulent transaction detection before ledger commits.",
        "Delivered 17+ REST APIs with Dockerized deployment, GitHub Actions CI/CD pipeline, Swagger/OpenAPI documentation, and 77 automated tests (100% pass rate)."
      ],
      metrics: [
        { label: "Double-Spends", value: "0" },
        { label: "p95 Latency", value: "<100ms" },
        { label: "k6 Simulated Transfers", value: "1,000+" },
        { label: "Automated Tests", value: "77 (100% Pass)" }
      ],
      tags: ["Node.js", "Express.js", "MongoDB", "Redis", "BullMQ", "Docker", "Google Gemini API", "Swagger", "k6"],
      githubUrl: "https://github.com/harshilrajyaguru/vetanam-payment-ledger",
      liveUrl: "https://vetanam-payment-ledger.vercel.app/login",
      impact: {
        sectionLabel: "01 / PAYMENT RELIABILITY",
        beforeHeadline: "What can go wrong when money moves concurrently?",
        afterHeadline: "Correctness by design. Performance under concurrency.",
        metrics: [
          {
            id: "double-spends",
            value: "0",
            label: "Double-Spends",
            caption: "Double-spends and negative balances across 1,000+ simulated transfers.",
            tag: "ZERO LOSS",
            accent: "green"
          },
          {
            id: "latency",
            value: "<100 ms",
            label: "p95 Latency",
            caption: "p95 latency when testing 500 concurrent transfers.",
            tag: "HIGH CONCURRENCY",
            accent: "yellow"
          },
          {
            id: "tests",
            value: "77",
            label: "Automated Tests",
            caption: "Automated tests, with a 100% pass rate.",
            tag: "100% PASS RATE",
            accent: "lilac"
          }
        ],
        disclaimer: "Reported results from automated testing and simulated/concurrent transfer validation; not a claim of independently verified production performance."
      }
    },
    {
      id: "saarthi",
      title: "Saarthi",
      subtitle: "5-Agent Classroom Orchestration & Multi-Agent AI System",
      category: "Featured Project · AI Engineering",
      badgeColor: "lilac",
      isPrimary: false,
      description: "An intelligent multi-agent classroom orchestration platform coordinating 5 specialized agents to deliver structured instruction while mitigating hallucinations and enforcing schema safety.",
      highlights: [
        "Architected a 5-agent classroom orchestration system (AWS Bedrock + Google ADK) with a single-writer orchestrator enforcing strict schema contracts.",
        "Resolved contended instructional resources across concurrently taught virtual classrooms.",
        "Designed a 3-layer Responsible AI safety pipeline (deterministic rules, factual validation checks, and adversarial LLM review) implementing bias/hallucination mitigation and output guardrails.",
        "Implemented bounded regeneration policies with human-in-the-loop escalation triggers.",
        "Validated system reliability across 76 automated tests spanning individual agent behaviors, full adaptive-loop integration, and live Amazon Bedrock execution."
      ],
      metrics: [
        { label: "Coordinated Agents", value: "5" },
        { label: "Safety Pipeline", value: "3 Layers" },
        { label: "Integration Tests", value: "76 Passed" },
        { label: "Schema Violation", value: "0%" }
      ],
      tags: ["Python", "Amazon Bedrock", "Google ADK", "FastAPI", "React", "Pydantic", "Docker"],
      githubUrl: "https://github.com/harshilrajyaguru/Saarthi",
      liveUrl: "https://saarthi-harshil15.vercel.app",
      impact: {
        sectionLabel: "02 / MULTI-GRADE CLASSROOM ORCHESTRATION",
        beforeHeadline: "Too many moving parts. No single, reliable next step.",
        afterHeadline: "Specialized agents. One coordinated decision.",
        metrics: [
          {
            id: "agents",
            value: "5",
            label: "Specialist Agents",
            caption: "Specialist agents coordinating with a single-writer orchestrator.",
            tag: "MULTI-AGENT",
            accent: "lilac"
          },
          {
            id: "safety",
            value: "0.98",
            label: "Safety Score",
            caption: "Independent quality gate safety score in demonstration scenario.",
            tag: "GUARDRAIL APPROVED",
            accent: "green"
          },
          {
            id: "tests",
            value: "76",
            label: "Validation Tests",
            caption: "Automated integration tests validating Bedrock agent loops.",
            tag: "100% PASS RATE",
            accent: "yellow"
          }
        ],
        disclaimer: "Demonstration scenario inputs and software validation metrics; not a claim of real-world school deployment learning outcomes."
      }
    },
    {
      id: "6g-vanet",
      title: "6G VANET Simulation & Traffic Research",
      subtitle: "High-Throughput Network Traffic Pipeline for Explainable IDS",
      category: "Research Project · Systems",
      badgeColor: "yellow",
      isPrimary: false,
      description: "An end-to-end vehicular network simulation pipeline for high-speed 6G vehicular ad-hoc networks (VANET), capturing ultra-dense network telemetry for explainable intrusion detection research.",
      highlights: [
        "Built a multi-simulator synchronization pipeline integrating OMNeT++, Simu5G, Veins, INET, and SUMO.",
        "Generated a labeled dataset of 1.02M+ network traffic records across 49 behavioral and packet-level features.",
        "Simulated complex urban mobility patterns alongside millimetre-wave/terahertz 5G-6G radio channel characteristics.",
        "Designed structured telemetry extraction to benchmark explainable AI models for real-time intrusion detection."
      ],
      metrics: [
        { label: "Traffic Records", value: "1.02M+" },
        { label: "Extracted Features", value: "49" },
        { label: "Simulators Integrated", value: "5" },
        { label: "Research Domain", value: "6G Security" }
      ],
      tags: ["OMNeT++", "Simu5G", "Veins", "INET", "SUMO", "Python"],
      githubUrl: null,
      liveUrl: null
    }
  ],
  experiences: [
    {
      id: "cerebulb",
      role: "Software Developer Intern",
      organization: "Cerebulb",
      location: "Gandhinagar, Gujarat",
      period: "Jan 2026 - July 2026",
      type: "Industry",
      bulletPoints: [
        "Built 10+ reusable React.js components for an industrial solutions demo platform, structuring a scalable UI architecture to support multiple product demos from a shared codebase.",
        "Integrated 20+ RESTful backend API endpoints with client-side state management to minimize redundant calls and maintain high responsiveness across demo scenarios.",
        "Worked within an Agile SDLC: participating in sprint planning, raising and reviewing pull requests, and using Git for version control while owning frontend features end-to-end."
      ],
      tags: ["React.js", "RESTful APIs", "State Management", "Git", "Agile SDLC"]
    },
    {
      id: "lnmiit-ta",
      role: "Teaching Assistant - Artificial Intelligence",
      organization: "The LNM Institute of Information Technology",
      location: "Jaipur, Rajasthan",
      period: "Aug 2026 - Present",
      type: "Academic",
      bulletPoints: [
        "Mentored a cohort of 80+ undergraduate students in Artificial Intelligence lab sessions, breaking down search algorithms, game-playing strategies, and knowledge-based agents.",
        "Resolved 100+ debugging, algorithmic, and systems implementation issues per semester to strengthen students' abilities to independently build, test, and troubleshoot AI solutions."
      ],
      tags: ["Artificial Intelligence", "Mentorship", "Search Algorithms", "Game Theory", "Debugging"]
    }
  ],
  skills: [
    {
      id: "backend",
      name: "BACKEND & CONCURRENCY",
      description: "Distributed architectures, transaction isolation, Optimistic Concurrency Control (OCC), idempotent APIs, and high-throughput pipelines.",
      skills: [
        { name: "Node.js", iconKey: "node" },
        { name: "Express.js", iconKey: "express" },
        { name: "FastAPI", iconKey: "fastapi" },
        { name: "Spring Boot", iconKey: "spring" },
        { name: "RESTful APIs", iconKey: "api" },
        { name: "Concurrency Control", iconKey: "concurrency" },
        { name: "Distributed Systems", iconKey: "distributed" },
        { name: "JWT / RBAC", iconKey: "security" }
      ]
    },
    {
      id: "data-cloud",
      name: "DATA & INFRASTRUCTURE",
      description: "In-memory caching, message queues, relational & document datastores, containerization, and automated CI/CD workflows.",
      skills: [
        { name: "Redis", iconKey: "redis" },
        { name: "BullMQ", iconKey: "queue" },
        { name: "MongoDB", iconKey: "mongodb" },
        { name: "MySQL / SQL", iconKey: "sql" },
        { name: "Docker", iconKey: "docker" },
        { name: "Nginx", iconKey: "nginx" },
        { name: "CI/CD & Git", iconKey: "git" },
        { name: "Swagger / OpenAPI", iconKey: "swagger" }
      ]
    },
    {
      id: "languages",
      name: "LANGUAGES & CORE",
      description: "Strong foundation in typed languages, object-oriented design, systems programming, and high-performance algorithms.",
      skills: [
        { name: "Java", iconKey: "java" },
        { name: "C++", iconKey: "cpp" },
        { name: "Python", iconKey: "python" },
        { name: "TypeScript", iconKey: "typescript" },
        { name: "JavaScript", iconKey: "javascript" },
        { name: "SQL", iconKey: "database" }
      ]
    },
    {
      id: "ai-systems",
      name: "AI & AGENTIC SYSTEMS",
      description: "Multi-agent coordination, LLM safety guardrails, schema contracts, structured outputs, prompt engineering, and cloud AI SDKs.",
      skills: [
        { name: "Amazon Bedrock", iconKey: "aws" },
        { name: "Google ADK / Gemini", iconKey: "gemini" },
        { name: "Multi-Agent Systems", iconKey: "agents" },
        { name: "LLM Guardrails", iconKey: "guardrail" },
        { name: "RAG Pipelines", iconKey: "rag" },
        { name: "Pydantic Schemas", iconKey: "pydantic" }
      ]
    }
  ],
  principles: [
    {
      id: 1,
      number: "01",
      title: "Understand Before Building",
      description: "First figure out what is actually wrong. Then decide what to build.",
      icon: "Brain"
    },
    {
      id: 2,
      number: "02",
      title: "Own the Finish",
      description: "Getting it to work is one thing. Making sure it still works in edge cases is another.",
      icon: "CheckCircle2"
    },
    {
      id: 3,
      number: "03",
      title: "Remove Unnecessary Complexity",
      description: "Prefer the simplest solution that actually works and stays easy to modify later.",
      icon: "Minimize2"
    },
    {
      id: 4,
      number: "04",
      title: "Evidence Over Assumptions",
      description: "Don't guess what the issue is. Measure it, test it, and let the data tell you.",
      icon: "Search"
    },
    {
      id: 5,
      number: "05",
      title: "Learn With Intention",
      description: "When something breaks or confuses you, treat it as a chance to dig in and learn how it works.",
      icon: "BookOpen"
    },
    {
      id: 6,
      number: "06",
      title: "Make Others More Effective",
      description: "Write clear docs, share context early, and help unblock teammates whenever you can.",
      icon: "Users"
    },
    {
      id: 7,
      number: "07",
      title: "Correctness Is a Feature",
      description: "Protect invariants, validate boundaries, and treat failure cases as real design requirements.",
      icon: "Shield"
    },
    {
      id: 8,
      number: "08",
      title: "Design for Change",
      description: "Keep components decoupled so when requirements shift, you only touch what actually needs to move.",
      icon: "Workflow"
    },
    {
      id: 9,
      number: "09",
      title: "Make Progress Verifiable",
      description: "Build in small steps so you can test what works instead of guessing.",
      icon: "Zap"
    },
    {
      id: 10,
      number: "10",
      title: "Work Within Constraints",
      description: "You rarely have infinite time or compute. Put effort where it genuinely makes a difference.",
      icon: "Lightbulb"
    },
    {
      id: 11,
      number: "11",
      title: "Make Your Work Dependable",
      description: "Be clear about progress, flag blockers early, and close the loop on every commitment.",
      icon: "Target"
    },
    {
      id: 12,
      number: "12",
      title: "Find the Root Cause",
      description: "Don't just patch the symptom. Find out why it happened.",
      icon: "Terminal"
    },
    {
      id: 13,
      number: "13",
      title: "Disagree With Reason",
      description: "Speak up if you see a flaw, bring evidence, and once a decision is made, back the team 100%.",
      icon: "MessageSquareQuote"
    },
    {
      id: 14,
      number: "14",
      title: "Measure What Matters",
      description: "Know what success looks like before you start tuning, then verify if your fix actually helped.",
      icon: "TrendingUp"
    },
    {
      id: 15,
      number: "15",
      title: "Build for Collaboration",
      description: "Write code that someone else can read and maintain without needing to call you.",
      icon: "HeartHandshake"
    },
    {
      id: 16,
      number: "16",
      title: "Consider the Consequences",
      description: "Think about security, privacy, and who gets affected when your system fails.",
      icon: "Globe"
    }
  ],
  achievements: [
    {
      title: "Data Structures & Algorithms",
      metric: "700+ Problems",
      description: "Solved 700+ algorithmic problems across LeetCode and GeeksforGeeks, demonstrating deep command of graphs, trees, dynamic programming, and concurrency.",
      highlight: "LeetCode & GFG"
    },
    {
      title: "Deloitte Hacksplosion 2026",
      metric: "Top ~1,300 Pre-Finalist",
      description: "Selected as Pre-Finalist in the GenAI track among 21,000+ pan-India registrations for innovative agentic AI system design.",
      highlight: "GenAI Track Pre-Finalist"
    },
    {
      title: "6G VANET Intrusion Research",
      metric: "1.02M+ Telemetry Dataset",
      description: "Generated 1.02M+ multi-feature network traffic records across 49 attributes by orchestrating OMNeT++, Simu5G, Veins, and SUMO for explainable IDS models.",
      highlight: "Systems Research"
    }
  ]
};
