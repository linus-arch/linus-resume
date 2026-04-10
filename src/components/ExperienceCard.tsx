import { useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import ChaosphereLogo from "./vidhraLogo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ExperienceShowMore } from "@/config/resume-data";

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  bullets?: string[];
  sections?: { title: string; bullets: string[] }[];
  showMore?: ExperienceShowMore;
}

const ExperienceCard = ({ company, role, period, bullets = [], sections, showMore }: ExperienceCardProps) => {
  const [open, setOpen] = useState(false);
  const isVidhra = company === "Vidhra";

  return (
    <>
      <div className="experience-card">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              {isVidhra && (
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/40">
                  <ChaosphereLogo size={26} className="h-7 w-7" />
                </div>
              )}
              <h3 className="text-xl font-heading font-semibold">{company}</h3>
            </div>
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

        {showMore && (
          <div className="mt-5">
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
              Show more
            </Button>
          </div>
        )}
      </div>

      {showMore && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl font-heading">
                {isVidhra && (
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/40">
                    <ChaosphereLogo size={26} className="h-7 w-7" />
                  </span>
                )}
                <span>{company}</span>
              </DialogTitle>
              <p className="text-muted-foreground">{role} · {period}</p>
            </DialogHeader>

            <div className="music-entry-grid">
              <div className="music-entry-panel">
                <div className="modal-rich-content">
                  <ReactMarkdown>{showMore.description}</ReactMarkdown>
                </div>
                {showMore.link && (
                  <a
                    href={showMore.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline font-medium mt-6"
                  >
                    Visit project <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              <aside className="music-entry-side">
                {showMore.image && (
                  <img
                    src={showMore.image}
                    alt={`${company} preview`}
                    className="h-72 w-full object-cover"
                  />
                )}
                {showMore.link && (
                  <a
                    href={showMore.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="music-entry-link"
                  >
                    <span>Open project</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {showMore.collaboratorName && showMore.collaboratorLink && (
                  <a
                    href={showMore.collaboratorLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <span>Client/Collaborator: {showMore.collaboratorName}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </aside>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ExperienceCard;
