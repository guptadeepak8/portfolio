"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EXPERIENCES = [
  {
    role: "Frontend Developer",
    company: "PrintoKart",
    period: "Jun 2024 – Present",
    type: "Full-time",
    bullets: [
      "Built scalable e-commerce frontend with Next.js, Ant Design & Tailwind CSS — Razorpay payments, deployed on AWS",
      "Internal admin dashboard with React & TanStack Query managing orders & users — improved efficiency by 30%",
      "Reduced page load time by 20% and significantly increased Lighthouse scores through performance & accessibility work",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Ant Design", "TanStack Query", "AWS", "Razorpay"],
  },
  {
    role: "Freelance Frontend Developer",
    company: "Remote",
    period: "Dec 2023 – Jun 2024",
    type: "Freelance",
    bullets: [
      "End-to-end frontend for multiple clients — from requirements to deployment using React, Next.js & Tailwind CSS",
      "Built responsive landing pages, job portal UIs, and interactive forms with improved state management",
    ],
    stack: ["React", "Next.js", "Tailwind CSS", "JavaScript"],
  },
];

function ExpCard({ exp, index }: { exp: typeof EXPERIENCES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="relative group"
      style={{
        background: "var(--bg2)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        padding: "2rem",
        overflow: "hidden",
        transition: "border-color 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border2)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      {/* Animated left accent bar */}
      <motion.div
        className="absolute left-0 top-0 w-[3px] rounded-r-full"
        style={{
          background: "linear-gradient(to bottom, var(--accent), var(--accent2))",
          height: "0%",
        }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.3, ease: "easeOut" }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: "radial-gradient(circle at top left, rgba(76,255,176,0.04), transparent 60%)",
          transition: "opacity 0.4s",
        }}
      />

      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-3 mb-4">
        <div>
          <h3 className="font-display font-bold text-xl" style={{ color: "var(--text)" }}>
            {exp.role}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.95rem" }}>
              {exp.company}
            </span>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider"
              style={{
                background: "rgba(76,255,176,0.08)",
                border: "1px solid rgba(76,255,176,0.15)",
                color: "var(--accent)",
              }}
            >
              {exp.type}
            </span>
          </div>
        </div>
        <span
          className="font-mono text-[11px] px-3 py-1.5 rounded-full"
          style={{
            background: "var(--bg3)",
            border: "1px solid var(--border)",
            color: "var(--muted)",
          }}
        >
          {exp.period}
        </span>
      </div>

      {/* Bullets */}
      <ul className="space-y-2 mb-5">
        {exp.bullets.map((b, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.4 + i * 0.08 }}
            className="flex gap-3 text-sm"
            style={{ color: "var(--muted)", lineHeight: 1.65 }}
          >
            <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "3px", fontSize: "10px" }}>▶</span>
            {b}
          </motion.li>
        ))}
      </ul>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-2">
        {exp.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[11px] px-2 py-1 rounded"
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              color: "var(--muted)",
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="experience" className="relative z-10 max-w-[1100px] mx-auto px-[5vw] py-28">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="section-label"
      >
        02 / Experience
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="section-title mb-10"
      >
        Where I&apos;ve<br />worked
      </motion.h2>

      <div className="grid gap-6">
        {EXPERIENCES.map((exp, i) => (
          <ExpCard key={exp.company} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}
