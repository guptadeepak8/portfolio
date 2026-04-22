"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  alpha: number;
  speed: number;
  offset: number;
  vx: number;
  vy: number;
}

export default function StarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0;
    let stars: Star[] = [];
    let mouse = { x: -1000, y: -1000 };
    let raf: number;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = Array.from({ length: 220 }, (_, i) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.2,
        baseAlpha: Math.random() * 0.6 + 0.1,
        alpha: 0,
        speed: Math.random() * 0.5 + 0.2,
        offset: Math.random() * Math.PI * 2,
        vx: 0,
        vy: 0,
      }));
    };

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const ts = t * 0.001;

      stars.forEach((s) => {
        // Parallax mouse influence
        const dx = mouse.x - s.x;
        const dy = mouse.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          s.vx -= (dx / dist) * force * 0.12;
          s.vy -= (dy / dist) * force * 0.12;
        }
        s.vx *= 0.94;
        s.vy *= 0.94;
        s.x += s.vx;
        s.y += s.vy;

        // Wrap
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;

        s.alpha = s.baseAlpha * (0.4 + 0.6 * Math.abs(Math.sin(ts * s.speed + s.offset)));

        // Glow for bigger stars
        if (s.r > 1.0) {
          const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3);
          grd.addColorStop(0, `rgba(180, 220, 255, ${s.alpha * 0.6})`);
          grd.addColorStop(1, "rgba(180, 220, 255, 0)");
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 225, 255, ${s.alpha})`;
        ctx.fill();
      });

      // Occasional shooting star
      const shootT = (ts * 0.15) % 1;
      if (shootT < 0.015) {
        const sx = Math.random() * W;
        const len = 120;
        ctx.save();
        ctx.strokeStyle = `rgba(76, 255, 176, ${0.4 * (1 - shootT / 0.015)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(sx, 0);
        ctx.lineTo(sx + len * 0.4, len);
        ctx.stroke();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.55 }}
    />
  );
}
