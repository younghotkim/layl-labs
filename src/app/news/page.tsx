import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { getAllClips } from "@/lib/clips";

export const metadata: Metadata = {
  title: "News",
  description: "OpenClaw가 큐레이션한 AI·에이전트·개발 트렌드 뉴스 클리핑",
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "방금";
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  return new Date(iso).toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
}

export default async function NewsPage() {
  const clips = await getAllClips();

  // 날짜별 그룹핑
  const grouped = clips.reduce<Record<string, typeof clips>>((acc, clip) => {
    const date = new Date(clip.created_at).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(clip);
    return acc;
  }, {});

  return (
    <>
      <Nav />

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-36 pb-24 md:pb-40">
        <ScrollReveal>
          <p className="text-xs font-normal tracking-[0.2em] uppercase text-accent mb-4">
            Curated by OpenClaw
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-tight tracking-tight mb-4">
            News
          </h1>
          <p className="text-text-secondary font-light text-lg max-w-lg">
            AI, 에이전트, 개발 트렌드 — OpenClaw가 매일 골라주는 뉴스 클리핑.
          </p>
        </ScrollReveal>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 h-px bg-border" />

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24">
        {clips.length === 0 ? (
          <ScrollReveal>
            <p className="text-text-tertiary text-center py-20">
              아직 클리핑된 뉴스가 없습니다. OpenClaw가 곧 첫 뉴스를 가져옵니다.
            </p>
          </ScrollReveal>
        ) : (
          <div className="flex flex-col gap-16">
            {Object.entries(grouped).map(([date, dateClips]) => (
              <div key={date}>
                <ScrollReveal>
                  <h2 className="text-[0.75rem] tracking-[0.15em] uppercase text-text-tertiary mb-6 pb-3 border-b border-border">
                    {date}
                  </h2>
                </ScrollReveal>

                <div className="flex flex-col gap-0">
                  {dateClips.map((clip, i) => (
                    <ScrollReveal key={clip.id} delay={Math.min(i + 1, 4)}>
                      <div
                        className={`py-5 border-b border-border transition-all duration-300 ${
                          i === 0 ? "" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              {clip.source_name && (
                                <span className="text-[0.65rem] tracking-[0.1em] uppercase text-accent font-medium">
                                  {clip.source_name}
                                </span>
                              )}
                              <span className="text-[0.65rem] text-text-tertiary">
                                {timeAgo(clip.created_at)}
                              </span>
                            </div>

                            {clip.source_url ? (
                              <a
                                href={clip.source_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                              >
                                <h3 className="text-[0.95rem] text-text-primary font-normal leading-snug group-hover:text-accent transition-colors duration-300">
                                  {clip.title}
                                </h3>
                              </a>
                            ) : (
                              <h3 className="text-[0.95rem] text-text-primary font-normal leading-snug">
                                {clip.title}
                              </h3>
                            )}

                            <p className="text-sm text-text-secondary font-light mt-1.5 leading-relaxed">
                              {clip.summary}
                            </p>

                            {clip.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {clip.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[0.6rem] px-2 py-0.5 border border-border text-text-tertiary tracking-wide"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {clip.source_url && (
                            <a
                              href={clip.source_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 mt-1"
                              aria-label="원문 보기"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                strokeWidth="1.5"
                                className="w-4 h-4 stroke-text-tertiary hover:stroke-accent transition-colors duration-300"
                              >
                                <path d="M7 17L17 7M17 7H7M17 7v10" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
