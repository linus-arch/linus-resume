import { ChevronDown } from "lucide-react";
import AIChatDialog from "./AIChatDialog";
import { personal } from "@/config/resume-data";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="badge-available mb-8">
          {personal.availability}
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-heading font-bold mb-6 tracking-tight">
          {personal.name}
        </h1>

        <h2 className="text-2xl md:text-3xl font-heading text-muted-foreground mb-4">
          {personal.title}
        </h2>

        <p className="text-lg text-muted-foreground mb-8 max-w-xl">
          {personal.tagline}
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          {personal.techTags.map((tag) => (
            <span key={tag} className="company-tag">{tag}</span>
          ))}
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
