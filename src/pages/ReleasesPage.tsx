import { Link } from "react-router-dom";
import { releasePosts } from "@/config/resume-data";

const ReleasesPage = () => (
  <section className="min-h-screen px-6 pt-28 pb-20">
    <div className="max-w-5xl mx-auto">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Music journal</p>
      <h1 className="text-4xl sm:text-6xl font-heading font-bold tracking-tight mb-4">Releases</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mb-12">
        New releases, notes, and fragments from the archive.
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        {releasePosts.map((release) => (
          <Link key={release.slug} to={`/releases/${release.slug}`} className="group">
            <article className="overflow-hidden rounded-xl border border-border bg-card">
              <img src={release.coverImage} alt={`${release.title} cover`} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {release.releaseType} · {new Date(`${release.releaseDate}T00:00:00`).getFullYear()}
                </p>
                <h2 className="text-2xl font-heading font-semibold mb-2">{release.title}</h2>
                <p className="text-sm text-muted-foreground">{release.description}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ReleasesPage;
