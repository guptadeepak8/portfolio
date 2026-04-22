"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="education" className="relative z-10 max-w-[1100px] mx-auto px-[5vw] pb-28">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="section-label"
      >
        05 / Education
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="section-title mb-10"
      >
        Academic<br />background
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.25, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="flex justify-between items-center flex-wrap gap-6 rounded-2xl p-8 group"
        style={{
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          transition: "border-color 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border2)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        <div>
          <div
            className="font-mono text-xs uppercase tracking-widest mb-2"
            style={{ color: "var(--accent)" }}
          >
            2019 – 2023
          </div>
          <h3
            className="font-display font-bold"
            style={{ fontSize: "1.4rem", color: "var(--text)", letterSpacing: "-0.02em" }}
          >
           Universal College of Engineering
          </h3>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          B.Tech — IT ,Mumbai, India
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.04 }}
          className="flex items-center gap-3 px-5 py-3 rounded-xl"
          style={{
            background: "var(--bg3)",
            border: "1px solid var(--border)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="font-display font-bold"
            style={{ fontSize: "1.1rem", color: "var(--text)", letterSpacing: "-0.02em" }}
          >
            Graduate
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
