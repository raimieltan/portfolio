import { skillGroups } from "@/lib/data";
import { SectionLabel } from "./SectionLabel";

export function Skills() {
  return (
    <section id="skills" className="relative px-5 sm:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          index="04 — Skills"
          title="The kit"
          kicker="What I reach for first in production"
        />

        <div className="grid grid-cols-12 gap-x-8 gap-y-10 sm:gap-y-14">
          {skillGroups.map((g, idx) => (
            <div
              key={g.heading}
              className="col-span-12 sm:col-span-6 lg:col-span-4"
            >
              <div className="flex items-baseline gap-4 mb-5 pb-3 border-b hairline">
                <span className="font-mono text-[0.65rem] tracking-widest2 text-rust">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl sm:text-2xl italic tracking-tightest">
                  {g.heading}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="font-mono text-[0.7rem] tracking-widest2 uppercase text-paper-dim border hairline px-2.5 py-1 hover:border-signal hover:text-signal transition-colors"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
