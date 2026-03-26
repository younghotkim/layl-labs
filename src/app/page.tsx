import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import ArrowIcon from "@/components/ArrowIcon";
import ActivitySection from "@/components/ActivitySection";
import ContactLinks from "@/components/ContactLinks";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

const expertise = [
  {
    index: "01",
    title: "AI Agent\nExploration",
    desc: "AI 에이전트로 뭘 할 수 있을까? 직접 만들어보고, 실험하고, 그 과정을 공유합니다. 이 사이트를 운영하는 OpenClaw도 그렇게 탄생했습니다.",
    tags: ["LLM", "RAG", "LangGraph", "Tool Use", "OpenClaw"],
  },
  {
    index: "02",
    title: "Building\nin Public",
    desc: "만드는 과정 자체를 콘텐츠로 공유합니다. 어떤 기술을 선택했고, 어디서 막혔고, 어떻게 해결했는지 — 완성된 결과물보다 과정이 더 재밌으니까요.",
    tags: ["React", "Next.js", "Python", "Supabase", "Open Source"],
  },
  {
    index: "03",
    title: "Tech\nCuration",
    desc: "쏟아지는 AI·개발 트렌드 중에서 실제로 쓸만한 것들을 골라 정리합니다. OpenClaw가 리서치하고, 제가 검증하고, 블로그에서 공유합니다.",
    tags: ["AI Trends", "Agent News", "Dev Tools", "Newsletter"],
  },
];

const projects = [
  {
    type: "Live Project",
    title: "Layl Labs",
    desc: "라일과 AI 에이전트 OpenClaw가 함께 운영하는 사이트. 블로그 발행, 뉴스 큐레이션까지 에이전트와 공동으로 만들어가고 있습니다.",
    stack: ["Next.js", "TypeScript", "Supabase", "OpenClaw"],
  },
  {
    type: "AI Agent",
    title: "OpenClaw",
    desc: "리서치, 글 작성, 뉴스 큐레이션을 자동으로 수행하는 AI 에이전트. 어떻게 만들었는지, 어떻게 동작하는지 모두 공개합니다.",
    stack: ["Python", "LangGraph", "LLM", "Automation"],
  },
  {
    type: "Coming Soon",
    title: "OpenClaw Starter Kit",
    desc: "나만의 AI 에이전트를 만들어보고 싶은 분들을 위한 오픈소스 템플릿. 함께 만들어가는 프로젝트입니다.",
    stack: ["Template", "Open Source", "Community"],
  },
];

export default async function Home() {
  const recentPosts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <Nav />

      {/* ── Hero ── */}
      <Hero />

      <div className="max-w-6xl mx-auto px-6 md:px-12 h-px bg-border" />

      {/* ── About ── */}
      <section id="about" className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-40">
        <SectionLabel>About</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          <ScrollReveal delay={1}>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-snug tracking-tight mb-8">
              에이전트와 함께
              <br />
              <span className="font-semibold text-accent">만들고 운영</span>합니다
            </h2>
            <p className="text-text-secondary leading-relaxed text-[0.95rem] font-light">
              새로운 기술이 나오면 일단 만들어봅니다.
              되는지 안 되는지는 직접 해봐야 알 수 있으니까요.
            </p>
            <p className="text-text-secondary leading-relaxed text-[0.95rem] font-light mt-6">
              그 과정에서 배운 것들을 여기에 기록하고 공유합니다.
              이 사이트도 AI 에이전트 OpenClaw와 함께 운영하고 있습니다.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="grid grid-cols-2 gap-8 pt-4">
              {[
                ["Build", "에이전트 & 웹 서비스"],
                ["Ship", "프로토타입에서 제품까지"],
                ["Automate", "반복 작업의 자동화"],
                ["Share", "과정과 결과를 공개"],
              ].map(([keyword, label]) => (
                <div key={keyword} className="pt-6 border-t border-border">
                  <div className="font-display text-4xl text-text-primary tracking-tight">{keyword}</div>
                  <div className="text-[0.75rem] text-text-tertiary tracking-widest mt-2">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 h-px bg-border" />

      {/* ── Expertise ── */}
      <section id="expertise" className="max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-24 md:pb-40">
        <SectionLabel>What I Do</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
          {expertise.map((item, i) => (
            <ScrollReveal key={item.index} delay={i + 1}>
              <div className="bg-bg p-10 relative group transition-colors duration-400 hover:bg-bg-elevated h-full">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                <div className="font-display text-sm text-text-tertiary mb-10">{item.index}</div>
                <h3 className="font-display text-2xl font-normal tracking-tight mb-5 leading-snug whitespace-pre-line">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed font-light">{item.desc}</p>
                <div className="flex flex-wrap gap-2 mt-8">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.7rem] px-3 py-1.5 border border-border text-text-tertiary tracking-wide transition-colors duration-300 group-hover:border-text-tertiary group-hover:text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 h-px bg-border" />

      {/* ── Projects ── */}
      <section id="projects" className="max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-24 md:pb-40">
        <SectionLabel>Works</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i + 1}>
              <div
                className="block bg-bg-card border border-border p-10 relative overflow-hidden transition-all duration-400 hover:border-border-hover hover:-translate-y-1 group h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-dim to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="text-[0.65rem] tracking-[0.15em] uppercase text-accent mb-6 font-medium">
                    {project.type}
                  </div>
                  <h3 className="font-display text-2xl font-normal tracking-tight mb-3">{project.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed font-light">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
                    {project.stack.map((s, j) => (
                      <span key={s} className="text-[0.7rem] text-text-tertiary tracking-wide">
                        {j > 0 && <span className="mr-2">·</span>}
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 h-px bg-border" />

      {/* ── Agent Activity ── */}
      <ActivitySection />

      <div className="max-w-6xl mx-auto px-6 md:px-12 h-px bg-border" />

      {/* ── Blog Preview ── */}
      {recentPosts.length > 0 && (
        <>
          <section className="max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-24 md:pb-40">
            <SectionLabel>Latest from the Lab</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i + 1}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block border border-border p-8 transition-all duration-400 hover:border-border-hover hover:-translate-y-1 group"
                  >
                    <div className="text-[0.65rem] tracking-[0.15em] uppercase text-accent mb-4 font-medium">
                      {post.category}
                    </div>
                    <h3 className="font-display text-xl font-normal tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed font-light line-clamp-3">
                      {post.summary}
                    </p>
                    <div className="mt-6 text-[0.7rem] text-text-tertiary">
                      {post.date} · {post.readingTime}
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={4}>
              <div className="mt-12 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 group"
                >
                  모든 글 보기
                  <ArrowIcon className="w-4 h-4 stroke-text-tertiary group-hover:stroke-accent transition-colors duration-300" />
                </Link>
              </div>
            </ScrollReveal>
          </section>
          <div className="max-w-6xl mx-auto px-6 md:px-12 h-px bg-border" />
        </>
      )}

      {/* ── Contact ── */}
      <section id="contact" className="max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-24 md:pb-40">
        <SectionLabel>Contact</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-end">
          <ScrollReveal delay={1}>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight tracking-tight">
              함께 만들어갈
              <br />
              <span className="font-semibold text-accent">에이전트</span>가
              <br />
              있으신가요?
            </h2>
            <p className="text-text-secondary text-sm font-light leading-relaxed mt-6">
              신기술 탐험, 에이전트 실험, 사이드 프로젝트 — 같이 만들고 싶은 게 있다면 편하게 연락주세요.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <ContactLinks />
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
