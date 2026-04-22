"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const WORDS = ["React", "Next.js", "TypeScript", "Tailwind", "Node.js"];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wordIdx, setWordIdx] = useState(0);

  // Cycle through rotating words
  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  // Physics particle field (floating orbs connected by lines)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, raf: number;
    let mouse = { x: -999, y: -999 };

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      r: number; color: string;
      alpha: number;
    }

    let particles: Particle[] = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = Array.from({ length: 70 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2.2 + 0.6,
        color: Math.random() > 0.5 ? "76,255,176" : "0,212,255",
        alpha: Math.random() * 0.5 + 0.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Mouse repel + movement
      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const f = (140 - dist) / 140;
          p.vx -= (dx / dist) * f * 0.06;
          p.vy -= (dy / dist) * f * 0.06;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(76,255,176,${0.08 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Dots
      particles.forEach((p) => {
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        grd.addColorStop(0, `rgba(${p.color},${p.alpha})`);
        grd.addColorStop(1, `rgba(${p.color},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha + 0.3})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouse);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: "6rem" }}
    >
      {/* Physics particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-[1]"
        style={{ opacity: 0.85 }}
      />

      {/* Hero glow */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "900px",
          background: "radial-gradient(circle, rgba(76,255,176,0.065) 0%, rgba(0,212,255,0.04) 40%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-[5vw] w-full">
        {/* Tag line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
          style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", color: "var(--accent)", letterSpacing: "0.1em" }}
        >
          <span className="inline-block w-6 h-px" style={{ background: "var(--accent)" }} />
          Frontend Developer
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: "var(--accent)", animation: "pulse 2s infinite" }}
          />
        </motion.div>

        {/* Name */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.35, duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
            className="font-display font-extrabold leading-none"
            style={{
              fontSize: "clamp(3.8rem, 11vw, 8rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.93,
            }}
          >
            Deepak
            <br />
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(255,255,255,0.2)",
              }}
            >
              Gupta
            </span>
          </motion.h1>
        </div>

        {/* Rotating skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center gap-3 mt-6"
          style={{ fontFamily: "var(--font-dm-mono)", fontSize: "14px" }}
        >
          <span style={{ color: "var(--muted)" }}>Building with</span>
          <div className="relative overflow-hidden h-7 w-32">
            {WORDS.map((word, i) => (
              <motion.span
                key={word}
                className="absolute left-0"
                style={{ color: "var(--accent)", fontWeight: 500 }}
                initial={{ y: "100%", opacity: 0 }}
                animate={{
                  y: i === wordIdx ? 0 : i === (wordIdx - 1 + WORDS.length) % WORDS.length ? "-100%" : "100%",
                  opacity: i === wordIdx ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="mt-6 max-w-xl font-light"
          style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.75 }}
        >
          I craft{" "}
          <strong style={{ color: "var(--text)", fontWeight: 500 }}>fast, polished, production-ready</strong>{" "}
          web experiences. Specialising in React &amp; Next.js — from e-commerce platforms to admin dashboards.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex gap-4 mt-8 flex-wrap"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm"
            style={{
              background: "var(--accent)",
              color: "#080b10",
              boxShadow: "0 0 0 rgba(76,255,176,0)",
              transition: "box-shadow 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 36px rgba(76,255,176,0.35)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 0 rgba(76,255,176,0)")}
          >
            View Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium"
            style={{ border: "1px solid var(--border2)", color: "var(--text)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(76,255,176,0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border2)"; }}
          >
            Get in touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
