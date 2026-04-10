import { useEffect, useRef, useState } from "react";
import { musicTracks } from "@/config/resume-data";
import MusicCard from "./MusicCard";

const MusicGallery = () => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [erroredTracks, setErroredTracks] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const addErrorForTrack = (trackIndex: number) => {
    setErroredTracks((previous) =>
      previous.includes(trackIndex) ? previous : [...previous, trackIndex],
    );
  };

  const toggleTrack = async (trackIndex: number) => {
    const selectedTrack = musicTracks[trackIndex];
    if (!selectedTrack) {
      return;
    }

    const currentAudio = audioRef.current;

    if (playingIndex === trackIndex && currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      setPlayingIndex(null);
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const nextAudio = new Audio(selectedTrack.audioUrl);
    nextAudio.onended = () => {
      setPlayingIndex(null);
    };
    nextAudio.onerror = () => {
      addErrorForTrack(trackIndex);
      setPlayingIndex(null);
    };

    audioRef.current = nextAudio;

    try {
      await nextAudio.play();
      setPlayingIndex(trackIndex);
    } catch {
      addErrorForTrack(trackIndex);
      setPlayingIndex(null);
    }
  };

  return (
    <div className="music-scatter-grid">
      {musicTracks.map((track, index) => (
        <MusicCard
          key={`${track.title}-${index}`}
          track={track}
          isPlaying={playingIndex === index}
          hasError={erroredTracks.includes(index)}
          onToggle={() => {
            void toggleTrack(index);
          }}
        />
      ))}
    </div>
  );
};

export default MusicGallery;
