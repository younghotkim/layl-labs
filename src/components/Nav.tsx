"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = [
    { href: "/#about", label: "About" },
    { href: "/#expertise", label: "Expertise" },
    { href: "/#projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-6 py-5 md:px-12 transition-colors duration-400 backdrop-blur-xl ${
        scrolled
          ? "border-b border-border bg-bg/80"
          : "border-b border-transparent bg-bg/80"
      }`}
    >
      <Link href="/" className="font-display text-xl text-text-primary tracking-tight">
        Layl Labs.
      </Link>

      {/* Mobile toggle */}
      <button
        className="flex flex-col gap-[5px] md:hidden p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span className="block w-5 h-px bg-text-primary" />
        <span className="block w-5 h-px bg-text-primary" />
      </button>

      {/* Links */}
      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row absolute md:static top-full left-0 right-0 md:top-auto gap-5 md:gap-10 bg-bg/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none p-6 md:p-0 border-b border-border md:border-none list-none`}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-text-secondary text-xs font-normal uppercase tracking-widest hover:text-text-primary transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-400 group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
