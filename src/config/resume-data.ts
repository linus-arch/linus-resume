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
  techTags: ["Next.js", "TypeScript", "AI/LLM", "Supabase", "Cognitive Science", "React", "Tailwind CSS", "PostgreSQL", "Vite", "Zustand", "Framer Motion", "Radix UI", "Prompt Engineering"],
};

export const heroQuotes = [
  "I help stakeholders navigate complex technical environments by structuring information into clear, actionable understanding",
  "I'm on a mission to bring cognitive design principles into technical operations and achieve the best user experience possible",
  "I'm passionate about building products that are not just usable, but genuinely helpful and engaging — especially when it comes to AI and learning experiences",
  "Designing the layer between technical systems and human understanding, crafting workflows where complexity is absorbed by good design rather than passed on to the user",
];

// --- Experience ---

export type ExperienceShowMore = {
  description: string;
  image?: string;
  link?: string;
  collaboratorName?: string;
  collaboratorLink?: string;
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  bullets?: string[];
  sections?: { title: string; bullets: string[] }[];
  showMore?: ExperienceShowMore;
};

export const experienceSummary =
  "Cognitive scientist with 4+ years of learning design experience and a growing full-stack AI development skillset. From designing courses at Sana Labs, to building an AI career guidance platform, to researching memory preservation at Kioku AI — each role deepened my expertise across cognition, technology, and creative expression.";

export const experienceSummaryQuotes = [
  "I help stakeholders navigate complex technical environments by structuring information into clear, actionable understanding",
  "I'm on a mission to bring cognitive design principles into technical operations and achieve the best user experience possible",
  "I'm passionate about building products that are not just usable, but genuinely helpful and engaging — especially when it comes to AI and learning experiences",
  "Designing the layer between technical systems and human understanding, crafting workflows where complexity is absorbed by good design rather than passed on to the user"
]

export const experiences: ExperienceEntry[] = [
  {
    company: "Vidhra",
    role: "Developer",
    period: "2025–now",
    bullets: [
      "Vidhra is an AI-powered career guidance platform combining conversational coaching, structured reflection exercises, and personalized insights to help people make better career decisions with confidence.",
    ],
    showMore: {
      description: `## Vidhra: AI Career Guidance, Built for Real Decisions

### Snapshot
Vidhra is an AI-powered career guidance platform that helps people move from uncertainty to action. Instead of generic advice, it combines conversational coaching, structured reflection exercises, and personalized insights so users can make better career decisions with more confidence.

The product is designed for modern guidance needs: fast feedback, continuous context, and practical next steps, all in a secure and user-friendly interface.

### The Problem
Most career support today is either:
- too generic (blogs and static templates),
- too expensive (one-on-one coaching at scale), or
- too fragmented (different tools for reflection, planning, and networking).

Users need one place where they can think, reflect, plan, and connect.

### The Vidhra Approach
Vidhra brings together four capabilities in one experience:
- AI Career Coaching: contextual chat that supports exploration, decision making, and goal setting.
- Guided Exercises: dynamic self-reflection and planning frameworks (for example SMART-style goals and values mapping).
- Career Insights Engine: automatic extraction of strengths, goals, blockers, and suggested next actions.
- Professional Matchmaking: compatibility-based networking suggestions for mentorship, collaboration, and peer support.

An optional voice layer makes the interaction feel more natural for users who prefer speaking over typing.

### Why It Stands Out
- Personalization over one-size-fits-all: guidance improves over time using user history and insight context.
- Action over inspiration: users do not just get ideas; they get structured next steps.
- Safety by design: multi-layer prompt-injection and abuse protection are built directly into the AI workflow.
- Product-ready foundation: authentication, data model, scripts, and documentation already support MVP deployment.

### Technology Stack

#### Frontend and Product UX
- Next.js 15 + React 18 + TypeScript
- Tailwind CSS 4 + Radix UI components
- Framer Motion and GSAP for interaction polish
- Zustand + React Context for state handling

#### AI and Intelligence Layer
- Groq-hosted LLM workflows for low-latency conversational responses
- AI SDK integration for structured model interaction
- Domain knowledge and FAQ routing to reduce cost and improve consistency
- Insight extraction pipelines for personalized guidance

#### Data and Platform
- Supabase (Postgres + Auth + API)
- Typed client integration with @supabase/supabase-js
- Matchmaking schema for profiles, suggestions, requests, connections, and messaging

#### Security and Reliability
- Input validation and sanitization
- Prompt hardening and output filtering
- Rate limiting and security event logging
- Environment-based key handling (no hardcoded secrets)

### Current Product Scope
- Swedish-first conversational experience with multilingual support patterns
- Interactive split-view coaching and exercises
- Career insight capture and profile enrichment
- Networking/matchmaking MVP with compatibility scoring and connection flows

### Who This Is For
- Career changers and early professionals who need clarity and momentum
- Schools, coaching programs, and employability initiatives needing scalable support
- Teams that want AI guidance without compromising on security or user trust

### Bottom Line
Vidhra is not just another chatbot. It is a practical career decision platform that combines coaching quality, product usability, and operational safety in one system.

If the goal is to help more people make better career moves, faster, Vidhra is a strong and credible starting point.`,
  image: "https://images.unsplash.com/photo-1516321318423-f06f70504504?w=1200&h=800&fit=crop",
  link: "https://karriarvagvisarenvidhra.vercel.app/ ",
  collaboratorName: "Schreber Consulting",
  collaboratorLink: "https://www.schreber.se/",
    },
  },
  {
    company: "Kioku AI",
    role: "Market & User Researcher",
    period: "2024–2025",
    bullets: [
      "My time at Kioku was where I first got properly absorbed in the question of how memory actually works — not just as a feature, but as a design problem worth solving. I researched how people preserve and return to experiences, which gradually shaped my thinking around what a product in this space could genuinely offer. That research fed into analysing where the market was falling short and what an MVP would need to get right from the start — both in terms of features and positioning.",
    ],
    showMore: {
      description: `## Kioku | AI Companion for Memories and Storytelling

### Overview
Kioku is a product focused on helping people preserve meaningful life moments in a more human way. Instead of storing memories as disconnected photos, clips, and notes, the platform brings them together into shared memory spaces where stories can be revisited, expanded, and talked through over time.

### My Contribution
I contributed to Kioku as part of a broader team effort, with a focus on shaping user-facing experiences and making the product feel personal, supportive, and easy to use. The core idea is simple: give people a place to collect memories, invite family or friends, and turn moments into stories that feel alive rather than archived.

### Guided Conversation & AI Companion
A key part of the experience is guided conversation. Users can interact with an AI companion that helps surface context, ask reflective prompts, and make it easier to recall details that might otherwise be forgotten. This creates a more meaningful interaction than a traditional photo feed and encourages ongoing engagement with personal history.

### Collaborative Memory-Building
Kioku also supports collaborative memory-building. Multiple people can contribute to the same memory space, which is especially valuable for family events, travel, and shared milestones. That collaborative layer helps create a richer, more complete narrative and makes the product feel social without becoming noisy.

### Product Philosophy
From a product perspective, what makes Kioku interesting is the emotional use case. It sits at the intersection of personal storytelling, memory preservation, and AI assistance. The goal is not just productivity, but connection: helping users reflect, remember, and share moments that matter.

### Roadmap & Priorities
In terms of direction, the roadmap is centered on deepening user value rather than just adding features. Near-term priorities include improving personalization so prompts and story suggestions feel more relevant, making storytelling outputs easier to share, and strengthening collaborative workflows for families and close groups. There is also a strong focus on trust, privacy, and quality of experience as the product scales.

### Bottom Line
Kioku is a strong example of thoughtful AI product design: technology in service of a deeply human need. It is the kind of project that sparks conversation because it combines practical utility with emotional resonance, and shows how AI can support people in ways that feel personal and meaningful.`,
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=800&fit=crop",
      link: "https://kioku.ai",
    },
  },
  {
    company: "Sana Labs",
    role: "Instructional & Learning Designer",
    period: "2020–2025",
    bullets: [
      "At Sana, I spent most of my time turning complex, often dry subject matter into something people actually wanted to engage with. Over 15 clients — ranging from EQT and Skandia to Frontify and Avepoint — I designed learning paths, built assessments, and produced the kind of multimedia content that makes compliance training feel less like a punishment. Getting a course to land well means understanding the person on the other end of it, and that instinct for usability and clarity has stayed with me across everything I've done since.",
    ],
  },
  {
    company: "Malmö City",
    role: "Community & Housing Support",
    period: "2023–2024",
    bullets: [
      "providing day-to-day support, coordinating care and navigating the space between healthcare and social services for clients with psychiatric conditions in Malmö Municipality.",
    ],
  },
];

// --- Open Explorations (Project ideas seeking collaborators) ---

export type OpenExploration = {
  title: string;
  tagline: string;
  image?: string;
  collaboratorsNeeded: string[];
  hideShowMore?: boolean;
  showMore: {
    description: string;
    stage?: string;
    link?: string;
  };
};

export const openExplorations: OpenExploration[] = [
  {
    title: "Dawk",
    tagline:
      "DAWK turns passive YouTube tutorials into interactive, hands-on lessons inside Ableton so producers learn by doing, not just watching.",
    image:
      "dawk_screenshot.png",
    collaboratorsNeeded: ["Max for Live Developer", "Music Producer", "AI Workflow Engineer"],
    showMore: {
      description: `The Problem

Every music producer learning something new follows the same broken workflow: watch 30 seconds of a YouTube tutorial, pause, alt-tab to Ableton, try to remember what was said, fail, alt-tab back, rewind 15 seconds, repeat. The constant context-switching kills creative flow and slows learning.

The Solution

DAWK is a Max for Live device that turns any YouTube tutorial into an interactive, step-by-step lesson that runs directly inside Ableton Live. The user pastes a link, and Claude AI digests the tutorial into structured lesson steps. The device then walks the producer through each step without ever leaving the DAW.

DAWK does not just explain - it executes. When a lesson says "create a return track," DAWK creates the return track. When it says "load a Compressor," DAWK loads the Compressor. Via AbletonMCP, the device has direct hands-on control of the session.

How It Works

Paste - Drop a YouTube tutorial URL into the DAWK panel inside Ableton.
Digest - Claude extracts every technique, parameter, and routing decision from the transcript via a 3-stage prompt chain (Extract -> Structure -> Enrich).
Learn - Step through the lesson: CONCEPT (why), AUTO (executes in Ableton), HANDS-ON (you adjust), EAR CHECK (listen and confirm). Ask questions anytime.`,
      stage: "Prototype",
      link: "https://claude.ai/public/artifacts/6341943f-6764-490b-8fff-e77d63400e14",
    },
  },
  {
    title: "Haptic Interface For Embodied Learning",
    tagline: "A wearable interface for embodied intelligence and learning",
    image: "",
    collaboratorsNeeded: ["Hardware Engineer", "Haptic Designer", "Cognitive Scientist"],
    showMore: {
      description: `A Different Way of Learning

Learning a physical skill has always required time, repetition, and guidance. Whether playing the piano or mastering a movement in sport, the body must gradually align itself with an ideal pattern—often through trial, error, and external correction.

This project explores a different paradigm:
What if guidance could be felt directly in the body?

Instead of observing, interpreting, and correcting, the learner engages in a form of co-adaptive interaction—where an intelligent system and the human body collaborate in real time. The glove becomes not just a tool, but a mediator between intention and execution, between knowledge and movement.

Grounded in principles of embodied cognition and haptics, the system treats learning not as abstract instruction, but as sensorimotor experience. The body does not just follow instructions—it understands through sensations`,
      stage: "Early Prototype",
    },
  },
  {
    title: "Weave",
    tagline: "A living memory layer for events that keeps coordination, story, and reflection together.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop",
    collaboratorsNeeded: ["Product Designer", "Full-Stack Developer", "AI/LLM Specialist"],
    showMore: {
      description: `Weave is an event creation tool.

It begins with a simple belief: events do not end when the room empties. They continue as conversations, fragments, photos, voice notes, inside jokes, timelines, playlists, receipts, and half-remembered details that only make sense when held together. Weave exists to collect those fragments and turn them into something durable, social, and alive.

Weave is not just an event tool. It is a collaboration layer for moments worth keeping. It helps people plan together, participate together, and remember together. Before the event, it is a space for coordination, anticipation, and collective authorship. During the event, it becomes a shared surface for live updates, contributions, and decisions. After the event, it transforms into an archive that does not feel dead or static, but animated by memory, context, and story.

The core idea is continuity.

A Weave event is not a container with a start and end date. It is a thread in a larger social fabric. Every RSVP, note, image, comment, poll, and post becomes part of the thread. Every thread can be revisited, extended, remixed, or sealed into a capsule. The product should feel less like a dashboard and more like a memory instrument.

Weave is designed around a few principles:
- Shared authorship over passive consumption
- Lightweight coordination over rigid planning
- Emotional continuity over transactional event management
- Narrative memory over raw storage
- Human texture over sterile utility

The product language should stay intimate, editorial, and slightly speculative. Weave should feel like a future-facing notebook for real life: warm enough to trust, structured enough to use, and flexible enough to evolve.

Concept

Weave lives between three phases:
- Before: plan, invite, decide, coordinate
- During: contribute, update, document, react
- After: preserve, relive, remix, publish

This creates a closed loop where social energy does not disappear after the event. It compounds.

Each event becomes a living capsule with its own identity, media layer, discussion layer, and memory layer. Some capsules are practical and short-lived. Others become long-term archives. Some remain open and collaborative. Others are sealed and revisited later.

The deeper concept is that memory is not a file. Memory is a relationship. Weave makes that relationship visible.

Future Speculations

Weave can evolve beyond event planning into a broader memory infrastructure for groups, families, communities, and subcultures.

Possible futures:
- Events that automatically generate recap stories from photos, captions, voice notes, and timestamps
- Shared timelines that reconstruct what happened without requiring anyone to curate everything manually
- AI-assisted memory threads that summarize the emotional shape of an event, not just the facts
- Portable capsules that can move between private, communal, and public states
- Printed or physical artifacts generated from digital gatherings
- Intergenerational archives where family stories, party histories, and community traditions accumulate in one place
- A social layer where future invites are shaped by how people actually participated before
- Collaborative memory editing, where a group can annotate, correct, and enrich a shared record over time
- Event spaces that adapt dynamically based on the energy and behavior of the people inside them

Long term, Weave could become a memory network rather than a single product. A place where personal history, social ritual, and group coordination overlap.

Tech Stack

Weave is built with a deliberately lean, modern front end stack:
- React for UI composition
- Vite for fast development and builds
- Plain JavaScript for directness and low overhead
- CSS for global structure and presentation
- Component-based app structure for separation of concerns

The current architecture is intentionally simple and extensible. That matters because Weave should remain easy to shape as the product evolves. The system should support richer state, persistent storage, media uploads, collaborative editing, and generated memory artifacts without becoming brittle.

A future stack could grow into:
- Real-time collaboration via WebSockets or a managed realtime service
- Persistent storage for events, media, comments, and timelines
- Auth and identity for private circles and shared spaces
- AI services for summarization, tagging, highlight extraction, and memory narration
- Object storage for photos, videos, and exports
- Search and retrieval across moments, people, and themes
- Export pipelines for PDF, print, or shareable web capsules

The technical philosophy should stay pragmatic: use the simplest tool that preserves the feel of the product. Weave should never feel over-engineered. The experience matters more than architectural performance theater.

Design Direction

Weave should look like memory with structure.

That means:
- warm surfaces
- layered depth
- editorial typography
- restrained motion
- tactile spacing
- soft contrast, not sterile minimalism
- subtle rituals instead of noisy dashboards

The interface should suggest care. Every view should feel like it belongs to the same world, but different states should feel distinct enough to imply time, use, and accumulation.

What Weave Refuses

Weave refuses to reduce social life to empty productivity.

It does not want to become:
- a generic event CRM
- a shallow social feed
- a storage dump for media
- a cold analytics console
- a spammy invite machine

Instead, it aims to be a memory environment where coordination and meaning stay connected.

Closing

Weave is the idea that events are not disposable.

They are threads.

And when enough threads are gathered, shared, and preserved, they form something larger than an event platform: a communal memory system that keeps growing long after the moment has passed.`,
      stage: "Concept / Exploration",
    },
  },
  {
    title: "Portfolio Website",
    tagline: "Portfolio website for photographer Nils.",
    image: "https://image.thum.io/get/width/1200/crop/700/https://nilsarneberg.space/",
    collaboratorsNeeded: ["Photography", "Portfolio Design"],
    hideShowMore: true,
    showMore: {
      description: `Portfolio website for photographer Nils.

      View the site: https://nilsarneberg.space/`,
      stage: "Live",
      link: "https://nilsarneberg.space/",
    },
  },
];

// --- Music ---

export type MusicCollection = {
  slug: "linus" | "urhymn";
  title: string;
  subtitle: string;
  coverImage: string;
};

export const musicCollections: MusicCollection[] = [
  {
    slug: "linus",
    title: "Linus",
    subtitle: "Personal sketches, textures, and process tracks",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1400&h=1600&fit=crop",
  },
  {
    slug: "urhymn",
    title: "Urhymn",
    subtitle: "Ritual pulse, cinematic low-end, and red-room energy",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1400&h=1600&fit=crop",
  },
];

export type MusicTrack = {
  title: string;
  artist: string;
  coverImage: string;
  audioUrl: string;
};

export const musicTracks: MusicTrack[] = [
  {
    title: "Night Tape",
    artist: "Linus Thofte",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&h=900&fit=crop",
    audioUrl: "https://cdn.pixabay.com/audio/2023/05/02/audio_8d0f8dd6d8.mp3",
  },
  {
    title: "Glass Rooms",
    artist: "Linus Thofte",
    coverImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&h=900&fit=crop",
    audioUrl: "https://cdn.pixabay.com/audio/2022/10/25/audio_946b45f5de.mp3",
  },
  {
    title: "Soft Voltage",
    artist: "Linus Thofte",
    coverImage: "https://images.unsplash.com/photo-1461784121038-f088ca1e7714?w=900&h=900&fit=crop",
    audioUrl: "https://cdn.pixabay.com/audio/2022/03/15/audio_c8d24b8d23.mp3",
  },
  {
    title: "Half Light",
    artist: "Linus Thofte",
    coverImage: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=900&h=900&fit=crop",
    audioUrl: "https://cdn.pixabay.com/audio/2022/02/22/audio_d1718ab41b.mp3",
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
  url?: string;
};

export const certifications: Certification[] = [
  { name: "BSc Cognitive Science", issuer: "Linköping University", icon: "Award", url: "https://liu.se" },
  { name: "Electronic Music Production & Performance", issuer: "Catalyst - Institute of Arts and Technology", icon: "Award", url: "https://catalyst.berlin" },
  { name: "Prompt Engineering & GenAI", issuer: "Nackademin", icon: "Cloud", url: "https://nackademin.se" },
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
