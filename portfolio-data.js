/**
 * ==============================================================================
 * PORTFOLIO DATA CONFIGURATION
 * ==============================================================================
 * All texts, links, social media handles, image URLs, metrics, projects, skills,
 * and experience records are centralized in this single file.
 * 
 * To update your portfolio in the future, simply edit the values below!
 * ==============================================================================
 */

const PORTFOLIO_DATA = {
  // --- Personal & Contact Information ---
  personal: {
    fullName: "Mohit Mehra",
    preferredName: "Mohit",
    title: "Software Development Engineer - 2 (SDE-2)",
    badge: "Open to Senior & SDE-2 Opportunities",
    location: "Delhi, India",
    email: "mehramohit532@gmail.com",
    phone: "+91 9625945952",
    avatarUrl: "https://avatars.githubusercontent.com/u/98013205?v=4",
    bioShort: "Full Stack & Distributed Systems Engineer specializing in high-throughput microservices, event-driven pipelines on RabbitMQ/Kafka, and production AI tooling (Model Context Protocol).",
    bioDetailed: `Full Stack Software Engineer with 3+ years of experience engineering internal and customer-facing financial platforms supporting ~1,000 requests per second in production. Architect of internal Model Context Protocol (MCP) AI tooling platforms adopted across engineering teams, and designer of asynchronous event-driven architectures that slashed synchronous processing overhead by 80%. Dedicated to clean architecture, automated CI/CD, deep observability with Grafana, and mentoring engineering teams.`,
    yearsExperience: "3+",
    currentCompany: "VFPL Capital",
    currentRole: "Software Development Engineer - 2",
    currentPeriod: "September 2023 – Present",
    resumeDownloadFileName: "Mohit_Mehra_SDE2_Resume.pdf"
  },

  // --- External & Social Links ---
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/M0hitMehra",
      icon: "github",
      label: "M0hitMehra",
      color: "#2ea44f"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mohit-mehra-6ba923227/",
      icon: "linkedin",
      label: "Mohit Mehra",
      color: "#0a66c2"
    },
    {
      name: "Email",
      url: "mailto:mehramohit532@gmail.com",
      icon: "mail",
      label: "mehramohit532@gmail.com",
      color: "#ea4335"
    },
    {
      name: "Phone",
      url: "tel:+919625945952",
      icon: "phone",
      label: "+91 9625945952",
      color: "#34a853"
    }
  ],

  // --- Core Engineering Performance Metrics (Reference App Dials & Gauges) ---
  systemMetrics: [
    {
      id: "traffic",
      label: "Production Throughput",
      value: "1,000+",
      unit: "RPS",
      percentage: 85,
      accent: "cyan",
      description: "Sustained customer-facing financial traffic"
    },
    {
      id: "overhead",
      label: "Sync Overhead Cut",
      value: "80%",
      unit: "Saved",
      percentage: 80,
      accent: "violet",
      description: "Via RabbitMQ asynchronous job pipelines"
    },
    {
      id: "latency",
      label: "Query Speedup",
      value: "30s → 10s",
      unit: "Heavy Aggs",
      percentage: 70,
      accent: "amber",
      description: "100ms → 20ms common query optimization"
    },
    {
      id: "uptime",
      label: "Service Reliability",
      value: "99.98%",
      unit: "Uptime",
      percentage: 99,
      accent: "emerald",
      description: "Keycloak SSO, Grafana alerting & Docker"
    }
  ],

  // --- Work Experience ---
  experience: [
    {
      company: "VFPL Capital",
      role: "Software Development Engineer - 2 (SDE-2)",
      period: "September 2023 – Present",
      location: "Delhi, India",
      type: "Full-Time",
      description: "Leading core backend architecture, event-driven microservices, and AI workflow integration for enterprise financial operations.",
      responsibilities: [
        "Design and build scalable, resilient REST APIs and microservices powering customer-facing financial products handling ~1,000 requests per second across authentication, validation, and multi-step business workflows.",
        "Architected an asynchronous, event-driven pipeline on RabbitMQ for notifications, PDF statement generation, and background tasks, cutting synchronous processing overhead by approximately 80% and dramatically bolstering system resilience.",
        "Engineered an internal Model Context Protocol (MCP) AI tooling platform with React/TypeScript frontend and FastAPI/Node.js backend, seamlessly integrated into VFPL Capital's engineering workflows to accelerate cross-team productivity.",
        "Led a MongoDB performance overhaul (schema redesign, strategic indexing, and aggregation pipeline optimization), cutting heavy query execution time from 30s to 10s and dropping standard query latency from 100ms to 20ms.",
        "Investigated and resolved a high-stakes transaction credit reversion bug, eliminating race conditions and restoring absolute ledger consistency across unlock operations.",
        "Diagnosed and resolved a critical production authentication outage tied to Keycloak realm configuration, establishing fortified identity policies with zero downtime.",
        "Hardened service security implementing OAuth 2.0, JWT, Keycloak SSO, and stringent input validation for sensitive financial data.",
        "Containerized services via Docker and built automated CI/CD pipelines with GitHub Actions; orchestrated end-to-end monitoring and alerting with Grafana.",
        "Drive engineering excellence: conduct PR reviews, mentor junior engineers, and enforce clean API documentation and architectural decision records (ADRs)."
      ],
      skillsUsed: ["Java", "Spring Boot", "Node.js", "Python", "FastAPI", "MongoDB", "RabbitMQ", "Kafka", "Docker", "Grafana", "Keycloak", "TypeScript", "MCP"]
    }
  ],

  // --- Featured Projects (Drawn from GitHub & Resume) ---
  projects: [
    {
      id: "mcp-ai-platform",
      title: "Model Context Protocol (MCP) AI Tooling Server",
      category: "ai",
      badge: "Flagship AI Platform",
      featured: true,
      description: "Full-stack Model Context Protocol server enabling LLM agents to communicate seamlessly with real-time enterprise tools, APIs, and data sources with low-latency Server-Sent Events (SSE) streaming.",
      highlights: [
        "Replaced inefficient polling with Server-Sent Events (SSE) for zero-lag streaming output",
        "Engineered resilient connection lifecycle with automated client reconnection and token auth",
        "Adopted internally across engineering teams to streamline automated developer workflows"
      ],
      techStack: ["Python", "FastAPI", "LangChain", "React.js", "TypeScript", "SSE", "MongoDB", "JWT"],
      githubUrl: "https://github.com/M0hitMehra/chat-mcp-fastapi",
      liveUrl: "https://chat-mcp-fastapi.onrender.com/",
      status: "Live in Production",
      icon: "cpu"
    },
    {
      id: "realdocs",
      title: "RealDocs — Real-Time Collaborative Workspace",
      category: "fullstack",
      badge: "Real-Time Collaboration",
      featured: true,
      description: "A Google Docs-style real-time collaborative document platform featuring rich-text editing, presence detection, granular workspace permissions, and cloud persistence.",
      highlights: [
        "Built responsive, modern rich editor with live state syncing and Supabase edge database",
        "Designed schema and typed queries using Drizzle ORM paired with PostgreSQL",
        "Crafted sleek, accessible UI components utilizing Tailwind CSS and shadcn/ui"
      ],
      techStack: ["Next.js", "TypeScript", "Drizzle ORM", "Supabase", "PostgreSQL", "shadcn/ui", "Tailwind CSS", "Zod"],
      githubUrl: "https://github.com/M0hitMehra/realdocs",
      liveUrl: "https://realdocs-silk.vercel.app/",
      status: "Live Demo",
      icon: "file-text"
    },
    {
      id: "ecommerce-platform",
      title: "Multi-Store E-Commerce & Admin CMS Suite",
      category: "fullstack",
      badge: "Enterprise E-Commerce",
      featured: true,
      description: "Production-grade dual-application ecosystem comprising a lightning-fast customer storefront and a central multi-store CMS admin console with Stripe checkout.",
      highlights: [
        "Architected multi-tenant administrative dashboard allowing dynamic product, category, and billboard control",
        "Seamless Stripe webhook checkout flow with optimistic inventory locking",
        "Optimized client state management with Zustand and Headless UI for fluid UX"
      ],
      techStack: ["Next.js 14", "TypeScript", "Stripe", "Zustand", "Tailwind CSS", "Headless UI", "REST APIs"],
      githubUrl: "https://github.com/M0hitMehra/ecommerceStore-next",
      adminGithubUrl: "https://github.com/M0hitMehra/e-commerce-admin",
      liveUrl: "https://ecommerce-store-next-six.vercel.app/",
      status: "Live Application",
      icon: "shopping-bag"
    },
    {
      id: "ext-torrent-web",
      title: "ExtTorrent Web — Neumorphic Media Explorer",
      category: "frontend",
      badge: "Hybrid Neumorphic UI",
      featured: true,
      description: "Next-generation streaming media application combining tactile Neumorphism and frosted Glassmorphism with dark/day visual modes, media filtering, and streaming controls.",
      highlights: [
        "Engineered tactile Neumorphic audio/video playback dials, cards, and theme toggles",
        "Integrated WebTorrent and HTML5 media APIs for responsive real-time streaming",
        "Fluid CSS layout with zero third-party UI framework bloat"
      ],
      techStack: ["JavaScript", "HTML5 Video API", "Neumorphic CSS", "WebTorrent", "Tailwind CSS"],
      githubUrl: "https://github.com/M0hitMehra/ext.torrent-web",
      liveUrl: "https://ext-torrent-web.vercel.app/",
      status: "Live Web App",
      icon: "film"
    },
    {
      id: "course-bundler",
      title: "CourseBundler — EdTech LMS Platform",
      category: "fullstack",
      badge: "Education Tech",
      featured: false,
      description: "Comprehensive online course subscription and streaming platform featuring role-based access control, secure video serving via Cloudinary, and payment gateway integration.",
      highlights: [
        "Implemented full student learning portal with lecture tracking, ratings, and certificates",
        "Admin panel for video uploading, subscription metrics, and user management",
        "Secured REST endpoints with JWT authentication and strict RBAC middleware"
      ],
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "Cloudinary", "Payment API"],
      githubUrl: "https://github.com/M0hitMehra/courseBundlerFrontend",
      backendGithubUrl: "https://github.com/M0hitMehra/courseBundlerServer",
      liveUrl: "https://coursebundler-ten.vercel.app/",
      status: "Live Project",
      icon: "book-open"
    },
    {
      id: "financial-event-pipeline",
      title: "High-Throughput Financial Event Processing Engine",
      category: "backend",
      badge: "Distributed Systems",
      featured: true,
      description: "Distributed messaging pipeline designed to ingest, process, and reconcile financial transactions asynchronously with dead-letter queue (DLQ) safeguards.",
      highlights: [
        "Processes asynchronous notification, PDF invoice generation, and audit logging",
        "Engineered with Spring Boot, RabbitMQ, and PostgreSQL with idempotent consumer semantics",
        "Full Grafana dashboard integration with custom Prometheus metrics for RPS and p99 latency"
      ],
      techStack: ["Java", "Spring Boot", "RabbitMQ", "Kafka", "PostgreSQL", "Docker", "Grafana", "Prometheus"],
      githubUrl: "https://github.com/M0hitMehra",
      liveUrl: null,
      status: "Internal Production",
      icon: "server"
    }
  ],

  // --- Technical Skills ---
  skillCategories: [
    {
      name: "System & Architecture",
      icon: "layers",
      skills: [
        { name: "Low-Level Design (LLD)", level: 92 },
        { name: "Distributed Systems", level: 88 },
        { name: "Microservices Architecture", level: 90 },
        { name: "REST & API Design", level: 95 },
        { name: "Event-Driven Architecture", level: 88 },
        { name: "Data Modeling", level: 90 }
      ]
    },
    {
      name: "Backend & Microservices",
      icon: "server",
      skills: [
        { name: "Java & Spring Boot", level: 86 },
        { name: "Node.js & Express.js", level: 92 },
        { name: "Python & FastAPI", level: 88 },
        { name: "Server-Sent Events (SSE)", level: 90 },
        { name: "API Performance Tuning", level: 90 }
      ]
    },
    {
      name: "Databases & Messaging",
      icon: "database",
      skills: [
        { name: "MongoDB (Aggregation & Indexing)", level: 92 },
        { name: "PostgreSQL & SQL", level: 88 },
        { name: "RabbitMQ Message Broker", level: 90 },
        { name: "Apache Kafka", level: 80 },
        { name: "Redis Caching", level: 82 }
      ]
    },
    {
      name: "AI Tooling & Modern Frontend",
      icon: "zap",
      skills: [
        { name: "Model Context Protocol (MCP)", level: 92 },
        { name: "LangChain & LLM Workflows", level: 85 },
        { name: "React.js & Next.js", level: 92 },
        { name: "TypeScript & JavaScript", level: 94 },
        { name: "Tailwind CSS & Neumorphic UI", level: 90 }
      ]
    },
    {
      name: "DevOps, Security & Reliability",
      icon: "shield",
      skills: [
        { name: "Docker Containerization", level: 88 },
        { name: "GitHub Actions CI/CD", level: 86 },
        { name: "Grafana & Prometheus", level: 85 },
        { name: "Keycloak SSO & OAuth 2.0", level: 88 },
        { name: "JWT & Spring Security", level: 90 }
      ]
    }
  ],

  // --- Education ---
  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science & Engineering",
      institution: "Bhagwan Mahaveer Institute of Engineering & Technology",
      period: "2019 – 2023",
      location: "India",
      highlights: [
        "Strong foundation in Algorithms, Data Structures, Operating Systems, DBMS & Computer Networks",
        "Built foundational projects in full-stack web and mobile development"
      ]
    }
  ],

  // --- Theme Defaults (Supports Light Mode & Dark Mode) ---
  themeConfig: {
    defaultTheme: "light", // "light" for Light Mode by default, "dark" for Dark Mode
    allowThemeToggle: true,
    enableTactileSounds: true // Subtle synthesized click sound on tactile button press
  }
};

// Make accessible to browser window or module environments
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
