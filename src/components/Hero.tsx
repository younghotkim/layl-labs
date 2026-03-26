"use client";

import NeuralBackground from "./NeuralBackground";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 max-w-6xl mx-auto relative overflow-hidden">
      {/* Three.js Neural Network Background */}
      <NeuralBackground />

      <p
        className="text-xs font-normal tracking-[0.2em] uppercase text-accent mb-6 opacity-0 translate-y-6 relative z-10"
        style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s forwards" }}
      >
        LAYL — YOUNGHA KIM
      </p>

      <div className="relative z-10">
        <h1 className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-[1.2] tracking-tight text-text-primary mb-8">
          <span className="block overflow-visible hero-line pt-1 pb-1">
            <span>I Build with</span>
          </span>
          <span className="block overflow-visible hero-line pt-1 pb-1">
            <span>
              <span className="font-semibold text-accent">AI Agents</span>
            </span>
          </span>
        </h1>
      </div>

      <p
        className="text-lg text-text-secondary font-light leading-relaxed max-w-lg opacity-0 translate-y-6 relative z-10"
        style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s forwards" }}
      >
        만들고, 실험하고, 과정을 공유하는 <strong className="text-text-primary font-medium">라일</strong>입니다.
        <br />
        이 사이트도 AI 에이전트 <strong className="text-text-primary font-medium">OpenClaw</strong>와 함께 만들어가고 있습니다.
      </p>

      <div
        className="absolute bottom-12 left-6 md:left-12 flex items-center gap-3 text-text-tertiary text-[0.7rem] tracking-widest uppercase opacity-0 z-10"
        style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 1s forwards" }}
      >
        <div className="w-px h-12 bg-border relative overflow-hidden">
          <div
            className="absolute left-0 w-full h-full bg-accent"
            style={{ animation: "scrollPulse 2s ease-in-out infinite" }}
          />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
