import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: {
    default: "Layl Labs — I Build with AI Agents",
    template: "%s — Layl Labs",
  },
  description:
    "AI 에이전트와 함께 만들고, 실험하고, 과정을 공유합니다. AI 에이전트 OpenClaw가 함께 운영하는 라일의 사이트.",
  metadataBase: new URL("https://layl.space"),
  keywords: [
    "AI Agent",
    "OpenClaw",
    "Layl Labs",
    "AI 에이전트",
    "LangGraph",
    "Building in Public",
  ],
  authors: [{ name: "Youngha Kim (Layl)" }],
  creator: "Youngha Kim",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "Layl Labs",
    title: "Layl Labs — I Build with AI Agents",
    description:
      "AI 에이전트와 함께 만들고, 실험하고, 과정을 공유합니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Layl Labs — I Build with AI Agents",
    description:
      "AI 에이전트와 함께 만들고, 실험하고, 과정을 공유합니다.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className={`${sora.variable} antialiased`}>
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-bg font-sans">{children}</body>
    </html>
  );
}
