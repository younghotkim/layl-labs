import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ArrowIcon from "@/components/ArrowIcon";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Comments from "@/components/Comments";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />

      <article className="max-w-3xl mx-auto px-6 md:px-12 pt-36 pb-24 md:pb-40">
        <ScrollReveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary transition-colors duration-300 mb-12 group"
          >
            <ArrowIcon className="w-4 h-4 stroke-text-tertiary rotate-[225deg] group-hover:stroke-accent transition-colors duration-300" />
            모든 글
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[0.65rem] tracking-[0.15em] uppercase text-accent font-medium">
                {post.category}
              </span>
              <span className="text-[0.7rem] text-text-tertiary">{post.date}</span>
              <span className="text-[0.7rem] text-text-tertiary">{post.readingTime}</span>
            </div>
            <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-snug tracking-tight mb-6">
              {post.title}
            </h1>
            {post.summary && (
              <p className="text-lg text-text-secondary font-light leading-relaxed">
                {post.summary}
              </p>
            )}
          </header>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <div className="prose max-w-none">
            <MDXRemote source={post.content} />
          </div>
        </ScrollReveal>

        <Comments postSlug={post.slug} />

        <ScrollReveal delay={1}>
          <div className="mt-16 pt-8 border-t border-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 group"
            >
              <ArrowIcon className="w-4 h-4 stroke-text-tertiary rotate-[225deg] group-hover:stroke-accent transition-colors duration-300" />
              모든 글로 돌아가기
            </Link>
          </div>
        </ScrollReveal>
      </article>

      <Footer />
    </>
  );
}
