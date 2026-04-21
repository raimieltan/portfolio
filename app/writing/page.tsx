import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Case studies and technical essays from Sean Raimiel Tan — production backend engineering, AI integration, and the tradeoffs behind shipped systems.",
  alternates: { canonical: "/writing" },
  openGraph: {
    type: "website",
    url: "/writing",
    title: "Writing — Sean Raimiel Tan",
    description:
      "Case studies and technical essays on production backend engineering and AI-native systems.",
  },
};

type Entry = {
  slug: string;
  title: string;
  titleItalicTail?: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tag: string;
};

const entries: Entry[] = [
  {
    slug: "rag-azure-search-nestjs",
    title: "Shipping a production RAG system",
    titleItalicTail: "on Azure AI Search",
    excerpt:
      "A practical retrieval-augmented generation build at enterprise scale — ingestion, hybrid retrieval, citation-grounded generation, and the eval loop that kept it honest. Written from leading a team of seven on an AI integration at Prometheus.",
    date: "April 2026",
    readingTime: "9 min read",
    tag: "Case Study",
  },
  {
    slug: "garage-hub-domain-modeling",
    title: "Designing a 17-model social platform",
    titleItalicTail: "without drowning in joins",
    excerpt:
      "Notes from Garage Hub — a Next.js 16 + Prisma 7 social platform spanning social, vehicles, events, clubs, and a marketplace. Domain modeling across five product surfaces, JWT auth, and the indexes that keep Postgres cheap.",
    date: "April 2026",
    readingTime: "8 min read",
    tag: "Case Study",
  },
  {
    slug: "draft-survey-offline-first",
    title: "Building an offline-first maritime calculator",
    titleItalicTail: "(and picking Tauri over Electron)",
    excerpt:
      "Notes from Draft Survey — a Next.js 16 + TypeScript tool that computes bulk-carrier cargo from draft readings, hydrostatic tables, and trim corrections. A zero-dependency calculation engine, an offline-only posture, and the distribution choice that made it portable.",
    date: "April 2026",
    readingTime: "7 min read",
    tag: "Case Study",
  },
];

export default function WritingIndex() {
  return (
    <>
      <Nav />
      <main id="content" className="pt-28 pb-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <header className="mb-14 sm:mb-20">
            <Link
              href="/"
              className="font-mono text-[0.65rem] tracking-widest2 uppercase text-paper-dim hover:text-signal transition-colors"
            >
              ← Home
            </Link>
            <div className="mt-8 flex items-baseline gap-5">
              <span className="font-mono text-[0.7rem] tracking-widest2 uppercase text-rust">
                W — Writing
              </span>
            </div>
            <h1 className="mt-4 font-display text-5xl sm:text-7xl md:text-[5.5rem] leading-[0.95] tracking-tightest text-paper">
              <span className="italic">Case studies</span>, essays,
              <br />
              and production notes.
            </h1>
            <p className="mt-8 max-w-2xl text-[1.05rem] text-paper-dim leading-relaxed">
              Long-form pieces on what it&apos;s actually like to ship
              backends, SaaS platforms, and AI-native systems at production
              scale. Tradeoffs, pitfalls, and what I&apos;d do differently.
            </p>
          </header>

          <ul className="divide-y divide-[rgba(244,239,230,0.12)] border-y hairline">
            {entries.map((e, i) => (
              <li key={e.slug}>
                <Link
                  href={`/writing/${e.slug}`}
                  className="group grid grid-cols-12 gap-6 py-10 sm:py-12 hover:bg-ink-soft/50 transition-colors px-2"
                >
                  <div className="col-span-12 sm:col-span-2 flex items-start">
                    <span className="font-mono text-[0.65rem] tracking-widest2 uppercase text-rust">
                      {String(i + 1).padStart(2, "0")} · {e.tag}
                    </span>
                  </div>

                  <div className="col-span-12 sm:col-span-7">
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.02] tracking-tightest text-paper group-hover:text-signal transition-colors">
                      {e.title}
                      {e.titleItalicTail ? (
                        <>
                          {" "}
                          <span className="italic">{e.titleItalicTail}</span>
                        </>
                      ) : null}
                    </h2>
                    <p className="mt-4 text-paper-dim leading-relaxed max-w-2xl">
                      {e.excerpt}
                    </p>
                  </div>

                  <div className="col-span-12 sm:col-span-3 flex sm:justify-end items-start">
                    <div className="font-mono text-[0.65rem] tracking-widest2 uppercase text-muted flex flex-col sm:items-end gap-1">
                      <span>{e.date}</span>
                      <span>{e.readingTime}</span>
                      <span className="mt-3 text-paper-dim group-hover:text-signal transition-colors">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-14 font-mono text-[0.7rem] tracking-widest2 uppercase text-muted">
            More pieces in progress. Follow along on{" "}
            <a
              href="https://github.com/raimieltan"
              target="_blank"
              rel="noreferrer"
              className="underline-brackets text-paper-dim hover:text-signal"
            >
              github.com/raimieltan
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
