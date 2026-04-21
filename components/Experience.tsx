import { experience } from "@/lib/data";
import { SectionLabel } from "./SectionLabel";

export function Experience() {
  return (
    <section id="experience" className="relative px-5 sm:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          index="02 — Experience"
          title="The ledger"
          kicker="6 years across SaaS, mobile, AI, healthcare, education"
        />

        <ol className="divide-y hairline border-y hairline">
          {experience.map((role, i) => (
            <li
              key={`${role.company}-${i}`}
              className="grid grid-cols-12 gap-6 py-8 sm:py-10 group"
            >
              <div className="col-span-12 md:col-span-3 flex md:flex-col items-start justify-between md:justify-start gap-3">
                <div className="font-mono text-[0.7rem] tracking-widest2 uppercase text-rust">
                  {role.period}
                </div>
                {role.present ? (
                  <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest2 uppercase text-signal">
                    <span className="h-[6px] w-[6px] rounded-full bg-signal animate-pulseDot" />
                    Live
                  </span>
                ) : null}
              </div>

              <div className="col-span-12 md:col-span-9">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-6">
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl leading-[1.05] tracking-tightest">
                    <span className="italic">{role.title}</span>
                  </h3>
                  <span className="font-mono text-xs sm:text-sm tracking-widest2 uppercase text-paper-dim md:text-right">
                    {role.company}
                  </span>
                </div>

                <ul className="mt-5 space-y-3 text-paper-dim text-[0.98rem] sm:text-base leading-relaxed">
                  {role.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-4">
                      <span className="font-mono text-rust mt-[0.35em] text-xs">
                        ◆
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {role.tags?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {role.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[0.65rem] tracking-widest2 uppercase text-paper-dim border hairline px-2.5 py-1 hover:border-signal hover:text-signal transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
