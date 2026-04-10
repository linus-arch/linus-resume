import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { musicCollections } from "@/config/resume-data";
import MusicGallery from "../components/MusicGallery";

const MusicCollection = () => {
  const { slug } = useParams();
  const collection = musicCollections.find((entry) => entry.slug === slug);

  if (!collection) {
    return <Navigate to="/music" replace />;
  }

  const isUrhymn = collection.slug === "urhymn";

  return (
    <div
      className="min-h-screen px-6 pt-28 pb-14"
      style={{
        background: isUrhymn
          ? "radial-gradient(circle at top, rgba(255, 66, 66, 0.32), transparent 35%), linear-gradient(180deg, rgba(52, 8, 8, 0.95), rgba(10, 4, 4, 1))"
          : "linear-gradient(180deg, rgba(8, 12, 24, 0.98), rgba(6, 8, 16, 1))",
      }}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <Link to="/music" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to music
        </Link>

        <section className="music-entry-grid items-stretch">
          <div className="music-entry-panel">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {collection.slug}
            </p>
            <h1 className="text-4xl sm:text-6xl font-heading font-bold tracking-tight mb-4">
              {collection.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              {collection.subtitle}
            </p>
          </div>

          <aside className="music-entry-side">
            <img
              src={collection.coverImage}
              alt={`${collection.title} cover`}
              className={`h-full w-full object-cover ${isUrhymn ? "mix-blend-screen" : ""}`}
            />
            <div className="music-entry-link">
              <span>{isUrhymn ? "Red room sessions" : "Working sketches"}</span>
              <span>{isUrhymn ? "Urhymn" : "Linus"}</span>
            </div>
          </aside>
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-heading font-semibold mb-2">Gallery</h2>
            <p className="text-sm text-muted-foreground max-w-2xl">
              A loose archive of fragments, sketches, and process tracks.
            </p>
          </div>

          <MusicGallery />
        </section>
      </div>
    </div>
  );
};

export default MusicCollection;
