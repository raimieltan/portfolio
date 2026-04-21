export const profile = {
  name: "Sean Raimiel Tan",
  title: "Senior Full-Stack Software Engineer",
  location: "San Jose, San Miguel, Iloilo, Philippines",
  timezone: "GMT+8 — remote across time zones",
  email: "raimieltan@gmail.com",
  phone: "+63 909 985 1434",
  github: "https://github.com/raimieltan",
  resumeHref: "/Sean_Tan_Resume.pdf",
  status: "Open to senior / staff backend and full-stack roles",
  headline:
    "Senior engineer shipping production backends, SaaS platforms, and AI-native products.",
  summary:
    "Six years designing, building, and scaling cloud-native backend services paired with polished React and React Native frontends. I've shipped a production ride-hailing mobile platform rated 4.3★ on both app stores with real-time geolocation, architected multi-tenant SaaS systems on NestJS, Prisma, and PostgreSQL, and led a team of seven engineers delivering AI-integrated products across international time zones.",
};

export const stats = [
  { value: "6+", label: "Years shipping production systems" },
  { value: "4.3★", label: "App Store rating, ride-hailing platform" },
  { value: "7", label: "Engineers led at Prometheus" },
  { value: "4+", label: "Multi-tenant SaaS products in production" },
];

export type Role = {
  company: string;
  title: string;
  period: string;
  present?: boolean;
  location?: string;
  bullets: string[];
  tags?: string[];
};

export const experience: Role[] = [
  {
    company: "K-12 SaaS · Confidential",
    title: "Senior Backend Engineer · Independent Contractor",
    period: "Jan 2026 — Present",
    present: true,
    bullets: [
      "Architect and develop the backend of a multi-tenant school-management SaaS on NestJS, Prisma, and PostgreSQL inside an Nx monorepo, serving multiple institutions.",
      "Design RESTful APIs with Swagger/OpenAPI, normalized relational schemas with deliberate indexing, and domain-driven module boundaries.",
      "Implement authentication, role-based authorization, and FERPA-aware handling of sensitive student data; enforce DTO validation with class-validator.",
      "Integrate external services and async workflows (Shopify/Printify commerce, Mux + Cloudflare R2 video pipeline) with retry logic, structured logging, and error reporting.",
      "Enforce engineering quality via SonarQube coverage gates, conventional commits, and rigorous PR review.",
    ],
    tags: ["NestJS", "Prisma", "PostgreSQL", "Nx", "Swagger", "FERPA"],
  },
  {
    company: "Property-Management SaaS · Confidential",
    title: "Fullstack Software Engineer · Independent Contractor",
    period: "Jan 2026 — Present",
    present: true,
    bullets: [
      "Build and maintain a property-management SaaS integrating with AppFolio APIs for near-real-time data synchronization.",
      "Implement idempotent sync pipelines (vendor, tenant, property, unit) with robust error handling, Sentry-based observability, and cron-driven batch jobs.",
      "Ship production features end-to-end across a Next.js + Node.js stack, including certification management and operational dashboards.",
    ],
    tags: ["Next.js", "Node.js", "AppFolio", "Sentry", "Cron"],
  },
  {
    company: "Jhelord Taxi Connect",
    title: "Fullstack Mobile Developer · Freelance",
    period: "Sep 2024 — Mar 2025",
    bullets: [
      "Built and shipped a production ride-hailing platform on React Native and Express.js with PostgreSQL; published on Apple App Store and Google Play with a 4.3★ rating.",
      "Implemented real-time geolocation tracking via the Google Maps API, token-based authentication, and push notifications on a high-traffic, latency-sensitive architecture.",
      "Designed backend services for ride dispatching, user and driver management, and geospatial queries; modeled data for performance under real-time read/write load.",
      "Owned the full delivery lifecycle: requirements, system design, implementation, app-store submission, and post-launch iteration.",
    ],
    tags: ["React Native", "Express", "PostgreSQL", "Google Maps", "Push"],
  },
  {
    company: "Prometheus",
    title: "Lead Software Engineer",
    period: "2024 — Feb 2026",
    bullets: [
      "Led a team of 7 engineers across multiple concurrent projects, including AI-integrated platforms and SaaS products.",
      "Delivered a Retrieval-Augmented Generation (RAG) solution using Azure AI Search, integrating LLM-based inference with enterprise knowledge sources.",
      "Deployed production REST APIs to Azure with containerized Docker builds, CI/CD pipelines, and monitoring; recommended stacks and set coding standards for new projects.",
      "Translated product requirements into technical user stories, ran sprint planning, and mentored junior engineers through code review.",
    ],
    tags: ["Leadership", "Azure", "RAG", "LLM", "Docker", "CI/CD"],
  },
  {
    company: "Mevvn",
    title: "Frontend / AI Software Engineer",
    period: "2024 — Dec 2025",
    bullets: [
      "Designed and shipped AI-driven web applications with a focus on inference performance, scalability, and reliability.",
      "Integrated machine-learning models into production services, exposing them through REST endpoints consumed by web and mobile clients.",
      "Built backend components and data-handling utilities wrapping modern AI/LLM frameworks, applying prompt engineering patterns and model versioning.",
    ],
    tags: ["AI/ML", "LLM", "Prompt Engineering", "REST"],
  },
  {
    company: "Prometheus",
    title: "Associate Software Engineer",
    period: "2023 — 2024",
    bullets: [
      "Led full development lifecycle — requirements, UX, backend implementation, and deployment — on AWS (EC2, Lightsail).",
      "Built backend services including a healthcare accounting system with strict data-security, auditability, and compliance requirements (client confidential).",
      "Implemented CI/CD pipelines and Dockerized services to streamline delivery.",
    ],
    tags: ["AWS", "Docker", "Healthcare", "Compliance"],
  },
  {
    company: "3D-Printing Business · Confidential",
    title: "Fullstack Developer · Freelance",
    period: "Apr 2025 — May 2025",
    bullets: [
      "Built n8n-driven automation agents and AI-assisted workflows to streamline business operations and customer interactions.",
    ],
    tags: ["n8n", "Automation", "AI Workflows"],
  },
  {
    company: "Kaya Founders",
    title: "Software Engineer Intern",
    period: "2022 — 2023",
    bullets: [
      "Built a fullstack e-commerce platform for digital art (React.js + Node.js) at an early-stage startup studio.",
    ],
    tags: ["React", "Node.js", "E-commerce"],
  },
  {
    company: "Stacktrek Enterprise",
    title: "Instructor / Trainer & Content Creator",
    period: "2019 — 2023",
    bullets: [
      "Trained aspiring developers in fullstack web development, Python, and modern backend frameworks.",
      "Authored programming challenges and automated assessments on the company's evaluation platform.",
    ],
    tags: ["Teaching", "Python", "Curriculum"],
  },
];

export type Project = {
  title: string;
  role: string;
  summary: string;
  stack: string[];
  highlights?: string[];
  link?: { label: string; href: string };
  feature?: boolean;
};

export const projects: Project[] = [
  {
    title: "Jhelord Taxi Connect",
    role: "Solo Fullstack Mobile — Production",
    summary:
      "A production ride-hailing platform shipped to both app stores, built for high-traffic, latency-sensitive real-time geolocation and dispatching.",
    stack: ["React Native", "Expo", "Express.js", "PostgreSQL", "Google Maps API"],
    highlights: [
      "4.3★ on Apple App Store and Google Play",
      "Real-time geolocation and dispatching",
      "Push notifications + token-based auth",
    ],
    feature: true,
  },
  {
    title: "Multi-Tenant K-12 SaaS",
    role: "Senior Backend · Client Confidential",
    summary:
      "Backend architecture for a multi-tenant school-management SaaS serving multiple institutions, with FERPA-aware handling of sensitive student data.",
    stack: ["NestJS", "Prisma", "PostgreSQL", "Nx", "Swagger"],
    highlights: [
      "Domain-driven modules in an Nx monorepo",
      "Shopify/Printify + Mux + Cloudflare R2 integrations",
      "SonarQube coverage gates enforced on every PR",
    ],
    feature: true,
  },
  {
    title: "Prometheus RAG Platform",
    role: "Lead Engineer — AI Integration",
    summary:
      "Retrieval-Augmented Generation solution integrating LLM inference with enterprise knowledge sources, deployed with containerized CI/CD to Azure.",
    stack: ["Azure AI Search", "LLM", "Docker", "CI/CD", "REST APIs"],
    highlights: [
      "Led a team of 7 engineers",
      "Set architectural direction and coding standards",
      "Production monitoring and deployment pipelines",
    ],
    link: {
      label: "Read case study →",
      href: "/writing/rag-azure-search-nestjs",
    },
    feature: true,
  },
  {
    title: "Property-Management SaaS",
    role: "Fullstack · Client Confidential",
    summary:
      "Near-real-time AppFolio sync with idempotent pipelines, cron-driven batch jobs, and operational dashboards for property operators.",
    stack: ["Next.js", "Node.js", "AppFolio API", "Sentry", "Cron"],
    highlights: [
      "Idempotent vendor / tenant / property / unit sync",
      "Sentry observability end-to-end",
      "Certification management flows",
    ],
  },
  {
    title: "Healthcare Accounting System",
    role: "Backend · Client Confidential",
    summary:
      "Healthcare accounting backend with strict data-security, auditability, and compliance requirements, deployed on AWS EC2 / Lightsail.",
    stack: ["Node.js", "AWS EC2", "AWS Lightsail", "Docker", "CI/CD"],
  },
  {
    title: "3D-Printing Business · Automation",
    role: "Freelance · Client Confidential",
    summary:
      "n8n-driven automation agents and AI-assisted workflows to streamline operations and customer interactions for a 3D-printing business.",
    stack: ["n8n", "LLM", "Webhooks", "Automation"],
  },
  {
    title: "Garage Hub",
    role: "Personal Project · Open Source",
    summary:
      "Fullstack workshop-management app with JWT authentication, file uploads, and markdown-backed notes — built on Next.js 16, Prisma 7, and PostgreSQL with a shadcn/ui front end.",
    stack: [
      "Next.js 16",
      "React 19",
      "Prisma",
      "PostgreSQL",
      "shadcn/ui",
      "Tailwind",
      "JWT Auth",
    ],
    link: {
      label: "github.com/raimieltan/garage-hub",
      href: "https://github.com/raimieltan/garage-hub",
    },
  },
  {
    title: "Draft Survey",
    role: "Personal Project · Open Source",
    summary:
      "Web utility for draft-survey calculations with spreadsheet export — a focused Next.js 16 + xlsx app with a clean single-purpose UI.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind", "xlsx"],
    link: {
      label: "github.com/raimieltan/draft-survey",
      href: "https://github.com/raimieltan/draft-survey",
    },
  },
  {
    title: "Bybit FVG Trading Bot",
    role: "Personal Project · Open Source",
    summary:
      "Automated Fair Value Gap trading bot for Bybit cryptocurrency futures. Bybit REST integration with HMAC request signing, time-zone-aware scheduling, and Recharts-powered analytics.",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Bybit API",
      "Axios",
      "crypto-js",
      "Recharts",
      "Tailwind",
    ],
    link: {
      label: "github.com/raimieltan/trading-bot",
      href: "https://github.com/raimieltan/trading-bot",
    },
  },
  {
    title: "Expense Tracker",
    role: "Personal Project · Open Source",
    summary:
      "Personal-finance web app with JWT auth, Prisma + PostgreSQL persistence, Chart.js analytics, and a React Three Fiber visualization layer for 3D data displays.",
    stack: [
      "Next.js 14",
      "Prisma",
      "PostgreSQL",
      "JWT Auth",
      "Chart.js",
      "React Three Fiber",
      "Three.js",
    ],
    link: {
      label: "github.com/raimieltan/expense-tracker",
      href: "https://github.com/raimieltan/expense-tracker",
    },
  },
  {
    title: "Project Sekyu",
    role: "Personal Project · Unity Game",
    summary:
      "Unity game project in C# with custom HLSL/GLSL shaders — a cross-discipline foray into game development, rendering, and real-time graphics.",
    stack: ["Unity", "C#", "HLSL", "GLSL", "ShaderLab"],
    link: {
      label: "github.com/raimieltan/project_sekyu",
      href: "https://github.com/raimieltan/project_sekyu",
    },
  },
];

export type SkillGroup = { heading: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    heading: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java", "C#"],
  },
  {
    heading: "Backend & APIs",
    items: [
      "Node.js",
      "NestJS",
      "Express.js",
      "Prisma",
      "Django",
      "Flask",
      "REST / OpenAPI",
      "GraphQL",
      "Microservices",
      "Async / webhook integrations",
      "Caching",
      "Performance tuning",
    ],
  },
  {
    heading: "Frontend & Mobile",
    items: [
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "Tailwind CSS",
      "Google Maps",
      "Push notifications",
    ],
  },
  {
    heading: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "SQL/NoSQL modeling", "Indexing", "Migrations"],
  },
  {
    heading: "Cloud & DevOps",
    items: [
      "AWS (EC2, Lightsail, S3)",
      "Azure (REST, AI Search)",
      "Docker",
      "GitHub Actions",
      "GitLab CI",
      "Bitbucket Pipelines",
      "Sentry",
      "SonarQube",
    ],
  },
  {
    heading: "AI / ML",
    items: [
      "Production LLM integration",
      "Retrieval-Augmented Generation",
      "Prompt engineering",
      "Azure AI Search",
      "Hugging Face",
      "PyTorch",
      "TensorFlow",
    ],
  },
  {
    heading: "Architecture & Tooling",
    items: [
      "Distributed system patterns",
      "Nx monorepos (pnpm)",
      "Domain-driven boundaries",
      "Event-driven & cron pipelines",
      "Observability",
      "Git / GitHub / GitLab / Bitbucket",
      "Postman",
    ],
  },
  {
    heading: "Leadership",
    items: [
      "Team leadership & mentoring",
      "Code review culture",
      "Sprint planning",
      "Agile (Scrum, Kanban)",
      "Remote cross-time-zone collaboration",
    ],
  },
];

export const education = [
  {
    school: "Central Philippine University",
    degree: "Bachelor of Science in Software Engineering",
    period: "2018 — 2023",
    note: "Dean's Lister",
  },
  {
    school: "Regional Science High School for Region VI",
    degree: "Secondary Education",
    period: "2012 — 2018",
    note: "Graduated with High Honors",
  },
];

export const marqueeTokens = [
  "TypeScript",
  "NestJS",
  "Next.js",
  "React Native",
  "Prisma",
  "PostgreSQL",
  "Azure AI Search",
  "RAG",
  "LLM",
  "Docker",
  "AWS",
  "Nx monorepo",
  "GraphQL",
  "Node.js",
  "Python",
  "Tailwind",
];
