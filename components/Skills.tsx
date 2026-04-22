"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const SKILLS = [
  "React.js", "Next.js", "TypeScript", "Tailwind CSS",
  "Redux", "TanStack Query", "Node.js", "Express.js",
  "MongoDB", "AWS", "Docker", "Git",
  "Ant Design", "Material UI", "JavaScript", "REST APIs",
  "Razorpay", "JWT",
];

export default function Skills() {
  const ref = useRef(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const physicsLoaded = useRef(false);

  useEffect(() => {
    if (!sceneRef.current || physicsLoaded.current) return;
    physicsLoaded.current = true;

    let engine: any, runner: any, render: any;

    const run = async () => {
      const Matter = (await import("matter-js")).default;
      const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body } = Matter;

      const container = sceneRef.current!;
      const W = container.clientWidth;
      const H = container.clientHeight;

      engine = Engine.create({ gravity: { x: 0, y: 0.5 } });

      render = Render.create({
        element: container,
        engine,
        options: {
          width: W,
          height: H,
          wireframes: false,
          background: "transparent",
        },
      });

      // Invisible walls
      const thick = 30;
      Composite.add(engine.world, [
        Bodies.rectangle(W / 2, H + thick / 2, W, thick, { isStatic: true, render: { fillStyle: "transparent", strokeStyle: "transparent" } }),
        Bodies.rectangle(-thick / 2, H / 2, thick, H * 2, { isStatic: true, render: { fillStyle: "transparent", strokeStyle: "transparent" } }),
        Bodies.rectangle(W + thick / 2, H / 2, thick, H * 2, { isStatic: true, render: { fillStyle: "transparent", strokeStyle: "transparent" } }),
      ]);

      // Skill pill bodies
      const skillBodies = SKILLS.map((skill, i) => {
        const cols = Math.min(5, Math.floor(W / 130));
        const col = i % cols;
        const row = Math.floor(i / cols);
        const pillW = Math.max(skill.length * 9 + 30, 80);
        const pillH = 36;
        const x = (col + 0.5) * (W / cols) + (Math.random() - 0.5) * 20;
        const y = -row * 60 - 40;

        const body = Bodies.rectangle(x, y, pillW, pillH, {
          restitution: 0.5,
          friction: 0.07,
          frictionAir: 0.02,
          chamfer: { radius: 18 },
          render: {
            fillStyle: "rgba(14,18,25,0.95)",
            strokeStyle: "rgba(76,255,176,0.25)",
            lineWidth: 1,
          },
          label: skill,
        });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);
        return body;
      });
      Composite.add(engine.world, skillBodies);

      // Mouse interaction
      const mouse = Mouse.create(render.canvas);
      mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);
      const mc = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.25, render: { visible: false } },
      });
      Composite.add(engine.world, mc);
      render.mouse = mouse;

      // Draw text labels
      Events.on(render, "afterRender", () => {
        const ctx = render.context as CanvasRenderingContext2D;
        skillBodies.forEach((body) => {
          ctx.save();
          ctx.translate(body.position.x, body.position.y);
          ctx.rotate(body.angle);
          ctx.font = "400 12px 'DM Mono', monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#4fffb0";
          ctx.fillText(body.label as string, 0, 0);
          ctx.restore();
        });
      });

      Render.run(render);
      runner = Runner.create();
      Runner.run(runner, engine);

      // Shake every 4s
      const shakeInterval = setInterval(() => {
        skillBodies.forEach((b) => {
          Body.applyForce(b, b.position, {
            x: (Math.random() - 0.5) * 0.005,
            y: -Math.random() * 0.004,
          });
        });
      }, 4000);

      return shakeInterval;
    };

    let shakeInterval: ReturnType<typeof setInterval>;
    run().then((si) => { shakeInterval = si!; });

    return () => {
      clearInterval(shakeInterval);
      if (render) {
        const MatterClean = require("matter-js");
        MatterClean.Render.stop(render);
        MatterClean.Runner.stop(runner);
        MatterClean.Engine.clear(engine);
        if (render.canvas?.parentNode) {
          render.canvas.parentNode.removeChild(render.canvas);
        }
      }
    };
  }, []);

  return (
    <section id="skills" className="relative z-10 max-w-[1100px] mx-auto px-[5vw] pb-28">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="section-label"
      >
        04 / Skills
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="section-title mb-4"
      >
        My toolbox
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        className="text-sm mb-8"
        style={{ color: "var(--muted)", fontFamily: "var(--font-dm-mono)" }}
      >
        Drag the pills · They have physics
      </motion.p>

      {/* Physics playground */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
        ref={sceneRef}
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          height: "440px",
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          cursor: "grab",
        }}
      >
        {/* Watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "6rem",
            fontWeight: 800,
            color: "var(--accent)",
            opacity: 0.03,
            letterSpacing: "-0.05em",
          }}
        >
          Skills
        </div>
      </motion.div>
    </section>
  );
}
