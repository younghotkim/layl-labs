import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "AI, 에이전트, 그리고 프로덕트 엔지니어링에 관한 생각들",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Nav />

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-36 pb-24 md:pb-40">
        <ScrollReveal>
          <p className="text-xs font-normal tracking-[0.2em] uppercase text-accent mb-4">
            Layl Labs
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-tight tracking-tight mb-4">
            Blog
          </h1>
          <p className="text-text-secondary font-light text-lg max-w-lg">
            AI, 에이전트 아키텍처, 그리고 프로덕트 엔지니어링에 관한 생각과 실험을 기록합니다.
          </p>
        </ScrollReveal>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 h-px bg-border" />

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24">
        {posts.length === 0 ? (
          <ScrollReveal>
            <p className="text-text-tertiary text-center py-20">
              아직 작성된 글이 없습니다. 곧 첫 번째 글을 발행합니다.
            </p>
          </ScrollReveal>
        ) : (
          <div className="flex flex-col">
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={Math.min(i + 1, 4)}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={`group flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-8 border-b border-border transition-all duration-300 hover:pl-4 ${
                    i === 0 ? "border-t" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 md:w-48 shrink-0">
                    <span className="text-[0.65rem] tracking-[0.15em] uppercase text-accent font-medium">
                      {post.category}
                    </span>
                    <span className="text-[0.7rem] text-text-tertiary">{post.date}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-xl font-normal tracking-tight group-hover:text-accent transition-colors duration-300 mb-1">
                      {post.title}
                    </h2>
                    <p className="text-text-secondary text-sm font-light line-clamp-2">
                      {post.summary}
                    </p>
                  </div>
                  <span className="text-[0.7rem] text-text-tertiary shrink-0">
                    {post.readingTime}
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
