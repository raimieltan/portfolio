import { profile } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] px-5 sm:px-8 pt-28 sm:pt-32 pb-10 flex flex-col"
    >
      {/* Decorative orbital */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-20%] top-[-10%] h-[70vh] w-[70vh] rounded-full blur-3xl opacity-[0.18]"
        style={{
          background:
            "radial-gradient(closest-side, var(--signal) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] bottom-[10%] h-[40vh] w-[40vh] rounded-full blur-3xl opacity-[0.12]"
        style={{
          background:
            "radial-gradient(closest-side, var(--rust) 0%, transparent 70%)",
        }}
      />

      {/* Top strip */}
      <div
        className="reveal flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-mono text-[0.7rem] tracking-widest2 uppercase text-muted"
        style={{ ["--i" as string]: 0 }}
      >
        <div className="flex items-center gap-3">
          <span className="inline-block h-[7px] w-[7px] rounded-full bg-signal animate-pulseDot" />
          <span className="text-paper-dim">{profile.status}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Iloilo, Philippines</span>
          <span className="text-rust">/</span>
          <span>GMT+8</span>
        </div>
      </div>

      {/* Main headline */}
      <div className="mt-14 sm:mt-20 md:mt-24 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-10">
          <p
            className="reveal font-mono text-xs sm:text-sm tracking-widest2 uppercase text-rust mb-5"
            style={{ ["--i" as string]: 1 }}
          >
            Sean Raimiel Tan — Senior Full-Stack Engineer
          </p>

          <h1
            className="reveal font-display text-[13vw] sm:text-[10vw] md:text-[8.2vw] leading-[0.92] tracking-tightest"
            style={{ ["--i" as string]: 2 }}
          >
            Backends that{" "}
            <span className="italic text-signal">don&apos;t flinch</span>,
            <br />
            <span className="text-paper-dim">products that</span>{" "}
            <span className="italic">ship.</span>
          </h1>

          <p
            className="reveal mt-8 sm:mt-10 max-w-2xl text-base sm:text-lg text-paper-dim leading-relaxed"
            style={{ ["--i" as string]: 3 }}
          >
            Six years designing and shipping cloud-native services, multi-tenant
            SaaS platforms, and AI-integrated products — from a 4.3★ ride-hailing
            app on both stores to production RAG on Azure. I lead teams, own the
            stack, and hold the quality line.
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div
        className="reveal mt-10 sm:mt-14 flex flex-wrap items-center gap-4"
        style={{ ["--i" as string]: 4 }}
      >
        <a
          href="#projects"
          className="group inline-flex items-center gap-3 bg-signal text-ink px-5 sm:px-6 py-3.5 font-mono text-xs sm:text-sm tracking-widest2 uppercase hover:bg-paper transition-colors"
        >
          View selected work
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
        <a
          href={profile.resumeHref}
          download
          className="group inline-flex items-center gap-3 border hairline text-paper px-5 sm:px-6 py-3.5 font-mono text-xs sm:text-sm tracking-widest2 uppercase hover:border-signal hover:text-signal transition-colors"
        >
          Download resume
          <span className="transition-transform group-hover:translate-y-0.5">
            ↓
          </span>
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[0.72rem] tracking-widest2 uppercase text-paper-dim hover:text-signal transition-colors"
        >
          github.com/raimieltan ↗
        </a>
      </div>

      {/* Bottom corner annotation */}
      <div
        className="reveal mt-auto pt-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 font-mono text-[0.68rem] tracking-widest2 uppercase text-muted"
        style={{ ["--i" as string]: 5 }}
      >
        <div>
          <div className="text-paper-dim">Currently</div>
          <div className="mt-1">K-12 SaaS · Property-Mgmt SaaS</div>
        </div>
        <div className="text-right sm:text-right">
          <div className="text-paper-dim">Index</div>
          <div className="mt-1">01 about · 02 experience · 03 projects</div>
        </div>
      </div>
    </section>
  );
}
