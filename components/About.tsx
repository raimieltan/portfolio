import { profile, stats } from "@/lib/data";
import { SectionLabel } from "./SectionLabel";

export function About() {
  return (
    <section id="about" className="relative px-5 sm:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          index="01 — About"
          title="The pitch"
          kicker="Based in Iloilo, PH · Remote across time zones"
        />

        <div className="grid grid-cols-12 gap-8 lg:gap-14">
          <div className="col-span-12 lg:col-span-7 space-y-6 text-[1.05rem] sm:text-lg text-paper-dim leading-relaxed">
            <p className="text-paper">
              I&apos;m a senior full-stack engineer who lives on the backend,
              ships the frontend, and treats production like a craft.
            </p>
            <p>{profile.summary}</p>
            <p>
              I&apos;m calm under latency, stubborn about schemas, and allergic
              to undocumented APIs. I like work that matters: multi-tenant SaaS
              with real users, AI systems that do real work, and ride-hailing
              platforms that people actually hail rides on.
            </p>
            <p className="font-mono text-sm text-muted pt-4 border-t hairline">
              EDU &nbsp;·&nbsp; BS Software Engineering, Central Philippine
              University (Dean&apos;s Lister, 2018–2023). Regional Science High
              School, graduated with High Honors.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="grid grid-cols-2 gap-5 sm:gap-6">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="border hairline p-5 sm:p-6 bg-ink-soft relative overflow-hidden"
                >
                  <span className="absolute top-2 right-3 font-mono text-[0.6rem] tracking-widest2 text-rust">
                    0{i + 1}
                  </span>
                  <div className="font-display text-5xl sm:text-6xl leading-none text-signal">
                    {s.value}
                  </div>
                  <div className="mt-3 font-mono text-[0.68rem] tracking-widest2 uppercase text-paper-dim leading-relaxed">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
