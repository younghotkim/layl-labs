import ScrollReveal from "./ScrollReveal";

export default function SectionLabel({ children }: { children: string }) {
  return (
    <ScrollReveal>
      <div className="flex items-center gap-4 mb-12 text-[0.7rem] font-medium tracking-[0.15em] uppercase text-text-tertiary">
        <span className="block w-8 h-px bg-text-tertiary" />
        {children}
      </div>
    </ScrollReveal>
  );
}
