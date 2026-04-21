const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-ink/70 border-b hairline">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#top"
          className="flex items-baseline gap-2 font-mono text-xs tracking-widest2 uppercase text-paper"
        >
          <span className="h-[7px] w-[7px] rounded-full bg-signal animate-pulseDot" />
          <span className="hidden sm:inline">SRT</span>
          <span className="text-muted hidden sm:inline">/ 2026</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[0.72rem] tracking-widest2 uppercase text-paper-dim hover:text-signal transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="font-mono text-[0.72rem] tracking-widest2 uppercase text-ink bg-signal px-3 py-2 hover:bg-paper transition-colors"
        >
          Hire me →
        </a>
      </div>
    </header>
  );
}
