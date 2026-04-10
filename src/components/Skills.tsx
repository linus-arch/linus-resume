import { strongSkills, moderateSkills, gapSkills } from "@/config/resume-data";

const SkillGroup = ({
  label,
  skills,
  muted = false,
}: {
  label: string;
  skills: { name: string; level: number }[];
  muted?: boolean;
}) => (
  <div>
    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 font-heading">
      {label}
    </h3>
    <div className="skill-list">
      {skills.map((skill) => (
        <span
          key={skill.name}
          className={muted ? "text-muted-foreground" : "text-foreground/80"}
        >
          {skill.name}
        </span>
      ))}
    </div>
  </div>
);

const Skills = () => {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <h2 className="section-title">Skills</h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-2xl leading-relaxed">
          Honest assessment — strong where it counts, transparent about growth areas.
        </p>

        <div className="space-y-8">
          <SkillGroup label="Strong" skills={strongSkills} />
          <SkillGroup label="Moderate" skills={moderateSkills} />
          <SkillGroup label="Gaps (I'll tell you)" skills={gapSkills} muted />
        </div>
      </div>
    </section>
  );
};

export default Skills;
