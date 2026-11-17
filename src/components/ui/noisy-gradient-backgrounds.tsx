import { useEffect, useRef } from "react";

type GradientStop = {
  color: string;
  stop: string;
};

type GradientBackgroundProps = {
  colors?: GradientStop[];
  noiseAlpha?: number;
  noiseIntensity?: number;
  className?: string;
};

const defaultColors: GradientStop[] = [
  { color: "rgba(245, 87, 2, 1)", stop: "10%" },
  { color: "rgba(245, 140, 2, 1)", stop: "18%" },
  { color: "rgba(238, 174, 202, 1)", stop: "40%" },
  { color: "rgba(202, 179, 214, 1)", stop: "65%" },
  { color: "rgba(148, 201, 233, 1)", stop: "100%" },
];

const Noise = ({ alpha, intensity }: { alpha: number; intensity: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let animationFrame = 0;
    let lastFrame = 0;
    const pattern = document.createElement("canvas");
    pattern.width = 96;
    pattern.height = 96;
    const patternContext = pattern.getContext("2d");
    if (!patternContext) return;

    const resize = () => {
      const bounds = canvas.parentElement?.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = (bounds?.width || window.innerWidth) * dpr;
      canvas.height = (bounds?.height || window.innerHeight) * dpr;
      canvas.style.width = `${bounds?.width || window.innerWidth}px`;
      canvas.style.height = `${bounds?.height || window.innerHeight}px`;
    };

    const draw = (time: number) => {
      if (time - lastFrame > 16) {
        const image = patternContext.createImageData(pattern.width, pattern.height);
        for (let index = 0; index < image.data.length; index += 4) {
          const value = Math.random() * 255 * intensity;
          image.data[index] = value;
          image.data[index + 1] = value;
          image.data[index + 2] = value;
          image.data[index + 3] = alpha;
        }
        patternContext.putImageData(image, 0, 0);
        const fill = context.createPattern(pattern, "repeat");
        if (fill) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.fillStyle = fill;
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
        lastFrame = time;
      }
      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrame = window.requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [alpha, intensity]);

  return <canvas ref={canvasRef} className="noisy-gradient-background__noise" aria-hidden="true" />;
};

const GradientBackground = ({
  colors = defaultColors,
  noiseAlpha = 50,
  noiseIntensity = 1,
  className = "",
}: GradientBackgroundProps) => (
  <div
    className={`noisy-gradient-background ${className}`}
    style={{
      background: `radial-gradient(125% 125% at 50% 101%, ${colors.map(({ color, stop }) => `${color} ${stop}`).join(", ")})`,
    }}
    aria-hidden="true"
  >
    <Noise alpha={noiseAlpha} intensity={noiseIntensity} />
  </div>
);

export { GradientBackground };
