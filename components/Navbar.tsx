"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-[900] flex justify-between items-center px-[5vw] py-4"
      style={{
        background: scrolled ? "rgba(8,11,16,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
      }}
    >
      {/* Logo */}
      <Link href="#" className="font-display font-extrabold text-lg tracking-tight">
        DG<span style={{ color: "var(--accent)" }}>.</span>
      </Link>

      {/* Links */}
      <ul className="hidden md:flex gap-8 list-none">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="relative font-mono text-[11px] tracking-widest uppercase transition-colors duration-200"
              style={{ color: active === link.href ? "var(--text)" : "var(--muted)" }}
              onMouseEnter={() => setActive(link.href)}
              onMouseLeave={() => setActive("")}
            >
              <motion.span
                className="absolute -bottom-0.5 left-0 h-px"
                style={{ background: "var(--accent)" }}
                initial={{ width: 0 }}
                animate={{ width: active === link.href ? "100%" : 0 }}
                transition={{ duration: 0.2 }}
              />
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <motion.a
        href="mailto:guptadeepakk8@gmail.com"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-[11px] tracking-widest uppercase"
        style={{
          border: "1px solid var(--border2)",
          color: "var(--text)",
          transition: "border-color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border2)")}
      >
        Hire me
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </motion.nav>
  );
}
