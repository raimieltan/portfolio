export function Footer() {
  return (
    <footer className="relative border-t hairline mt-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-mono text-[0.65rem] tracking-widest2 uppercase text-muted">
        <div>© 2026 Sean Raimiel Tan · Built with Next.js &amp; Tailwind</div>
        <div className="flex items-center gap-4">
          <span>lat 10.7202° N</span>
          <span className="text-rust">/</span>
          <span>lng 122.5621° E</span>
        </div>
      </div>
    </footer>
  );
}
