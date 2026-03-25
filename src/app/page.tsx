import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import ArrowIcon from "@/components/ArrowIcon";
import ActivitySection from "@/components/ActivitySection";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

const expertise = [
  {
    index: "01",
    title: "AI Agent\nArchitecture",
    desc: "LLM 기반 자율 에이전트 시스템을 설계하고, 복잡한 워크플로우를 오케스트레이션하는 아키텍처를 구축합니다.",
    tags: ["LLM", "RAG", "Multi-Agent", "Tool Use", "Orchestration"],
  },
  {
    index: "02",
    title: "Full-Stack\nDevelopment",
    desc: "프론트엔드부터 백엔드, 인프라까지 전 영역을 아우르는 개발 역량으로 완결된 제품을 만들어냅니다.",
    tags: ["React", "Next.js", "Node.js", "Python", "Cloud"],
  },
  {
    index: "03",
    title: "Product\nEngineering",
    desc: "기술적 가능성과 사용자 니즈 사이에서 최적의 균형점을 찾아 임팩트 있는 제품을 설계합니다.",
    tags: ["UX", "Prototyping", "Analytics", "Growth", "Strategy"],
  },
];

const projects = [
  {
    type: "AI Agent Platform",
    title: "Autonomous Agent Framework",
    desc: "복잡한 비즈니스 워크플로우를 자동화하는 멀티 에이전트 오케스트레이션 프레임워크",
    stack: ["Python", "LangGraph", "FastAPI", "Redis"],
  },
  {
    type: "Developer Tool",
    title: "AI-Powered Code Assistant",
    desc: "코드베이스를 이해하고 컨텍스트 기반 코드 리뷰와 리팩토링을 제안하는 개발자 도구",
    stack: ["TypeScript", "React", "RAG", "Vector DB"],
  },
  {
    type: "SaaS Product",
    title: "Intelligent Workflow Engine",
    desc: "AI 에이전트가 사용자의 반복 작업을 학습하고 자동화하는 워크플로우 엔진",
    stack: ["Next.js", "Python", "PostgreSQL", "LLM"],
  },
  {
    type: "Data Platform",
    title: "Real-time Analytics Dashboard",
    desc: "에이전트 시스템의 성능과 행동을 실시간으로 모니터링하고 분석하는 대시보드",
    stack: ["React", "D3.js", "WebSocket", "ClickHouse"],
  },
];

const contacts = [
  { label: "hello@example.com", href: "mailto:hello@example.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X (Twitter)", href: "https://twitter.com" },
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
              기술과 <span className="font-semibold text-accent">제품</span> 사이에서
              <br />
              가치를 만듭니다
            </h2>
            <p className="text-text-secondary leading-relaxed text-[0.95rem] font-light">
              풀스택 개발자로서의 기술적 깊이와 프로덕트 엔지니어로서의 사용자 중심 사고를 결합하여, AI
              에이전트 시스템을 설계하고 구축합니다.
            </p>
            <p className="text-text-secondary leading-relaxed text-[0.95rem] font-light mt-6">
              단순한 기술 구현을 넘어, 실제 문제를 해결하는 지능형 소프트웨어 제품을 만드는 것에
              집중합니다. LLM 기반 에이전트 아키텍처부터 사용자가 만나는 인터페이스까지, 엔드투엔드로
              사고하고 실행합니다.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="grid grid-cols-2 gap-8 pt-4">
              {[
                ["Agent", "Architecture"],
                ["Full", "Stack Development"],
                ["Product", "Engineering"],
                ["E2E", "Thinking & Execution"],
              ].map(([number, label]) => (
                <div key={label} className="pt-6 border-t border-border">
                  <div className="font-display text-4xl text-text-primary tracking-tight">{number}</div>
                  <div className="text-[0.75rem] text-text-tertiary uppercase tracking-widest mt-2">
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
        <SectionLabel>Expertise</SectionLabel>
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
        <SectionLabel>Selected Work</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i + 1}>
              <a
                href="#"
                className="block bg-bg-card border border-border p-10 relative overflow-hidden transition-all duration-400 hover:border-border-hover hover:-translate-y-1 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-dim to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                <div className="absolute top-10 right-10 w-6 h-6 opacity-0 -translate-x-2 translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
                  <ArrowIcon className="w-full h-full stroke-accent" />
                </div>
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
              </a>
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
              <span className="font-semibold text-accent">다음 프로젝트</span>가
              <br />
              있으신가요?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="flex flex-col">
              {contacts.map((contact, i) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={contact.href.startsWith("mailto") ? undefined : "noopener"}
                  className={`flex justify-between items-center py-5 border-b border-border text-text-secondary text-[0.9rem] font-light transition-all duration-300 hover:text-text-primary hover:pl-4 group ${
                    i === 0 ? "border-t" : ""
                  }`}
                >
                  <span>{contact.label}</span>
                  <ArrowIcon className="w-4 h-4 stroke-text-tertiary transition-all duration-300 group-hover:stroke-accent group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
