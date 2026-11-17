import { useEffect, useRef } from "react";
import { GradientBackground } from "@/components/ui/noisy-gradient-backgrounds";

const Hero = () => {
  const signalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const signal = signalRef.current;
    if (!signal || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = signal.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      signal.style.setProperty("--signal-x", `${x * 18}px`);
      signal.style.setProperty("--signal-y", `${y * 12}px`);
    };

    const resetPointer = () => {
      signal.style.setProperty("--signal-x", "0px");
      signal.style.setProperty("--signal-y", "0px");
    };

    signal.addEventListener("pointermove", handlePointerMove);
    signal.addEventListener("pointerleave", resetPointer);

    return () => {
      signal.removeEventListener("pointermove", handlePointerMove);
      signal.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  return (
    <section className="score-hero">
      <GradientBackground />
      <div className="signal-field" ref={signalRef} aria-hidden="true">
        <div className="signal-field__halo" />
        <div className="signal-field__rings">
          <span />
          <span />
          <span />
        </div>
        <div className="signal-field__wave">
          {Array.from({ length: 28 }, (_, index) => (
            <i key={index} style={{ "--bar-index": index } as React.CSSProperties} />
          ))}
        </div>
        <div className="signal-field__axis signal-field__axis--horizontal" />
        <div className="signal-field__axis signal-field__axis--vertical" />
      </div>
      <div className="score-hero__body">
        <p className="score-kicker">Cognitive scientist + AI developer + Electronic Music Producer</p>
        <h1>
          Linus
          <br />
          Thofte<span className="score-hero__period">.</span>
        </h1>
        <p className="score-hero__intro">
          I turn research, technology, and creative practice into clearer ways for people to learn, decide, and make.
        </p>
      </div>

    </section>
  );
};

export default Hero;
