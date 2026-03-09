import { useEffect, useRef, useState } from "react";
import { strongSkills, moderateSkills, gapSkills } from "@/config/resume-data";
import type { Skill } from "@/config/resume-data";

const SkillBar = ({
  name,
  level,
  variant = "strong",
  animate,
}: {
  name: string;
  level: number;
  variant?: "strong" | "moderate" | "gap";
  animate: boolean;
}) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center">
      <span className="text-sm text-foreground/80">{name}</span>
      <span className="text-xs text-muted-foreground">{level}%</span>
    </div>
    <div
      className="skill-bar-track"
      role="progressbar"
      aria-valuenow={level}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={name}
    >
      <div
        className={`skill-bar-fill skill-bar-fill--${variant}`}
        style={{ width: animate ? `${level}%` : "0%" }}
      />
    </div>
  </div>
);

const Skills = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-card">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">Skills</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Honest skill assessment — strong where it counts, transparent about growth areas.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-6 text-primary font-heading">Strong</h3>
            <div className="space-y-4">
              {strongSkills.map((skill) => (
                <SkillBar key={skill.name} {...skill} variant="strong" animate={animate} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-muted-foreground font-heading">Moderate</h3>
            <div className="space-y-4">
              {moderateSkills.map((skill) => (
                <SkillBar key={skill.name} {...skill} variant="moderate" animate={animate} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-6 text-muted-foreground/60 font-heading">Gaps (I'll tell you)</h3>
          <div className="max-w-sm space-y-4">
            {gapSkills.map((skill) => (
              <SkillBar key={skill.name} {...skill} variant="gap" animate={animate} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
