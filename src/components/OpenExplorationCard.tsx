import { useState } from "react";
import { ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { OpenExploration } from "@/config/resume-data";

interface OpenExplorationCardProps extends OpenExploration {}

const OpenExplorationCard = ({
  title,
  tagline,
  image,
  collaboratorsNeeded,
  hideShowMore,
  showMore,
}: OpenExplorationCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="group overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300">
        {/* Image */}
        {image && (
          showMore.link ? (
            <a
              href={showMore.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block overflow-hidden h-48 bg-muted"
              aria-label={`Open ${title}`}
            >
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/75 px-2 py-1 text-xs text-foreground">
                Visit site
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </a>
          ) : (
            <div className="relative overflow-hidden h-48 bg-muted">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          )
        )}

        {/* Content */}
        <div className="p-6 flex flex-col h-full">
          <h3 className="text-lg font-semibold font-heading mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4 flex-grow">{tagline}</p>

          {/* Collaborators Badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            {collaboratorsNeeded.filter(Boolean).map((role) => (
              <Badge
                key={role}
                variant="secondary"
                className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
              >
                {role}
              </Badge>
            ))}
          </div>

          {/* Show More Button */}
          {!hideShowMore && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(true)}
              className="w-full"
            >
              Show more
            </Button>
          )}
        </div>
      </div>

      {/* Modal */}
      {!hideShowMore && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            {showMore.link ? (
              <DialogTitle className="text-2xl font-heading">
                <a
                  href={showMore.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  {title}
                  <ExternalLink className="w-5 h-5" />
                </a>
              </DialogTitle>
            ) : (
              <DialogTitle className="text-2xl font-heading">{title}</DialogTitle>
            )}
            {showMore.link && (
              <a
                href={showMore.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline w-fit"
              >
                Open project artifact
              </a>
            )}
            {showMore.stage && (
              <p className="text-sm text-muted-foreground mt-2">
                Stage: <span className="font-medium">{showMore.stage}</span>
              </p>
            )}
          </DialogHeader>

          <div className="music-entry-grid">
            <div className="music-entry-panel">
              <div className="modal-rich-content">
                <ReactMarkdown>{showMore.description}</ReactMarkdown>
              </div>

              <div className="border-t border-border pt-6 mt-8">
                <h4 className="font-semibold mb-3">Looking for collaborators:</h4>
                <div className="flex flex-wrap gap-2">
                  {collaboratorsNeeded.map((role) => (
                    <Badge
                      key={role}
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              {showMore.link && (
                <a
                  href={showMore.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium mt-6"
                >
                  Learn more <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <aside className="music-entry-side">
              {image && (
                <img
                  src={image}
                  alt={title}
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
            </aside>
          </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default OpenExplorationCard;
