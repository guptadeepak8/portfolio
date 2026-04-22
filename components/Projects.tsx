"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";

const PROJECTS = [
  {
    num: "01",
    name: "IdeaFlow",
    desc: "Full-stack idea management platform with real-time updates and collaborative workflows. Secure auth via Clerk, real-time data with Convex.",
    stack: ["Next.js", "Convex", "Clerk", "Shadcn UI", "Tailwind CSS"],
    color: "76,255,176",
    link: "#",
  },
  {
    num: "02",
    name: "CareerLink",
    desc: "Job portal with role-based access for seekers & recruiters. Redux state management, JWT auth, and full Node.js/Express backend.",
    stack: ["React", "Redux", "Node.js", "Express", "MongoDB", "JWT"],
    color: "0,212,255",
    link: "#",
  },
  {
    num: "03",
    name: "E-Kart",
    desc: "E-commerce app with responsive UI, Redux for cart & user sessions, and secure REST APIs with JWT authentication.",
    stack: ["React", "Redux", "Node.js", "Express", "MongoDB"],
    color: "124,109,250",
    link: "#",
  },
];

function TiltCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          transformStyle: "preserve-3d",
          transition: "border-color 0.3s",
        }}
        whileHover={{
          borderColor: `rgba(${project.color},0.4)`,
          y: -6,
        }}
      >
        {/* Top glow on hover */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, rgba(${project.color},0.07), transparent 55%)`,
          }}
        />

        {/* Number */}
        <span
          className="font-mono text-[11px] tracking-widest"
          style={{ color: "var(--muted)" }}
        >
          {project.num}
        </span>

        {/* Name */}
        <h3 className="font-display font-bold" style={{ fontSize: "1.45rem", lineHeight: 1.15, color: "var(--text)" }}>
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-sm flex-1" style={{ color: "var(--muted)", lineHeight: 1.7 }}>
          {project.desc}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] px-2 py-1 rounded"
              style={{
                background: `rgba(${project.color},0.07)`,
                border: `1px solid rgba(${project.color},0.18)`,
                color: `rgb(${project.color})`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link */}
        <motion.a
          href={project.link}
          className="inline-flex items-center gap-2 mt-1 font-mono text-[12px]"
          style={{ color: "var(--muted)" }}
          whileHover={{ x: 4, color: `rgb(${project.color})` } as any}
          transition={{ duration: 0.2 }}
        >
          View project
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="projects" className="relative z-10 max-w-[1100px] mx-auto px-[5vw] pb-28">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="section-label"
      >
        03 / Projects
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="section-title mb-10"
      >
        Things I&apos;ve<br />built
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((p, i) => (
          <TiltCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
