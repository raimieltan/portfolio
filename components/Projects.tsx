import { projects } from "@/lib/data";
import { SectionLabel } from "./SectionLabel";

export function Projects() {
  const features = projects.filter((p) => p.feature);
  const rest = projects.filter((p) => !p.feature);

  return (
    <section id="projects" className="relative px-5 sm:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          index="03 — Projects"
          title="Selected work"
          kicker="Feature pieces followed by additional production work"
        />

        {/* Feature projects — large editorial cards */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {features.map((p, i) => (
            <article
              key={p.title}
              className={`col-span-12 ${
                i === 0 ? "lg:col-span-7" : "lg:col-span-5"
              } relative border hairline bg-ink-soft p-6 sm:p-8 md:p-10 flex flex-col min-h-[340px] overflow-hidden group`}
            >
              <span className="absolute top-4 right-5 font-mono text-[0.65rem] tracking-widest2 text-rust">
                {String(i + 1).padStart(2, "0")} / FEATURE
              </span>

              <div className="font-mono text-[0.68rem] tracking-widest2 uppercase text-muted">
                {p.role}
              </div>

              <h3 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl leading-[1.02] tracking-tightest">
                <span className="italic">{p.title}</span>
              </h3>

              <p className="mt-5 text-paper-dim leading-relaxed max-w-2xl">
                {p.summary}
              </p>

              {p.highlights ? (
                <ul className="mt-6 space-y-2 text-sm text-paper-dim">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="font-mono text-signal text-xs mt-[0.3em]">
                        +
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-auto pt-7 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[0.65rem] tracking-widest2 uppercase text-paper-dim border hairline px-2.5 py-1"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {p.link ? (
                <a
                  href={p.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-widest2 uppercase text-paper-dim hover:text-signal transition-colors self-start"
                >
                  {p.link.label}
                  <span aria-hidden>↗</span>
                </a>
              ) : null}

              {/* subtle corner flourish */}
              <span
                aria-hidden
                className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                style={{
                  background:
                    "radial-gradient(closest-side, var(--signal) 0%, transparent 70%)",
                }}
              />
            </article>
          ))}
        </div>

        {/* Rest — compact ledger grid */}
        <div className="mt-6 sm:mt-8 grid grid-cols-12 gap-6 sm:gap-8">
          {rest.map((p, i) => (
            <article
              key={p.title}
              className="col-span-12 sm:col-span-6 lg:col-span-4 border hairline bg-ink-soft p-6 sm:p-7 flex flex-col min-h-[240px] relative"
            >
              <span className="absolute top-4 right-5 font-mono text-[0.6rem] tracking-widest2 text-rust">
                {String(features.length + i + 1).padStart(2, "0")}
              </span>

              <div className="font-mono text-[0.65rem] tracking-widest2 uppercase text-muted">
                {p.role}
              </div>

              <h3 className="mt-3 font-display text-2xl sm:text-[1.7rem] leading-[1.05] tracking-tightest">
                <span className="italic">{p.title}</span>
              </h3>

              <p className="mt-4 text-sm text-paper-dim leading-relaxed">
                {p.summary}
              </p>

              <div className="mt-auto pt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[0.6rem] tracking-widest2 uppercase text-paper-dim border hairline px-2 py-0.5"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {p.link ? (
                <a
                  href={p.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest2 uppercase text-paper-dim hover:text-signal transition-colors self-start"
                >
                  {p.link.label}
                  <span aria-hidden>↗</span>
                </a>
              ) : null}
            </article>
          ))}
        </div>

        <p className="mt-10 font-mono text-[0.7rem] tracking-widest2 uppercase text-muted">
          More on GitHub →{" "}
          <a
            href="https://github.com/raimieltan"
            target="_blank"
            rel="noreferrer"
            className="underline-brackets text-paper-dim hover:text-signal"
          >
            github.com/raimieltan
          </a>
        </p>
      </div>
    </section>
  );
}
