import { Pause, Play } from "lucide-react";
import type { MusicTrack } from "@/config/resume-data";

interface MusicCardProps {
  track: MusicTrack;
  isPlaying: boolean;
  hasError: boolean;
  onToggle: () => void;
}

const MusicCard = ({ track, isPlaying, hasError, onToggle }: MusicCardProps) => {
  return (
    <article className="music-card group">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <img
          src={track.coverImage}
          alt={`${track.title} cover`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />

        <button
          type="button"
          onClick={onToggle}
          className="music-play-button"
          aria-label={`${isPlaying ? "Pause" : "Play"} ${track.title}`}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
      </div>

      <div className="mt-3 px-1">
        <h3 className="text-base font-heading font-semibold leading-tight">{track.title}</h3>
        <p className="text-sm text-muted-foreground">{track.artist}</p>
        {hasError && (
          <p className="mt-1 text-xs text-destructive">
            This audio source could not be loaded.
          </p>
        )}
      </div>
    </article>
  );
};

export default MusicCard;
