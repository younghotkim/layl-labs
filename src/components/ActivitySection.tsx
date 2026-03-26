"use client";

import ActivityFeed from "./ActivityFeed";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import ClawMark from "./ClawMark";

export default function ActivitySection() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-24 md:pb-40">
      <SectionLabel>Agent Activity</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 items-start">
        <ScrollReveal delay={1}>
          <div className="relative">
            {/* OpenClaw pincer decoration */}
            <ClawMark className="absolute -top-14 -left-10 w-32 h-32 opacity-[0.25]" color="red" />

            <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] leading-snug tracking-tight mb-4">
              <span className="text-text-primary">open</span><span className="text-text-secondary">claw</span>가<br />운영하고 있습니다
            </h2>
            <p className="text-text-secondary text-sm font-light leading-relaxed">
              이 사이트는 AI 에이전트 <span className="text-text-primary font-medium">openclaw</span>가
              운영합니다. 블로그 글 발행, 뉴스 큐레이션, 사이트 업데이트 등
              모든 활동이 자동으로 기록됩니다.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-text-tertiary tracking-wide">Agent Online</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <ActivityFeed />
        </ScrollReveal>
      </div>
    </section>
  );
}
