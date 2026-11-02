import React, { useEffect, useRef } from "react";

const LINK_DISTANCE = 150;

/**
 * Ambient animated backdrop: drifting aurora blobs, a slow particle
 * constellation on canvas, and a masked grid. Motion is disabled when the
 * visitor prefers reduced motion.
 */
export default function AnimatedBackground({ className = "", withGrid = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    let width = 0;
    let height = 0;
    let particles = [];

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(64, Math.max(24, Math.round((width * height) / 30000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.5 + 0.5,
        hue: Math.random() > 0.7 ? 178 : 158,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.18;
            ctx.strokeStyle = `hsla(${a.hue}, 84%, 70%, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 90%, 76%, 0.6)`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;
      }
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduceMotion) {
        draw();
      } else {
        frame = requestAnimationFrame(tick);
      }
    };

    build();
    start();

    const onResize = () => {
      build();
      start();
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
      } else {
        start();
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-[#070b09]" />
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />
      {withGrid && <div className="grid-overlay absolute inset-0" />}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#070b09] to-transparent" />
    </div>
  );
}
