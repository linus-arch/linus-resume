import { ExternalLink, Star } from "lucide-react";

export type GitHubTrendRepo = {
  id: number;
  name: string;
  owner: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  starsThisWeek: number;
};

interface TrendCardProps {
  repo: GitHubTrendRepo;
}

const formatNumber = (value: number) =>
  Intl.NumberFormat("en-US", { notation: "compact" }).format(value);

const TrendCard = ({ repo }: TrendCardProps) => {
  return (
    <article className="trend-card">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">{repo.owner}</p>
          <h3 className="text-sm font-heading font-semibold leading-tight">{repo.name}</h3>
        </div>
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label={`Open ${repo.owner}/${repo.name} on GitHub`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed mb-4">{repo.description}</p>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="trend-chip">{repo.language}</span>
        <span className="trend-chip trend-chip--starred">
          <Star className="w-3 h-3" />
          {formatNumber(repo.starsThisWeek)} this week
        </span>
        <span className="trend-chip">{formatNumber(repo.stars)} total</span>
      </div>
    </article>
  );
};

export default TrendCard;
