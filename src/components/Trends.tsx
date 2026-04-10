import { useEffect, useState } from "react";
import TrendCard, { type GitHubTrendRepo } from "./TrendCard";

type GitHubTrendsSnapshot = {
  updatedAt: string;
  source: string;
  repos: GitHubTrendRepo[];
};

const Trends = () => {
  const [snapshot, setSnapshot] = useState<GitHubTrendsSnapshot | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadTrends = async () => {
      try {
        const response = await fetch("/data/github-trends.json", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load trends snapshot");
        }

        const nextSnapshot = (await response.json()) as GitHubTrendsSnapshot;
        if (isMounted) {
          setSnapshot(nextSnapshot);
        }
      } catch {
        if (isMounted) {
          setHasError(true);
        }
      }
    };

    void loadTrends();

    return () => {
      isMounted = false;
    };
  }, []);

  const updatedLabel = snapshot?.updatedAt
    ? new Date(snapshot.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <section id="trends" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="section-title">Trends</h2>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Weekly GitHub momentum: the most starred repos from the last 7 days.
            </p>
          </div>
          {updatedLabel && (
            <p className="text-xs text-muted-foreground">
              Updated {updatedLabel}
            </p>
          )}
        </div>

        {hasError ? (
          <p className="text-sm text-muted-foreground">Unable to load trend data right now.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snapshot?.repos.map((repo) => (
              <TrendCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Trends;
