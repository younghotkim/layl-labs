"use client";

import { useEffect, useRef } from "react";

interface ActivityEvent {
  id: string;
  type: string;
}

interface NeuralBackgroundProps {
  events?: ActivityEvent[];
}

const NODE_COUNT = 80;
const SPREAD_X = 18;
const SPREAD_Y = 11;
const SPREAD_Z = 6;
const CONNECTION_DIST = 4.5;
const DRIFT_SPEED = 0.12;

interface Node {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  bx: number; by: number; bz: number;
  phase: number;
  brightness: number;
  size: number;
}

export default function NeuralBackground({ events = [] }: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    nodes: Node[];
    mouse: { x: number; y: number };
    time: number;
    lastTime: number;
    frameId: number;
    eventQueue: number;
  } | null>(null);
  const lastEventCount = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size
    const container = canvas.parentElement!;
    let width = container.clientWidth;
    let height = container.clientHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);

    function resize() {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    // Init nodes
    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * SPREAD_X;
      const y = (Math.random() - 0.5) * SPREAD_Y;
      const z = (Math.random() - 0.5) * SPREAD_Z;
      nodes.push({
        x, y, z,
        vx: (Math.random() - 0.5) * DRIFT_SPEED,
        vy: (Math.random() - 0.5) * DRIFT_SPEED,
        vz: (Math.random() - 0.5) * DRIFT_SPEED * 0.2,
        bx: x, by: y, bz: z,
        phase: Math.random() * Math.PI * 2,
        brightness: 0.3 + Math.random() * 0.4,
        size: 2.5 + Math.random() * 2.5,
      });
    }

    const state = {
      nodes,
      mouse: { x: 9999, y: 9999 },
      time: 0,
      lastTime: performance.now(),
      frameId: 0,
      eventQueue: 0,
    };
    stateRef.current = state;

    // Project 3D → 2D (simple perspective)
    function project(nx: number, ny: number, nz: number): [number, number, number] {
      const fov = 20;
      const perspective = fov / (fov + nz);
      const sx = width / 2 + nx * (width / SPREAD_X) * perspective * 0.5;
      const sy = height / 2 - ny * (height / SPREAD_Y) * perspective * 0.5;
      return [sx, sy, perspective];
    }

    function animate() {
      const now = performance.now();
      const dt = Math.min((now - state.lastTime) / 1000, 0.05);
      state.lastTime = now;
      state.time += dt;
      const t = state.time;

      ctx!.clearRect(0, 0, width, height);

      // Process event pulses
      if (state.eventQueue > 0) {
        state.eventQueue--;
        for (let k = 0; k < 10; k++) {
          const idx = Math.floor(Math.random() * NODE_COUNT);
          nodes[idx].brightness = 1.0;
          nodes[idx].phase = t;
        }
      }

      // Camera drift offsets
      const camX = Math.sin(t * 0.08) * 0.8;
      const camY = Math.cos(t * 0.06) * 0.4;

      // Update nodes
      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i];

        // Drift
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.z += n.vz * dt;

        // Spring to base
        n.vx += (n.bx - n.x) * 0.5 * dt;
        n.vy += (n.by - n.y) * 0.5 * dt;
        n.vz += (n.bz - n.z) * 0.3 * dt;

        // Damping
        const damp = 1 - 0.8 * dt;
        n.vx *= damp;
        n.vy *= damp;
        n.vz *= damp;

        // Mouse repulsion
        const [sx, sy] = project(n.x - camX, n.y - camY, n.z);
        const mdx = sx - state.mouse.x;
        const mdy = sy - state.mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 120) {
          const force = (120 - mdist) / 120 * 2 * dt;
          n.vx += (mdx / mdist) * force;
          n.vy -= (mdy / mdist) * force;
        }

        // Brightness pulse
        const pulse = Math.sin(t * 0.3 + n.phase) * 0.1;
        n.brightness = Math.max(n.brightness - dt * 0.3, 0.12 + pulse);
      }

      // Draw edges
      for (let i = 0; i < NODE_COUNT; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.22 *
              (0.5 + (a.brightness + b.brightness) * 0.5);

            const [ax, ay] = project(a.x - camX, a.y - camY, a.z);
            const [bx, by] = project(b.x - camX, b.y - camY, b.z);

            ctx!.beginPath();
            ctx!.moveTo(ax, ay);
            ctx!.lineTo(bx, by);
            ctx!.strokeStyle = `rgba(190, 190, 200, ${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i];
        const [sx, sy, p] = project(n.x - camX, n.y - camY, n.z);
        const r = n.size * p;
        const alpha = n.brightness;

        // Glow
        const gradient = ctx!.createRadialGradient(sx, sy, 0, sx, sy, r * 6);
        gradient.addColorStop(0, `rgba(230, 230, 235, ${alpha * 0.8})`);
        gradient.addColorStop(0.3, `rgba(230, 230, 235, ${alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(230, 230, 235, 0)`);

        ctx!.beginPath();
        ctx!.arc(sx, sy, r * 6, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();

        // Core dot
        ctx!.beginPath();
        ctx!.arc(sx, sy, r * 0.6, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(230, 230, 235, ${Math.min(alpha * 1.5, 1)})`;
        ctx!.fill();
      }

      state.frameId = requestAnimationFrame(animate);
    }

    state.frameId = requestAnimationFrame(animate);

    const onResize = () => resize();
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      state.mouse.x = e.clientX - rect.left;
      state.mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      state.mouse.x = 9999;
      state.mouse.y = 9999;
    };

    window.addEventListener("resize", onResize);
    container.addEventListener("mousemove", onMouseMove, { passive: true });
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(state.frameId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      stateRef.current = null;
    };
  }, []);

  // React to events
  useEffect(() => {
    const s = stateRef.current;
    if (!s) return;
    if (events.length > lastEventCount.current) {
      s.eventQueue += events.length - lastEventCount.current;
      lastEventCount.current = events.length;
    }
  }, [events]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
