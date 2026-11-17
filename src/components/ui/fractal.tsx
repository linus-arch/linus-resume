import { useEffect, useRef } from "react";

type FractalProps = {
  className?: string;
  colors?: string[];
  placement?: "center" | "top" | "bottom";
};

const Fractal = ({
  className = "",
  colors = ["#97A137", "#F48E12", "#E3A5BF", "#767ECC"],
  placement = "center",
}: FractalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let frame = 0;
    let animationFrame = 0;

    const resize = () => {
      const bounds = canvas.parentElement?.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = (bounds?.width || window.innerWidth) * dpr;
      canvas.height = (bounds?.height || window.innerHeight) * dpr;
      canvas.style.width = `${bounds?.width || window.innerWidth}px`;
      canvas.style.height = `${bounds?.height || window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "screen";
      const centerY = placement === "top" ? height * 0.25 : placement === "bottom" ? height * 0.75 : height * 0.5;
      const centerX = width * 0.5;

      for (let branch = 0; branch < 26; branch += 1) {
        const color = colors[branch % colors.length];
        context.beginPath();
        context.strokeStyle = color;
        context.globalAlpha = 0.13;
        context.lineWidth = 1 + (branch % 3) * 0.45;
        let x = centerX + Math.cos(branch * 2.4) * width * 0.08;
        let y = centerY + Math.sin(branch * 2.4) * height * 0.08;
        context.moveTo(x, y);

        for (let segment = 0; segment < 10; segment += 1) {
          const angle = branch * 1.7 + segment * 0.86 + frame * 0.00015;
          x += Math.cos(angle) * (width * 0.035 + segment * 2);
          y += Math.sin(angle) * (height * 0.045 + segment * 1.5);
          context.lineTo(x, y);
        }
        context.stroke();
      }

      context.globalCompositeOperation = "source-over";
      frame += 1;
      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrame = window.requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [colors, placement]);

  return <canvas ref={canvasRef} className={`fractal-background ${className}`} aria-hidden="true" />;
};

export { Fractal };
