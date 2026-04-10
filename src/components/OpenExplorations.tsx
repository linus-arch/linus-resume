import { openExplorations } from "@/config/resume-data";
import OpenExplorationCard from "./OpenExplorationCard";

const OpenExplorations = () => {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <h2 className="section-title">Open Explorations</h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-2xl leading-relaxed">
          Ideas I'm actively exploring and evolving. If any of these resonate, let's collaborate.
        </p>

        <div className="space-y-8">
          {openExplorations.map((exploration) => (
            <OpenExplorationCard key={exploration.title} {...exploration} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenExplorations;
