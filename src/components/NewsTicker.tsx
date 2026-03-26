"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Clip {
  id: string;
  title: string;
  summary: string;
  source_url: string | null;
  source_name: string | null;
  tags: string[];
}

interface NewsTickerProps {
  clips: Clip[];
}

export default function NewsTicker({ clips }: NewsTickerProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"up" | "none">("none");

  const next = useCallback(() => {
    setDirection("up");
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % clips.length);
      setDirection("none");
    }, 400);
  }, [clips.length]);

  useEffect(() => {
    if (clips.length <= 1) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next, clips.length]);

  if (clips.length === 0) return null;

  const clip = clips[current];

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-6 border-y border-border">
      <div className="flex items-center gap-6">
        {/* Live badge */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-[0.6rem] tracking-[0.15em] uppercase text-text-tertiary font-medium">
            News
          </span>
        </div>

        {/* Ticker content */}
        <div className="flex-1 min-w-0 overflow-hidden relative h-12 flex items-center">
          <div
            className={`absolute inset-0 flex items-center transition-all duration-400 ease-out ${
              direction === "up"
                ? "-translate-y-full opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <div className="flex items-center gap-3 w-full min-w-0">
              {clip.source_name && (
                <span className="text-[0.6rem] tracking-[0.1em] uppercase text-accent font-medium shrink-0">
                  {clip.source_name}
                </span>
              )}

              {clip.source_url ? (
                <a
                  href={clip.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.9rem] text-text-primary font-normal truncate hover:text-accent transition-colors duration-300"
                >
                  {clip.title}
                </a>
              ) : (
                <span className="text-[0.9rem] text-text-primary font-normal truncate">
                  {clip.title}
                </span>
              )}

              {clip.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="hidden md:inline text-[0.55rem] px-1.5 py-0.5 border border-border text-text-tertiary tracking-wide shrink-0"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Counter + link */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-[0.65rem] text-text-tertiary tabular-nums">
            {current + 1}/{clips.length}
          </span>
          <Link
            href="/news"
            className="text-[0.65rem] tracking-[0.1em] uppercase text-text-tertiary hover:text-accent transition-colors duration-300"
          >
            All
          </Link>
        </div>
      </div>
    </div>
  );
}
