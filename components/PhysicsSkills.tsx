"use client";

import { useEffect, useRef } from "react";

const SKILLS = [
  "React.js", "Next.js", "TypeScript", "Tailwind CSS",
  "Redux", "TanStack Query", "Node.js", "Express.js",
  "MongoDB", "AWS", "Docker", "Git",
  "Ant Design", "Material UI", "JavaScript", "REST APIs",
];

export default function PhysicsSkills() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let engine: any, runner: any, render: any;


    const init = async () => {
      const Matter = (await import("matter-js")).default;
      const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body } = Matter;

      const container = sceneRef.current!;
      const W = container.clientWidth;
      const H = container.clientHeight;

      engine = Engine.create({ gravity: { x: 0, y: 0.4 } });
      const world = engine.world;

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

      // Walls (invisible)
      const walls = [
        Bodies.rectangle(W / 2, H + 25, W, 50, { isStatic: true, render: { fillStyle: "transparent" } }),
        Bodies.rectangle(-25, H / 2, 50, H, { isStatic: true, render: { fillStyle: "transparent" } }),
        Bodies.rectangle(W + 25, H / 2, 50, H, { isStatic: true, render: { fillStyle: "transparent" } }),
        Bodies.rectangle(W / 2, -25, W, 50, { isStatic: true, render: { fillStyle: "transparent" } }),
      ];
      Composite.add(world, walls);

      // Skill pill bodies
      const skillBodies = SKILLS.map((skill, i) => {
        const w = skill.length * 9 + 28;
        const h = 34;
        const x = 80 + (i % 5) * (W / 5) + Math.random() * 40;
        const y = 60 + Math.floor(i / 5) * 80;
        const body = Bodies.rectangle(x, y, w, h, {
          restitution: 0.55,
          friction: 0.08,
          frictionAir: 0.018,
          chamfer: { radius: 17 },
          render: {
            fillStyle: "rgba(14,18,25,0.92)",
            strokeStyle: "rgba(76,255,176,0.22)",
            lineWidth: 1,
          },
          label: skill,
        });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
        return body;
      });
      Composite.add(world, skillBodies);

      // Mouse constraint
      const mouse = Mouse.create(render.canvas);
      const mc = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });
      Composite.add(world, mc);
      render.mouse = mouse;

      // Custom text rendering on canvas
      Events.on(render, "afterRender", () => {
        const ctx = render.context as CanvasRenderingContext2D;
        ctx.font = "400 12px 'DM Mono', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        skillBodies.forEach((body) => {
          ctx.save();
          ctx.translate(body.position.x, body.position.y);
          ctx.rotate(body.angle);
          ctx.fillStyle = "#4fffb0";
          ctx.fillText(body.label as string, 0, 0);
          ctx.restore();
        });
      });

      Render.run(render);
      runner = Runner.create();
      Runner.run(runner, engine);

      // Gentle "shake" every few seconds to keep things lively
      const shake = setInterval(() => {
        skillBodies.forEach((b) => {
          Body.applyForce(b, b.position, {
            x: (Math.random() - 0.5) * 0.004,
            y: -Math.random() * 0.003,
          });
        });
      }, 3500);

      return () => clearInterval(shake);
    };

    const cleanup = init();

    return () => {
      cleanup.then(() => {});
      if (render) {
        const Matter = require("matter-js");
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
        Matter.Engine.clear(engine);
        if (render.canvas?.parentNode) render.canvas.parentNode.removeChild(render.canvas);
      }
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        height: "420px",
        background: "var(--bg2)",
        border: "1px solid var(--border)",
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        style={{ opacity: 0.04, fontFamily: "var(--font-syne)", fontSize: "7rem", fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.05em" }}
      >
        Skills
      </div>
    </div>
  );
}
