import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Building an offline-first maritime calculator (and picking Tauri over Electron)",
  description:
    "Notes from Draft Survey — a Next.js 16 + TypeScript tool that computes bulk-carrier cargo from draft readings, hydrostatic tables, and trim corrections. A zero-dependency calculation engine, an offline-only posture, and why I chose Tauri over Electron.",
  alternates: { canonical: "/writing/draft-survey-offline-first" },
  openGraph: {
    type: "article",
    url: "/writing/draft-survey-offline-first",
    title: "Building an offline-first maritime calculator (and picking Tauri over Electron)",
    description:
      "A zero-dependency calculation engine, a deck-usable UI, and why Tauri beat Electron for a single-purpose desktop tool.",
    publishedTime: "2026-04-22T00:00:00.000Z",
    authors: ["Sean Raimiel Tan"],
    tags: [
      "Next.js",
      "TypeScript",
      "Tauri",
      "Offline-First",
      "Domain Engineering",
      "Desktop",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Building an offline-first maritime calculator (and picking Tauri over Electron)",
    description:
      "A zero-dependency calculation engine, a deck-usable UI, and why Tauri beat Electron for a single-purpose desktop tool.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline:
    "Building an offline-first maritime calculator (and picking Tauri over Electron)",
  description:
    "Notes from Draft Survey — an offline-first calculation tool for bulk-carrier draft surveys. Calculation architecture, UI choices for deck use, and the Tauri-over-Electron decision.",
  author: {
    "@type": "Person",
    name: "Sean Raimiel Tan",
    url: "https://raimiel.xyz",
  },
  datePublished: "2026-04-22",
  keywords:
    "Next.js, TypeScript, Tauri, Offline-First, Domain Engineering, Maritime, Draft Survey, Desktop Apps",
};

export default function DraftSurveyCaseStudy() {
  return (
    <>
      <Nav />
      <main id="content" className="pt-28 pb-24">
        <article className="mx-auto max-w-3xl px-5 sm:px-8">
          {/* Header */}
          <header className="mb-14">
            <Link
              href="/writing"
              className="font-mono text-[0.65rem] tracking-widest2 uppercase text-paper-dim hover:text-signal transition-colors"
            >
              ← Writing
            </Link>

            <div className="mt-8 flex items-center gap-4 font-mono text-[0.65rem] tracking-widest2 uppercase text-rust">
              <span>Case Study</span>
              <span className="text-muted">/</span>
              <time dateTime="2026-04-22" className="text-muted">
                April 2026
              </time>
              <span className="text-muted">/</span>
              <span className="text-muted">7 min read</span>
            </div>

            <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-[3.5rem] leading-[1.02] tracking-tightest">
              Building an offline-first maritime calculator{" "}
              <span className="italic">
                (and picking Tauri over Electron)
              </span>
            </h1>

            <p className="mt-7 text-[1.1rem] sm:text-lg text-paper-dim leading-relaxed">
              Notes from Draft Survey — a Next.js 16 + TypeScript tool that
              computes bulk-carrier cargo from draft readings, hydrostatic
              tables, and trim corrections. A zero-dependency calculation
              engine, an offline-only posture, and the distribution choice
              that made it all portable.
            </p>
          </header>

          {/* Body */}
          <div className="prose-custom space-y-10 text-[1.02rem] sm:text-[1.05rem] text-paper-dim leading-[1.75]">
            <Section heading="The problem" index="01">
              <p>
                A draft survey is how ships&apos; officers and marine
                surveyors verify how much bulk cargo actually made it onto a
                vessel. They read the ship&apos;s draft — the depth below the
                waterline — at six points on the hull before and after
                loading, then back out the cargo weight from the
                displacement change, after applying corrections for trim,
                water density, and onboard consumables. Get it wrong and the
                charter party, the shipper, and the receiver all have a
                reason to argue.
              </p>
              <p>
                The existing tooling is Excel. Every chief officer carries
                their own spreadsheet, their own hydrostatic tables pasted
                into a tab, and their own accumulated superstitions about
                cell references. It works. It is also fragile: one broken
                formula on a rolling ship at 2am produces a number that
                sounds plausible and isn&apos;t.
              </p>
              <p>Draft Survey is an attempt to replace that spreadsheet with a focused tool. The constraints:</p>
              <BulletList>
                <li>
                  <strong className="text-paper">Works offline.</strong> Deck
                  operations happen in ports with spotty connectivity and on
                  ships where IT connectivity is not a guarantee. No
                  accounts, no sync, no cloud dependency.
                </li>
                <li>
                  <strong className="text-paper">
                    Transparent calculations.
                  </strong>{" "}
                  Every correction has to be inspectable. An officer needs to
                  trust the number, and auditors need to reconstruct it.
                </li>
                <li>
                  <strong className="text-paper">
                    Deck-usable UI.
                  </strong>{" "}
                  Large inputs, high-contrast dark mode for sunlight or night
                  bridge, a decimal keypad on touch devices, input ranges
                  validated against the hydrostatic table.
                </li>
                <li>
                  <strong className="text-paper">
                    Portable data.
                  </strong>{" "}
                  One vessel&apos;s data should move with the officer between
                  vessels, ports, and machines without ceremony.
                </li>
              </BulletList>
            </Section>

            <Section heading="Why the calculation engine is a zero-dependency TypeScript module" index="02">
              <p>
                The entire calculation lives in{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  src/lib/hydro.ts
                </code>
                . No math library, no physics package, no external hydrostatic
                service. Two reasons:
              </p>
              <BulletList>
                <li>
                  <strong className="text-paper">Auditability.</strong> The
                  functions are pure, the inputs are typed, and a reviewer
                  can read the whole pipeline in one sitting. A dependency
                  would add a surface I have to vouch for every time someone
                  asks why the cargo figure is what it is.
                </li>
                <li>
                  <strong className="text-paper">Portability.</strong> Pure
                  TypeScript moves anywhere — the Next.js app today, a Tauri
                  desktop binary tomorrow, a Node CLI for batch verification
                  if someone needs it. No dependency re-evaluation step when
                  the runtime changes.
                </li>
              </BulletList>
              <p>
                The module exposes two things: an{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  interpHydro(draft)
                </code>{" "}
                function that linearly interpolates between hydrostatic table
                rows for a given draft, and a{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  calculateSurvey(input)
                </code>{" "}
                function that takes draft readings, water density, ship
                dimensions, and mark offsets, then runs the five-stage
                correction pipeline.
              </p>
              <p>
                The interpolator is deliberately simple. Out-of-range drafts
                clamp to boundary values instead of extrapolating. Hydrostatic
                tables are published by naval architects for a specific
                loading range; extrapolating past them is a way to get a
                confident wrong answer. Clamping surfaces that the reading is
                outside the trusted range and lets the UI flag it.
              </p>
            </Section>

            <Section heading="The five-stage correction pipeline" index="03">
              <p>
                The{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  calculateSurvey
                </code>{" "}
                function is a series of named corrections applied in order.
                Each stage takes the running state and returns a modified
                one. The stages:
              </p>

              <SubHeading>Mark correction</SubHeading>
              <p>
                The ship&apos;s draft marks aren&apos;t at the perpendiculars
                — they&apos;re wherever the shipyard could paint them,
                typically offset a few meters from the forward and aft
                perpendiculars. The first correction takes the apparent trim
                and the mark offsets and produces corrected drafts at the
                actual perpendiculars.
              </p>

              <SubHeading>First trim correction</SubHeading>
              <p>
                Once the mean draft is established, the hydrostatic table
                gives displacement, TPC (tonnes-per-centimeter), LCF
                (longitudinal center of flotation), and MCTC
                (moment-to-change-trim-one-centimeter). The first trim
                correction accounts for LCF: the flotation center isn&apos;t
                at midships, so trim shifts displacement even at constant
                mean draft. The formula in the engine:{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  firstTrimCorrection = (trim * lcf * 100 * tpc) / lbp
                </code>
                .
              </p>

              <SubHeading>Nemoto second trim correction</SubHeading>
              <p>
                Trim also affects MCTC itself nonlinearly. The second
                correction is Nemoto&apos;s method — sample MCTC at ±0.5m
                around the quarter-mean draft, take the difference, and
                apply. This is the correction that mostly matters when the
                ship is heavily trimmed, and the one most field spreadsheets
                either get wrong or skip.
              </p>

              <SubHeading>Density correction</SubHeading>
              <p>
                Hydrostatic tables assume a reference water density (1.025
                t/m³, salt water). Actual port water is anywhere between
                brackish fresh water and that. A multiplicative correction
                scales the displacement by the ratio.
              </p>

              <SubHeading>Net cargo</SubHeading>
              <p>
                Finally, subtract everything that isn&apos;t cargo — fuel
                oil, diesel oil, fresh water, ballast, the ship&apos;s own
                constants, and the light-ship weight. What&apos;s left is
                what the cargo holds contain.
              </p>

              <p>
                Presenting the pipeline as discrete named stages instead of
                one large expression is the single most important thing the
                engine does. Every intermediate number is available, which
                means the UI can show the full calculation sheet and an
                auditor can check any line.
              </p>
            </Section>

            <Section heading="Offline-first, and the Tauri decision" index="04">
              <p>
                The roadmap is to ship this as a desktop app — Windows,
                macOS, Linux. Two realistic choices: Electron or Tauri. The
                tradeoffs matter, so they&apos;re worth naming.
              </p>
              <BulletList>
                <li>
                  <strong className="text-paper">Electron</strong> bundles
                  Chromium with the app. 100+ MB binaries. Memory footprint
                  in the hundreds of megabytes even at idle. The ecosystem
                  is enormous and the path from &quot;Next.js app&quot; to
                  &quot;distributable binary&quot; is well-worn.
                </li>
                <li>
                  <strong className="text-paper">Tauri</strong> uses the
                  system webview and a Rust backend. Binaries measured in
                  the single-digit megabytes, startup noticeably faster,
                  battery life respected. Native SQLite integration. The
                  ecosystem is smaller.
                </li>
              </BulletList>
              <p>
                For a single-purpose tool that an officer runs on a ship&apos;s
                laptop — possibly an older one, possibly with thermal
                limits, definitely not plugged in — binary size, memory,
                and battery matter more than ecosystem breadth. The
                calculation engine is pure TypeScript and moves across
                either backend unchanged. The only Tauri-specific piece is
                the SQLite adapter for vessel and voyage storage, which is
                a known-solved problem.
              </p>
              <p>
                The portable data story falls out naturally. One vessel&apos;s
                database is a single{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  .db
                </code>{" "}
                file in the app-data directory. Backup is{" "}
                <em>copy the file</em>. Moving to a new machine is{" "}
                <em>copy the file</em>. This is the kind of story a chief
                officer can follow without calling IT.
              </p>
            </Section>

            <Section heading="Design decisions in the UI" index="05">
              <SubHeading>Ship-centric data model</SubHeading>
              <p>
                The primary record isn&apos;t the survey — it&apos;s the
                ship. A ship owns its hydrostatic table, its draft-mark
                offsets (which differ between Initial, Interim, and Final
                surveys because marks can be repainted or obstructed), its
                light-ship weight, and its constants. A voyage attaches to
                a ship. A survey attaches to a voyage. The hierarchy
                reflects how the data is actually reused: one vessel, many
                voyages, many surveys per voyage.
              </p>

              <SubHeading>Three-stage workflow</SubHeading>
              <p>
                Every voyage has three surveys —{" "}
                <em>Initial</em> (before loading),{" "}
                <em>Interim</em> (mid-load, optional),{" "}
                <em>Final</em> (after loading). Each stage has its own
                mark-offset overrides, because the officer may have spotted
                an obstructed mark and swapped for a known offset. Modeling
                stages as first-class entities, not enum fields on a
                generic survey row, keeps the per-stage overrides clean.
              </p>

              <SubHeading>Import from Excel, because that&apos;s where the tables live</SubHeading>
              <p>
                Hydrostatic tables come out of the vessel&apos;s stability
                booklet, transcribed into Excel decades ago and never
                re-transcribed since. The import path uses{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  xlsx
                </code>{" "}
                to read them directly. Asking officers to retype a
                200-row table would be a non-starter.
              </p>

              <SubHeading>Deck-usable input treatment</SubHeading>
              <p>
                The UI details aren&apos;t glamorous but they decide whether
                the tool gets used: oversized tap targets, high-contrast dark
                mode for bridge use, the decimal keypad on touch devices,
                validation that flags a draft reading outside the
                hydrostatic range before the number propagates through
                three corrections and produces nonsense. On a pitching deck
                at night, these are the things that separate a tool people
                trust from one they quietly go back to Excel for.
              </p>
            </Section>

            <Section heading="What I&apos;d do differently" index="06">
              <BulletList>
                <li>
                  <strong className="text-paper">
                    Ship the Tauri build sooner.
                  </strong>{" "}
                  Developing inside a Next.js dev server is comfortable; it
                  also lets me pretend offline-first is a near-term concern
                  when the app still fetches from{" "}
                  <code className="font-mono text-signal text-[0.92em]">
                    localhost
                  </code>
                  . Bundling for Tauri flushes out the assumptions.
                </li>
                <li>
                  <strong className="text-paper">
                    Golden test the calculation.
                  </strong>{" "}
                  The right way to gain confidence in five chained
                  corrections is a golden-file suite of real surveys with
                  known cargo figures. The calculation engine is pure
                  functions; the test harness is trivial to add; the
                  confidence it buys is disproportionate.
                </li>
                <li>
                  <strong className="text-paper">
                    Plan the migration story from day one.
                  </strong>{" "}
                  Offline desktop tools accumulate schema changes the same
                  way web apps do. Ship a migration runner in the Tauri
                  build that handles &quot;user had version 1, is now on
                  version 3, .db was never opened in version 2&quot;. This
                  is a mundane feature and the absence of it is what kills
                  desktop tools in year two.
                </li>
              </BulletList>
            </Section>

            <Section heading="Closing" index="07">
              <p>
                Draft Survey is a small project whose interesting problems
                aren&apos;t small. It&apos;s domain engineering — the hard
                part was understanding the calculation well enough to name
                its stages, not choosing a framework. It&apos;s
                offline-first — the hard part was committing to it instead
                of pretending one more cloud feature wouldn&apos;t hurt.
                It&apos;s UI for a specific population — the hard part was
                respecting that population&apos;s actual conditions rather
                than optimizing for my desk.
              </p>
              <p>
                The senior-engineering instinct I keep coming back to: the
                interesting decisions are usually the ones that constrain
                the system on purpose. Zero-dependency engine. Offline-only.
                Tauri, not Electron. Ship as the primary record. The
                constraints are the product.
              </p>
            </Section>

            {/* Stack */}
            <section className="border-t hairline pt-10">
              <div className="font-mono text-[0.65rem] tracking-widest2 uppercase text-rust mb-5">
                08 — Stack
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-sm">
                <StackRow label="Framework">
                  Next.js 16 (App Router), React 19, TypeScript
                </StackRow>
                <StackRow label="Styling">Tailwind CSS 4</StackRow>
                <StackRow label="Calculation engine">
                  Zero-dependency TypeScript module (src/lib/hydro.ts)
                </StackRow>
                <StackRow label="Data import">
                  xlsx — hydrostatic tables from stability booklets
                </StackRow>
                <StackRow label="Target distribution">
                  Tauri desktop bundles — Windows, macOS, Linux
                </StackRow>
                <StackRow label="Persistence (planned)">
                  SQLite, portable .db per installation
                </StackRow>
                <StackRow label="Audience">
                  Chief officers and marine surveyors on bulk carriers
                </StackRow>
                <StackRow label="Code">
                  github.com/raimieltan/draft-survey
                </StackRow>
              </dl>
            </section>

            {/* CTA */}
            <section className="border-t hairline pt-12 mt-14">
              <p className="font-display text-2xl sm:text-3xl italic leading-snug text-paper">
                Looking for senior engineers who build for real users?
              </p>
              <p className="mt-4 text-paper-dim">
                I&apos;m currently open to senior / staff backend and
                full-stack roles, remote across time zones.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/#contact"
                  className="font-mono text-[0.7rem] tracking-widest2 uppercase text-ink bg-signal px-4 py-2.5 hover:bg-paper transition-colors"
                >
                  Contact →
                </Link>
                <Link
                  href="/"
                  className="font-mono text-[0.7rem] tracking-widest2 uppercase text-paper-dim border hairline px-4 py-2.5 hover:text-signal hover:border-signal transition-colors"
                >
                  Full portfolio
                </Link>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}

function Section({
  heading,
  index,
  children,
}: {
  heading: string;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div className="flex items-baseline gap-4 border-b hairline pb-3 mb-6">
        <span className="font-mono text-[0.65rem] tracking-widest2 uppercase text-rust">
          {index}
        </span>
        <h2 className="font-display text-2xl sm:text-3xl leading-tight tracking-tightest text-paper">
          <span className="italic">{heading}</span>
        </h2>
      </div>
      {children}
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-[0.7rem] tracking-widest2 uppercase text-paper pt-4">
      {children}
    </h3>
  );
}

function BulletList({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-3 pl-5 list-disc marker:text-signal">{children}</ul>;
}

function StackRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col border-b hairline pb-3">
      <dt className="font-mono text-[0.6rem] tracking-widest2 uppercase text-rust">
        {label}
      </dt>
      <dd className="mt-1 text-paper-dim">{children}</dd>
    </div>
  );
}
