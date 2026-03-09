import { ArrowRight } from "lucide-react";

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  bullets?: string[];
  sections?: { title: string; bullets: string[] }[];
}

const ExperienceCard = ({ company, role, period, bullets = [], sections }: ExperienceCardProps) => {
  return (
    <div className="experience-card">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-6">
        <div>
          <h3 className="text-xl font-heading font-semibold mb-1">{company}</h3>
          <p className="text-muted-foreground">{role}</p>
        </div>
        <span className="text-sm text-muted-foreground">{period}</span>
      </div>

      {sections ? (
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-3">
                {section.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <ArrowRight className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-3">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-3 text-muted-foreground">
              <ArrowRight className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExperienceCard;
