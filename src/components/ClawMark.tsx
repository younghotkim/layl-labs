"use client";

import { useEffect, useRef } from "react";

interface Props {
  className?: string;
  animate?: boolean;
  color?: "red" | "mono";
}

export default function ClawMark({ className = "", animate = true, color = "red" }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animate) return;
    const svg = ref.current;
    if (!svg) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          svg.classList.add("claw-animate");
          observer.unobserve(svg);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(svg);
    return () => observer.disconnect();
  }, [animate]);

  // OpenClaw-inspired red: #e81b25
  const primary = color === "red" ? "#e81b25" : "currentColor";
  const dark = color === "red" ? "#1a0506" : "currentColor";

  return (
    <svg
      ref={ref}
      viewBox="0 0 120 120"
      className={`claw-mark ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* === Left Pincer === */}
      {/* Outer claw — thick, filled, lobster-like */}
      <path
        className="claw-prong claw-prong-left"
        d="M55 80 C50 66, 38 52, 24 42 C14 34, 6 24, 4 14 C3 8, 6 4, 14 4 C20 4, 26 10, 30 20 C33 28, 30 34, 24 36 L30 44 C38 54, 48 66, 52 76 Z"
        fill={primary}
        stroke={primary}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
      />
      {/* Left inner highlight */}
      <path
        className="claw-prong claw-prong-left-inner"
        d="M50 72 C46 62, 38 52, 28 44 C22 40, 16 32, 14 24"
        stroke={dark}
        strokeWidth="3"
        strokeLinecap="round"
        pathLength="1"
        opacity="0.3"
      />
      {/* Left claw tip */}
      <path
        className="claw-detail claw-detail-left"
        d="M14 4 C8 2, 3 4, 2 10 C1 16, 3 12, 4 14"
        fill={primary}
        stroke={primary}
        strokeWidth="2"
        strokeLinecap="round"
        pathLength="1"
      />

      {/* === Right Pincer === */}
      <path
        className="claw-prong claw-prong-right"
        d="M65 80 C70 66, 82 52, 96 42 C106 34, 114 24, 116 14 C117 8, 114 4, 106 4 C100 4, 94 10, 90 20 C87 28, 90 34, 96 36 L90 44 C82 54, 72 66, 68 76 Z"
        fill={primary}
        stroke={primary}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
      />
      {/* Right inner highlight */}
      <path
        className="claw-prong claw-prong-right-inner"
        d="M70 72 C74 62, 82 52, 92 44 C98 40, 104 32, 106 24"
        stroke={dark}
        strokeWidth="3"
        strokeLinecap="round"
        pathLength="1"
        opacity="0.3"
      />
      {/* Right claw tip */}
      <path
        className="claw-detail claw-detail-right"
        d="M106 4 C112 2, 117 4, 118 10 C119 16, 117 12, 116 14"
        fill={primary}
        stroke={primary}
        strokeWidth="2"
        strokeLinecap="round"
        pathLength="1"
      />

      {/* === Joint / Base === */}
      <path
        className="claw-base"
        d="M55 80 C55 88, 52 94, 50 100 C48 106, 53 110, 60 110 C67 110, 72 106, 70 100 C68 94, 65 88, 65 80"
        fill={primary}
        stroke={primary}
        strokeWidth="2"
        strokeLinejoin="round"
        pathLength="1"
        opacity="0.85"
      />
      {/* Joint segment */}
      <ellipse
        className="claw-base"
        cx="60" cy="90"
        rx="5" ry="3.5"
        fill={dark}
        opacity="0.4"
        pathLength="1"
      />
    </svg>
  );
}
