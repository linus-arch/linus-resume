import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { releasePosts } from "@/config/resume-data";

const ReleasePage = () => {
  const { slug } = useParams();
  const release = releasePosts.find((entry) => entry.slug === slug);

  if (!release) return <Navigate to="/releases" replace />;

  return (
    <section className="min-h-screen px-6 pt-28 pb-20">
      <div className="max-w-5xl mx-auto">
        <Link to="/releases" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-10">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to releases
        </Link>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
          <img src={release.coverImage} alt={`${release.title} cover`} className="w-full rounded-xl object-cover" />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {release.releaseType} · {new Date(`${release.releaseDate}T00:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <h1 className="text-4xl sm:text-6xl font-heading font-bold tracking-tight mb-4">{release.title}</h1>
            <p className="text-muted-foreground leading-relaxed mb-8">{release.description}</p>
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-3">Tracklist</h2>
            <ol className="space-y-2 mb-8">
              {release.tracks.map((track, index) => <li key={track} className="text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")} — {track}</li>)}
            </ol>
            <div className="flex flex-wrap gap-4">
              {Object.entries(release.links).filter(([, url]) => url).map(([service, url]) => (
                <a key={service} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                  Listen on {service === "appleMusic" ? "Apple Music" : service[0].toUpperCase() + service.slice(1)} <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReleasePage;
