import ExperienceCard from "./ExperienceCard";
import { experiences, experienceSummary } from "@/config/resume-data";

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">Experience</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          {experienceSummary}
        </p>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
