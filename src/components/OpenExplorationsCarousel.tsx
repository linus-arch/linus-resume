import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { openExplorations } from "@/config/resume-data";

const priority = ["Vibable", "Atlas of Unbuilt Things"];
const fallbackImage = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&h=1000&fit=crop";

const explorations = [...openExplorations].sort((a, b) => {
  const rank = (title: string) => {
    const index = priority.indexOf(title);
    return index === -1 ? priority.length : index;
  };
  return rank(a.title) - rank(b.title);
});

const OpenExplorationsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStart = useRef(0);

  const goTo = useCallback((index: number) => {
    setCurrentIndex((index + explorations.length) % explorations.length);
  }, []);

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrevious = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(goNext, 6000);
    return () => window.clearInterval(interval);
  }, [goNext, isPaused]);

  const exploration = explorations[currentIndex];
  const image = exploration.image || fallbackImage;

  return (
    <>
      <div
        className="exploration-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={(event) => {
          touchStart.current = event.touches[0]?.clientX ?? 0;
        }}
        onTouchEnd={(event) => {
          const end = event.changedTouches[0]?.clientX ?? 0;
          if (Math.abs(touchStart.current - end) > 60) {
            if (touchStart.current > end) goNext();
            else goPrevious();
          }
        }}
      >
        <div className="exploration-carousel__wash" />
        <div className="exploration-carousel__main">
          <div className="exploration-carousel__copy">
            <div className="exploration-carousel__number">
              <span />
              {String(currentIndex + 1).padStart(2, "0")} / {String(explorations.length).padStart(2, "0")}
            </div>
            <h3>{exploration.title}</h3>
            <p className="exploration-carousel__description">{exploration.tagline}</p>
            <p className="exploration-carousel__stage">{exploration.showMore.stage}</p>
            <div className="exploration-carousel__actions">
              {exploration.showMore.link && (
                <a href={exploration.showMore.link} target="_blank" rel="noreferrer" aria-label={`Open ${exploration.title}`}>
                  <ExternalLink aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className="exploration-carousel__image-wrap">
            <img src={image} alt="" className="exploration-carousel__image" />
            <div className="exploration-carousel__image-overlay" />
          </div>
        </div>

        <div className="exploration-carousel__controls">
          <div className="exploration-carousel__arrows">
            <button type="button" onClick={goPrevious} aria-label="Previous exploration">
              <ArrowLeft aria-hidden="true" />
            </button>
            <button type="button" onClick={goNext} aria-label="Next exploration">
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <div
            className="exploration-carousel__progress"
            style={{ gridTemplateColumns: `repeat(${explorations.length}, minmax(0, 1fr))` }}
          >
            {explorations.map((item, index) => (
              <button
                type="button"
                key={item.title}
                onClick={() => goTo(index)}
                className={index === currentIndex ? "is-active" : ""}
                aria-label={`Show ${item.title}`}
              >
                <span><i style={{ width: index < currentIndex ? "100%" : index === currentIndex ? "100%" : "0%" }} /></span>
                <strong>{item.title}</strong>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenExplorationsCarousel;
