// =============================================================
// RESUME DATA — Edit this file with YOUR information
// =============================================================
// This single file powers every section of your AI resume site.
// Replace the sample data below with your own, then deploy.
//
// Tip: Search for "CHANGE ME" to find everything you need to update.
// =============================================================

// --- Personal Info (Hero + Navbar) ---

export const personal = {
  name: "Linus Thofte",
  initials: "LT",
  title: "Cognitive Scientist & AI Developer",
  tagline: "Designing new ways of interaction with technology at the intersection of cognition, AI, and creativity",
  availability: "Open to full-time opportunities",
  techTags: ["Next.js", "TypeScript", "AI/LLM", "Supabase", "Cognitive Science"],
};

// --- Experience ---

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  bullets?: string[];
  sections?: { title: string; bullets: string[] }[];
};

export const experienceSummary =
  "Cognitive scientist with 4+ years of learning design experience and a growing full-stack AI development skillset. From designing courses at Sana Labs, to building an AI career guidance platform, to researching memory preservation at Kioku AI — each role deepened my expertise across cognition, technology, and creative expression.";

export const experiences: ExperienceEntry[] = [
  {
    company: "Kioku AI",
    role: "Market & User Researcher",
    period: "2024–2025",
    bullets: [
      "Researched the landscape of memory preservation and collaboration, shaping the product vision for transforming how we access and interact with memories",
      "Analysed market trends and identified key features to inform the MVP roadmap",
      "Contributed to strategic development and competitive positioning",
    ],
  },
  {
    company: "Sana Labs",
    role: "Instructional & Learning Designer",
    period: "2020–2025",
    bullets: [
      "Created comprehensive courses for 15+ clients across sales management, information security, compliance, risk management, and onboarding",
      "Designed personalized learning paths and developed assessments for major corporations including EQT, Skandia, Frontify, and Avepoint",
      "Created multimedia content and supported course implementation across the Sana Labs platform",
    ],
  },
  {
    company: "Malmö City",
    role: "Community & Housing Support",
    period: "2023–2024",
    bullets: [
      "Provided mental health support services in Malmö Municipality",
      "Delivered crisis intervention, daily assistance, and treatment coordination for clients with psychiatric conditions",
      "Collaborated with healthcare and social services to ensure stable housing and integrated care outcomes",
    ],
  },
];

// --- Skills (with proficiency levels for skill bars) ---
// level: 0-100 — controls the visual bar width. Be honest!

export type Skill = { name: string; level: number };

export const strongSkills: Skill[] = [
  { name: "Learning & Instructional Design", level: 92 },
  { name: "AI & Prompt Engineering", level: 88 },
  { name: "Cognitive Science & Research", level: 85 },
  { name: "React & Next.js", level: 80 },
  { name: "TypeScript", level: 78 },
  { name: "Music Production & Sound Design", level: 82 },
];

export const moderateSkills: Skill[] = [
  { name: "Supabase & PostgreSQL", level: 65 },
  { name: "Security Engineering", level: 60 },
  { name: "REST API Design", level: 60 },
  { name: "Human-Computer Interaction", level: 65 },
  { name: "Market & User Research", level: 60 },
];

export const gapSkills: Skill[] = [
  { name: "Automated Testing (Jest, Playwright)", level: 25 },
  { name: "DevOps & CI/CD", level: 20 },
  { name: "Containerization (Docker)", level: 15 },
];

// --- Certifications ---
// icon options: "Shield", "Cloud", "Award", "Container", "Lock", "Server"

export type Certification = {
  name: string;
  issuer: string;
  icon: "Shield" | "Cloud" | "Award" | "Container" | "Lock" | "Server";
};

export const certifications: Certification[] = [
  { name: "BSc Cognitive Science", issuer: "Linköping University", icon: "Award" },
  { name: "BA Electronic Music Production", issuer: "Catalyst Berlin", icon: "Award" },
  { name: "AI & Generative AI", issuer: "Nackademin", icon: "Shield" },
  { name: "AI Security & Risk Management", issuer: "Nackademin", icon: "Lock" },
  { name: "Prompt Engineering & GenAI", issuer: "Nackademin", icon: "Cloud" },
  { name: "AI Law & Ethics (EU AI Act, GDPR)", issuer: "Nackademin", icon: "Server" },
];

// --- AI Chat ---

export const chatTitle = `Chat with ${personal.name.split(" ")[0]}'s AI`;

export const suggestedQuestions = [
  "What's your background in cognitive science and AI?",
  "Tell me about the Mentra project you built",
  "What was your role at Sana Labs?",
  "Would you be a good fit for an AI/learning design role?",
];

// --- Fit Check (example job descriptions) ---
// Write one that matches your skills well, and one that doesn't.

export const fitCheckStrongExample = `AI & Learning Experience Designer — EdTech Company

We're looking for someone who combines cognitive science with AI to design next-generation learning experiences. You'll shape how our platform uses AI to personalize education.

Requirements:
- Background in cognitive science, learning design, or educational technology
- Experience designing courses and learning paths
- Familiarity with AI/LLM tools and prompt engineering
- Understanding of UX research and human-computer interaction
- Bonus: Full-stack development skills (React, TypeScript)`;

export const fitCheckWeakExample = `Senior DevOps Engineer — Enterprise Cloud Infrastructure

We need an experienced DevOps engineer to manage our Kubernetes clusters, CI/CD pipelines, and cloud infrastructure at scale.

Requirements:
- 5+ years of DevOps/SRE experience
- Expert-level Kubernetes and Docker orchestration
- Terraform and infrastructure-as-code expertise
- AWS/GCP certification required
- On-call rotation and incident management experience`;
