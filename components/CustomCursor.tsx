"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.left = mx - 3 + "px";
        dotRef.current.style.top = my - 3 + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    animate();

    const interactables = document.querySelectorAll("a, button, [data-cursor]");
    const enter = () => setIsHovering(true);
    const leave = () => setIsHovering(false);
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] rounded-full transition-transform duration-100"
        style={{
          width: isClicking ? "4px" : "6px",
          height: isClicking ? "4px" : "6px",
          background: "var(--accent)",
          transform: isClicking ? "scale(0.6)" : "scale(1)",
          mixBlendMode: "screen",
          willChange: "left, top",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] rounded-full"
        style={{
          width: isHovering ? "52px" : isClicking ? "24px" : "34px",
          height: isHovering ? "52px" : isClicking ? "24px" : "34px",
          border: `1px solid ${isHovering ? "rgba(76,255,176,0.7)" : "rgba(76,255,176,0.35)"}`,
          transform: "translate(-50%,-50%)",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
          willChange: "left, top",
          backdropFilter: isHovering ? "blur(1px)" : "none",
        }}
      />
    </>
  );
}
