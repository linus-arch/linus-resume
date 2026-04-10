import { useEffect, useState } from "react";
import {
  ChevronDown,
  Brain,
  Code2,
  Database,
  Headphones,
  Sparkles,
  Workflow,
  Feather,
  Bot,
  TerminalSquare,
  Layers3,
  PanelsTopLeft,
} from "lucide-react";
import AIChatDialog from "./AIChatDialog";
import { heroQuotes, personal } from "@/config/resume-data";

const workingWithItems = [
  { label: "React", icon: Code2 },
  { label: "TypeScript", icon: TerminalSquare },
  { label: "AI/LLM", icon: Bot },
  { label: "Cognitive Science", icon: Brain },
  { label: "Supabase", icon: Database },
  { label: "Tailwind CSS", icon: PanelsTopLeft },
  { label: "Framer Motion", icon: Sparkles },
  { label: "Ableton", icon: Headphones },
  { label: "Prompt Engineering", icon: Workflow },
  { label: "Research", icon: Feather },
  { label: "Design Systems", icon: Layers3 },
];

const Hero = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!heroQuotes.length) {
      return;
    }

    let timeoutId: number | undefined;

    const interval = window.setInterval(() => {
      setIsFading(true);
      timeoutId = window.setTimeout(() => {
        setQuoteIndex((currentIndex) => (currentIndex + 1) % heroQuotes.length);
        setIsFading(false);
      }, 350);
    }, 8000);

    return () => {
      window.clearInterval(interval);
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <section className="hero-shell relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-28">
      <div className="hero-noise" />
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="badge-available mb-8">
          {personal.availability}
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-heading font-bold mb-6 tracking-tight">
          {personal.name}
        </h1>

        <h2 className="text-2xl md:text-3xl font-heading text-muted-foreground mb-4">
          {personal.title}
        </h2>

        <p
          className={`hero-quote max-w-3xl text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 transition-all duration-500 ${
            isFading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          {heroQuotes[quoteIndex] ?? personal.tagline}
        </p>

        <div className="working-with-block mb-10">
          <div className="working-with-label">Working with</div>
          <div className="working-with-marquee" aria-hidden="true">
            <div className="working-with-track">
              {[...workingWithItems, ...workingWithItems].map((item, index) => {
                const Icon = item.icon;
                return (
                  <span key={`${item.label}-${index}`} className="working-with-item">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <AIChatDialog />
      </div>

      <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          Scroll to explore
        </span>
        <ChevronDown className="w-5 h-5 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
