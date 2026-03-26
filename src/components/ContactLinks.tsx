"use client";

import { useState } from "react";
import ArrowIcon from "./ArrowIcon";

type LinkContact = {
  kind: "link";
  label: string;
  value: string;
  href: string;
};

type CopyContact = {
  kind: "copy";
  label: string;
  value: string;
};

type Contact = LinkContact | CopyContact;

const contacts: Contact[] = [
  {
    kind: "link",
    label: "Email",
    value: "layl.yh.kim@gmail.com",
    href: "mailto:layl.yh.kim@gmail.com",
  },
  {
    kind: "link",
    label: "GitHub",
    value: "github.com/younghotkim",
    href: "https://github.com/younghotkim",
  },
  {
    kind: "link",
    label: "Instagram",
    value: "@idontcodeijustvibe",
    href: "https://instagram.com/idontcodeijustvibe",
  },
  {
    kind: "copy",
    label: "Discord",
    value: "young4121",
  },
];

function ContactIcon({ label }: { label: string }) {
  const className = "w-5 h-5 stroke-current";

  switch (label) {
    case "Email":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={className} aria-hidden="true">
          <path d="M3.75 6.75h16.5v10.5H3.75z" />
          <path d="m4.5 7.5 7.5 6 7.5-6" />
        </svg>
      );
    case "GitHub":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={className} aria-hidden="true">
          <path d="M9 18c-4 1.2-4-2-6-2" />
          <path d="M15 18v-3.1c0-1 .1-1.4-.5-2 2.1-.2 4.5-1 4.5-4.5A3.5 3.5 0 0 0 18 6c.1-.6 0-1.3-.3-2-1.1 0-1.9.7-2.4 1A8.3 8.3 0 0 0 12 4.5 8.3 8.3 0 0 0 8.7 5c-.5-.3-1.3-1-2.4-1-.3.7-.4 1.4-.3 2a3.5 3.5 0 0 0-1 2.4c0 3.5 2.4 4.3 4.5 4.5-.6.6-.6 1-.5 2V18" />
          <path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={className} aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="17.3" cy="6.7" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "Discord":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={className} aria-hidden="true">
          <path d="M8.5 8.5c1.6-.8 5.4-.8 7 0" />
          <path d="M8 16.5c1.5.8 6.5.8 8 0" />
          <path d="M7 8.5c-1.2 1.8-1.8 4-1.8 6.2 1.5 1.1 3 1.8 4.7 2.3l1-1.6" />
          <path d="M17 8.5c1.2 1.8 1.8 4 1.8 6.2-1.5 1.1-3 1.8-4.7 2.3l-1-1.6" />
          <circle cx="9.5" cy="12.4" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="12.4" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ContactLinks() {
  const [copied, setCopied] = useState<string | null>(null);

  async function handleCopy(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied((current) => (current === value ? null : current)), 1600);
  }

  return (
    <div className="flex flex-col">
      {contacts.map((contact, i) => {
        const baseClassName =
          `flex justify-between items-center gap-4 py-5 border-b border-border text-text-secondary text-[0.9rem] font-light transition-all duration-300 group ${
            i === 0 ? "border-t" : ""
          }`;

        if (contact.kind === "copy") {
          const isCopied = copied === contact.value;
          return (
            <button
              key={contact.label}
              type="button"
              onClick={() => void handleCopy(contact.value)}
              className={`${baseClassName} text-left hover:text-text-primary hover:pl-4`}
            >
              <span className="flex items-center gap-4 min-w-0">
                <span className="text-text-tertiary group-hover:text-accent transition-colors duration-300">
                  <ContactIcon label={contact.label} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.65rem] tracking-[0.15em] uppercase text-text-tertiary mb-1">
                    {contact.label}
                  </span>
                  <span className="block text-text-primary truncate">{contact.value}</span>
                </span>
              </span>
              <span className="text-[0.7rem] tracking-wide text-text-tertiary">
                {isCopied ? "Copied" : "Copy ID"}
              </span>
            </button>
          );
        }

        return (
          <a
            key={contact.label}
            href={contact.href}
            target={contact.href.startsWith("mailto") ? undefined : "_blank"}
            rel={contact.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className={`${baseClassName} hover:text-text-primary hover:pl-4`}
          >
            <span className="flex items-center gap-4 min-w-0">
              <span className="text-text-tertiary group-hover:text-accent transition-colors duration-300">
                <ContactIcon label={contact.label} />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.65rem] tracking-[0.15em] uppercase text-text-tertiary mb-1">
                  {contact.label}
                </span>
                <span className="block text-text-primary truncate">{contact.value}</span>
              </span>
            </span>
            <ArrowIcon className="w-4 h-4 stroke-text-tertiary transition-all duration-300 group-hover:stroke-accent group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
          </a>
        );
      })}
    </div>
  );
}
