"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";

const LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/guptadeepakk8/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-3a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/guptadeepak8",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.12 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
      </svg>
    ),
  },
  {
    label: "Portfolio",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="12" cy="12" r="4" />
        <line x1="16.5" y1="7.5" x2="16.5" y2="7.5" strokeWidth="2.5" />
      </svg>
    ),
  },
];

function MagneticEmail() {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 18 });
  const sy = useSpring(y, { stiffness: 120, damping: 18 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href="mailto:guptadeepakk8@gmail.com"
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="font-display font-extrabold block"
      whileHover={{ color: "var(--accent)" } as any}
      transition={{ duration: 0.2 }}
      initial={{ color: "var(--text)" }}
    >
      <span style={{ fontSize: "clamp(1.6rem, 4.5vw, 3.2rem)", letterSpacing: "-0.03em", textDecoration: "none", color: "inherit" }}>
        guptadeepakk8@gmail.com
      </span>
    </motion.a>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="contact"
      className="relative z-10 max-w-[1100px] mx-auto px-[5vw]"
      style={{ paddingBottom: "6rem" }}
    >
      {/* Divider */}
      <div className="w-full h-px mb-20" style={{ background: "var(--border)" }} />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="font-mono text-xs uppercase tracking-[0.2em] mb-6"
          style={{ color: "var(--muted)" }}
        >
          Available for new opportunities
          <span
            className="inline-block w-2 h-2 rounded-full ml-3 align-middle"
            style={{ background: "var(--accent)", animation: "pulse 2s infinite" }}
          />
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="font-display font-extrabold mb-3"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
        >
          Let&apos;s build something
          <br />
          <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.2)" }}>
            extraordinary
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="mt-8 mb-12 inline-block"
        >
          <MagneticEmail />
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center flex-wrap gap-4"
        >
          {LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 + i * 0.07 }}
              whileHover={{ y: -3, color: "var(--text)" } as any}
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-4 py-2.5 rounded-lg"
              style={{
                color: "var(--muted)",
                border: "1px solid var(--border)",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(76,255,176,0.3)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              {link.icon}
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-16 font-mono text-[11px]"
          style={{ color: "rgba(136,146,164,0.4)" }}
        >
          Designed &amp; built by Deepak Gupta
        </motion.p>
      </motion.div>
    </section>
  );
}
