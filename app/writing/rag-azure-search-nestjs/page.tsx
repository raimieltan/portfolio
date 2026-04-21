import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shipping a production RAG system on Azure AI Search",
  description:
    "A practical retrieval-augmented generation build at enterprise scale — ingestion, hybrid retrieval, citation-grounded generation, and the eval loop that kept it honest. Leading 7 engineers on Azure AI Search, Azure OpenAI, and NestJS.",
  alternates: { canonical: "/writing/rag-azure-search-nestjs" },
  openGraph: {
    type: "article",
    url: "/writing/rag-azure-search-nestjs",
    title: "Shipping a production RAG system on Azure AI Search",
    description:
      "Ingestion, hybrid retrieval, citation-grounded generation, and the eval loop that kept it honest.",
    publishedTime: "2026-04-22T00:00:00.000Z",
    authors: ["Sean Raimiel Tan"],
    tags: [
      "RAG",
      "Azure AI Search",
      "NestJS",
      "LLM",
      "Retrieval-Augmented Generation",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipping a production RAG system on Azure AI Search",
    description:
      "Ingestion, hybrid retrieval, citation-grounded generation, and the eval loop that kept it honest.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Shipping a production RAG system on Azure AI Search",
  description:
    "A practical retrieval-augmented generation build at enterprise scale — ingestion, hybrid retrieval, citation-grounded generation, and the eval loop that kept it honest.",
  author: {
    "@type": "Person",
    name: "Sean Raimiel Tan",
    url: "https://raimiel.xyz",
  },
  datePublished: "2026-04-22",
  keywords:
    "RAG, Retrieval-Augmented Generation, Azure AI Search, NestJS, LLM, Production AI",
};

export default function RagCaseStudy() {
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
              <span className="text-muted">9 min read</span>
            </div>

            <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-[3.5rem] leading-[1.02] tracking-tightest">
              Shipping a production RAG system{" "}
              <span className="italic">on Azure AI Search</span>
            </h1>

            <p className="mt-7 text-[1.1rem] sm:text-lg text-paper-dim leading-relaxed">
              A practical retrieval-augmented generation build at enterprise
              scale — ingestion, hybrid retrieval, citation-grounded generation,
              and the evaluation loop that kept it honest. Written from leading
              a team of seven engineers at Prometheus on an AI integration for
              an enterprise knowledge base.
            </p>
          </header>

          {/* Body */}
          <div className="prose-custom space-y-10 text-[1.02rem] sm:text-[1.05rem] text-paper-dim leading-[1.75]">
            <Section heading="The brief" index="01">
              <p>
                The client was an enterprise with a large, heterogeneous
                internal knowledge base — product documentation, internal
                runbooks, structured records — spread across formats and
                systems. Their users kept asking the same kinds of questions in
                different wording, and the existing full-text search was
                returning documents, not answers. A few in-house LLM prototypes
                had already been tried. All of them hallucinated confidently or
                cited sources they had never read.
              </p>
              <p>The constraints we inherited:</p>
              <BulletList>
                <li>Azure-only deployment — it was the committed cloud.</li>
                <li>
                  Citation-grounded answers. Every claim in the response must
                  point back to a retrievable chunk. No ungrounded generation.
                </li>
                <li>
                  Sub-3-second p95 for interactive queries. Fast enough that
                  users don&apos;t stop trusting it.
                </li>
                <li>
                  Cost-controlled at the scale of millions of chunks, hundreds
                  of thousands of queries a month.
                </li>
              </BulletList>
            </Section>

            <Section heading="Why RAG, and not fine-tuning or pure prompting" index="02">
              <p>
                Before touching code, the team aligned on the framing. Three
                options were on the table, and we rejected two:
              </p>
              <BulletList>
                <li>
                  <strong className="text-paper">Fine-tuning</strong> doesn&apos;t
                  cheaply teach new facts. It is the right tool for changing
                  style or constraining output format — not for making an LLM
                  memorize an evolving corpus.
                </li>
                <li>
                  <strong className="text-paper">Pure prompting</strong> — stuffing
                  retrieved documents into a long context — scales badly on
                  cost and hits context limits on real documents. It also makes
                  citation verification a downstream problem.
                </li>
                <li>
                  <strong className="text-paper">RAG</strong> gave us three things
                  the others couldn&apos;t: freshness (re-index instead of
                  retrain), grounded citations as a byproduct of retrieval, and
                  per-query cost that scales with the question, not the corpus.
                </li>
              </BulletList>
              <p>
                The decision took an afternoon. Everything after it was the
                actual work.
              </p>
            </Section>

            <Section heading="The architecture" index="03">
              <p>Three pipelines, each with its own failure mode:</p>

              <SubHeading>Ingestion</SubHeading>
              <p>
                Azure Blob Storage held the raw corpus. A scheduled NestJS job
                pulled new or updated files, extracted text and metadata
                (Markdown, PDF, HTML all needed different extractors), chunked
                the content, embedded each chunk, and upserted the result into
                Azure AI Search. Every chunk carried provenance — source URI,
                section path, position — so retrieval could later cite it
                exactly.
              </p>

              <SubHeading>Query path</SubHeading>
              <p>
                A NestJS REST API accepted the user&apos;s natural-language
                question, ran a hybrid query against Azure AI Search (vector +
                BM25), reranked the top results with the semantic reranker,
                formatted the top-k chunks into a system prompt, and called
                Azure OpenAI for the final answer. The answer came back as
                structured JSON — never free text — with an explicit list of
                citation chunk IDs.
              </p>

              <SubHeading>Evaluation loop</SubHeading>
              <p>
                A separate pipeline ran a golden question-and-answer set
                against the system on every deploy, scored retrieval recall and
                answer faithfulness, and posted the diff to a Slack channel.
                Any regression over 3% blocked the deploy. This caught more
                production bugs than any amount of manual QA.
              </p>
            </Section>

            <Section heading="Three decisions worth talking about" index="04">
              <SubHeading>Hybrid search beat vector-only retrieval</SubHeading>
              <p>
                Our first retrieval implementation was pure cosine similarity
                over embeddings. It handled paraphrase beautifully and failed
                embarrassingly on exact-term queries — product names, internal
                IDs, proper nouns the embedding model had never seen. Adding
                keyword scoring alongside vector scoring, then passing the
                union through the semantic reranker, closed the gap. The
                reranker is the underappreciated piece: vector + BM25 is a
                messy union; the reranker makes it usable.
              </p>

              <SubHeading>
                Chunk size mattered more than model choice
              </SubHeading>
              <p>
                We spent a day on embedding-model bakeoffs and a week on
                chunking strategy. That ratio was backwards, and the chunking
                week was the one that moved the needle. Semantic chunking at
                Markdown headings, with a fixed-size fallback for runaway
                paragraphs, outperformed naive fixed-window chunking by roughly
                fifteen percent on recall@5. Chunk overlap mattered less than
                we expected; chunk boundaries aligned to the document&apos;s
                own structure mattered more.
              </p>

              <SubHeading>
                Citations aren&apos;t a prompt trick — they&apos;re an API
                contract
              </SubHeading>
              <p>
                Early iterations asked the LLM to &quot;include citations.&quot;
                Sometimes it did. Sometimes it invented citations that looked
                plausible. We moved to a strict JSON response format — a schema
                with{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  answer
                </code>{" "}
                and{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  citations[]
                </code>
                , each citation a chunk ID we had literally just passed into
                the prompt. Unparseable or off-contract responses hard-failed
                and retried with a corrective message. The change converted
                hallucinated citations from a reputation risk into a bug with a
                stack trace, which is the only form of bug a team can fix.
              </p>
            </Section>

            <Section heading="What we measured" index="05">
              <p>
                The golden set was about two hundred human-written
                question-answer pairs, versioned in git alongside the code that
                used it. Four metrics tracked across deploys:
              </p>
              <BulletList>
                <li>
                  <strong className="text-paper">Retrieval recall@5</strong> —
                  was the chunk containing the true answer in the top five
                  retrieved?
                </li>
                <li>
                  <strong className="text-paper">Answer faithfulness</strong> —
                  did the generated answer only use retrieved chunks, or did
                  the model add from memory? LLM-judged, sampled, reviewed.
                </li>
                <li>
                  <strong className="text-paper">Citation correctness</strong> —
                  did each cited chunk actually contain the claim it supported?
                </li>
                <li>
                  <strong className="text-paper">Latency and cost</strong> — p50,
                  p95, and $/query, broken down by retrieval, reranking, and
                  generation.
                </li>
              </BulletList>
              <p>
                A regression of more than three percent on any of the first
                three blocked the deploy. Latency and cost regressions surfaced
                as Slack alerts. Nobody shipped blind.
              </p>
            </Section>

            <Section heading="What I'd do differently" index="06">
              <BulletList>
                <li>
                  <strong className="text-paper">
                    Build the eval set before the system.
                  </strong>{" "}
                  We did retrieval-quality bakeoffs on intuition for a week
                  before we had numbers. The eval harness should be the first
                  service, not the last.
                </li>
                <li>
                  <strong className="text-paper">
                    Start with hybrid retrieval + reranker on day one.
                  </strong>{" "}
                  We rewrote the query path once. The production architecture
                  was clear from the first day; we just wanted to believe pure
                  vector would be enough.
                </li>
                <li>
                  <strong className="text-paper">
                    Keep a corpus of bad queries.
                  </strong>{" "}
                  User-reported failures are the highest-signal training data
                  you have, and they&apos;re free. Start collecting them in
                  week one.
                </li>
              </BulletList>
            </Section>

            <Section heading="Closing" index="07">
              <p>
                RAG is less about the language model and more about retrieval
                quality. Most production RAG failures are retrieval failures —
                the LLM faithfully rendered bad source material, and the bad
                source material came from a chunking strategy or a vector-only
                index that failed on the query. Fix retrieval first. Measure
                everything. Make citations a contract, not a hope.
              </p>
              <p>
                The rest — the NestJS routes, the Docker builds, the CI/CD,
                the Azure Container Apps deployment — is regular backend work
                dressed up as AI. It&apos;s the part that determines whether
                your system runs. Retrieval is the part that determines whether
                it&apos;s useful.
              </p>
            </Section>

            {/* Stack */}
            <section className="border-t hairline pt-10">
              <div className="font-mono text-[0.65rem] tracking-widest2 uppercase text-rust mb-5">
                08 — Stack
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-sm">
                <StackRow label="Retrieval">
                  Azure AI Search — hybrid (vector + BM25) with semantic
                  reranking
                </StackRow>
                <StackRow label="Embeddings">
                  Azure OpenAI — text-embedding-3-large (1536 dim)
                </StackRow>
                <StackRow label="Generation">
                  Azure OpenAI — GPT-4 class model, structured JSON output
                </StackRow>
                <StackRow label="Source storage">Azure Blob Storage</StackRow>
                <StackRow label="API layer">
                  NestJS, class-validator DTOs, Swagger/OpenAPI contracts
                </StackRow>
                <StackRow label="Runtime">
                  Docker → Azure Container Apps, GitHub Actions CI/CD
                </StackRow>
                <StackRow label="Observability">
                  Application Insights, structured logs, per-stage traces
                </StackRow>
                <StackRow label="Evaluation">
                  Python harness, ~200 golden Q/A pairs, LLM-as-judge for
                  faithfulness
                </StackRow>
              </dl>
            </section>

            {/* CTA */}
            <section className="border-t hairline pt-12 mt-14">
              <p className="font-display text-2xl sm:text-3xl italic leading-snug text-paper">
                Hiring for an AI-native backend team?
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
