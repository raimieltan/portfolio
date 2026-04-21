import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Designing a 17-model social platform without drowning in joins",
  description:
    "Notes from building Garage Hub — a Next.js 16 + Prisma 7 social platform for car enthusiasts. Domain modeling across five product surfaces (social, vehicles, events, clubs, marketplace), auth, and the indexes that keep it cheap.",
  alternates: { canonical: "/writing/garage-hub-domain-modeling" },
  openGraph: {
    type: "article",
    url: "/writing/garage-hub-domain-modeling",
    title: "Designing a 17-model social platform without drowning in joins",
    description:
      "Domain modeling across five product surfaces, JWT auth, and the indexes that keep Postgres cheap — a Next.js 16 + Prisma 7 build.",
    publishedTime: "2026-04-22T00:00:00.000Z",
    authors: ["Sean Raimiel Tan"],
    tags: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Domain Modeling",
      "Full-Stack",
      "Social Platform",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Designing a 17-model social platform without drowning in joins",
    description:
      "Domain modeling across five product surfaces, JWT auth, and the indexes that keep Postgres cheap.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline:
    "Designing a 17-model social platform without drowning in joins",
  description:
    "Notes from building Garage Hub — a Next.js 16 + Prisma 7 social platform. Domain modeling across five product surfaces, auth, and the indexes that keep it cheap.",
  author: {
    "@type": "Person",
    name: "Sean Raimiel Tan",
    url: "https://raimiel.xyz",
  },
  datePublished: "2026-04-22",
  keywords:
    "Next.js, Prisma, PostgreSQL, Domain Modeling, Social Platform, JWT Auth, Full-Stack",
};

export default function GarageHubCaseStudy() {
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
              <span className="text-muted">8 min read</span>
            </div>

            <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-[3.5rem] leading-[1.02] tracking-tightest">
              Designing a 17-model social platform{" "}
              <span className="italic">without drowning in joins</span>
            </h1>

            <p className="mt-7 text-[1.1rem] sm:text-lg text-paper-dim leading-relaxed">
              Notes from building Garage Hub — a Next.js 16 + Prisma 7 social
              platform for car enthusiasts. Five product surfaces, one
              PostgreSQL, and the domain model that had to hold them all
              together without turning every feed query into a twenty-table
              join.
            </p>
          </header>

          {/* Body */}
          <div className="prose-custom space-y-10 text-[1.02rem] sm:text-[1.05rem] text-paper-dim leading-[1.75]">
            <Section heading="The project" index="01">
              <p>
                Garage Hub is a personal project I kept pushing on because the
                shape of the problem was interesting: a community platform that
                isn&apos;t just a feed. Car enthusiasts want five separate
                things in one place — a social feed, a place to document their
                cars and mod histories, events and meetups, club membership,
                and a parts marketplace. Each of those is a whole product on
                its own. The engineering challenge wasn&apos;t any single
                surface; it was stitching all of them into one coherent data
                model and one authenticated session without the codebase
                starting to smell.
              </p>
              <p>The stack I settled on:</p>
              <BulletList>
                <li>
                  <strong className="text-paper">Next.js 16</strong> with the
                  App Router, using route handlers for the REST API — one
                  deployable, one auth story, server components where they
                  help.
                </li>
                <li>
                  <strong className="text-paper">Prisma 7</strong> against
                  PostgreSQL, via the{" "}
                  <code className="font-mono text-signal text-[0.92em]">
                    @prisma/adapter-pg
                  </code>{" "}
                  adapter. Typed queries, migration history in git.
                </li>
                <li>
                  <strong className="text-paper">JWT auth</strong> — bcryptjs
                  for hashing, httpOnly cookies for transport. No third-party
                  identity service; this had to run from a single repo with a
                  single{" "}
                  <code className="font-mono text-signal text-[0.92em]">
                    DATABASE_URL
                  </code>{" "}
                  and a{" "}
                  <code className="font-mono text-signal text-[0.92em]">
                    JWT_SECRET
                  </code>
                  .
                </li>
                <li>
                  <strong className="text-paper">shadcn/ui + Base UI +
                  Tailwind 4</strong> on the frontend,{" "}
                  <code className="font-mono text-signal text-[0.92em]">
                    react-dropzone
                  </code>{" "}
                  for uploads,{" "}
                  <code className="font-mono text-signal text-[0.92em]">
                    react-markdown
                  </code>{" "}
                  with GFM for post rendering.
                </li>
              </BulletList>
            </Section>

            <Section heading="Why five surfaces in one schema" index="02">
              <p>
                The obvious alternative was microservices — a posts service, a
                cars service, a marketplace service, each with its own
                database. I rejected it for the same reason most solo or
                small-team projects should: the cost of distributed state
                enormously outweighs the benefit of clean bounded contexts
                until you&apos;re at a scale that a personal project will
                never see. One Postgres, one migration timeline, one schema
                that has to be thought about carefully.
              </p>
              <p>
                The real question was how to model the seams. A post that
                references a car. A marketplace listing that denormalizes
                vehicle data. A notification that might point at a post, a
                comment, an event, or a club. Those cross-surface references
                are where a naive schema turns into spaghetti.
              </p>
            </Section>

            <Section heading="The domain model" index="03">
              <p>
                Seventeen Prisma models, grouped by product surface. A few are
                worth walking through because they show the decisions that
                matter.
              </p>

              <SubHeading>User, and the self-referential Follow</SubHeading>
              <p>
                The{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  User
                </code>{" "}
                model owns a fan-out of relations into every other surface —
                cars, posts, RSVPs, club memberships, messages, listings. The
                follow graph is a self-referential{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  Follow
                </code>{" "}
                table with{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  followerId
                </code>{" "}
                and{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  followingId
                </code>{" "}
                columns and a composite unique constraint on the pair.
                That unique constraint is the only thing keeping the follow
                graph from growing duplicates under a retry, and it&apos;s
                worth more than any application-level check.
              </p>

              <SubHeading>Post and its typed content</SubHeading>
              <p>
                Posts carry a{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  postType
                </code>{" "}
                enum —{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  GENERAL
                </code>
                ,{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  BUILD_UPDATE
                </code>
                ,{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  DYNO_RESULT
                </code>
                ,{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  PHOTO
                </code>{" "}
                — and an optional{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  carId
                </code>{" "}
                reference. Dyno results include horsepower, torque, and RPM
                columns directly on the post row. That denormalization was
                deliberate: most posts don&apos;t have dyno data, and the
                alternative — a separate{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  DynoResult
                </code>{" "}
                table with a nullable one-to-one — costs an extra join on
                every feed query to render the badge. Rows are cheap; joins
                in a hot path aren&apos;t.
              </p>

              <SubHeading>Notification as polymorphic pointer</SubHeading>
              <p>
                Notifications have a{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  type
                </code>{" "}
                enum and four nullable reference columns —{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  postId
                </code>
                ,{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  commentId
                </code>
                ,{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  eventId
                </code>
                ,{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  clubId
                </code>
                . Exactly one is populated, chosen by the type. This is the
                sparse-column flavor of a polymorphic association. The
                alternative — a single{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  entityType
                </code>
                /
                <code className="font-mono text-signal text-[0.92em]">
                  entityId
                </code>{" "}
                pair — sacrifices foreign-key integrity. Sparse columns keep
                the cascading deletes honest, and Postgres doesn&apos;t care
                about a few nullable columns. A compound index on{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  (userId, read)
                </code>{" "}
                makes the unread-count query cheap.
              </p>

              <SubHeading>Marketplace, with deliberate denormalization</SubHeading>
              <p>
                Marketplace listings carry{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  carMake
                </code>
                ,{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  carModel
                </code>
                , and{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  carYear
                </code>{" "}
                as string/integer fields on the listing itself rather than
                joining to the{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  Car
                </code>{" "}
                table. Sellers list parts that fit cars they don&apos;t own,
                and search has to work across makes and models whether or not
                the seller registered the vehicle. Denormalization here
                reflects the product, not laziness. Indexes on status, seller,
                and category do the heavy lifting for filters.
              </p>

              <SubHeading>RSVPs, likes, memberships — all composite-unique</SubHeading>
              <p>
                Four models ({" "}
                <code className="font-mono text-signal text-[0.92em]">
                  Like
                </code>
                ,{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  Follow
                </code>
                ,{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  RSVP
                </code>
                ,{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  ClubMembership
                </code>
                ) enforce a composite unique constraint on the natural key —
                &quot;one user can like a post once&quot;, &quot;one user can
                RSVP an event once&quot;. The database, not the API, is the
                source of truth for these invariants. Any retry storm or
                racing request hits the unique index and fails cleanly instead
                of producing two rows I later have to deduplicate.
              </p>
            </Section>

            <Section heading="The index strategy" index="04">
              <p>
                Seventeen models, eleven API groups, and every feed is a list
                that needs to paginate by{" "}
                <code className="font-mono text-signal text-[0.92em]">
                  createdAt
                </code>{" "}
                desc. The indexing rules I landed on:
              </p>
              <BulletList>
                <li>
                  <strong className="text-paper">
                    Every feed-like table indexes its ordering column.
                  </strong>{" "}
                  Posts, events, club posts, build updates, messages. A
                  descending index on{" "}
                  <code className="font-mono text-signal text-[0.92em]">
                    createdAt
                  </code>{" "}
                  makes feed pagination an index scan, not a sort.
                </li>
                <li>
                  <strong className="text-paper">
                    Every user-scoped feed gets a compound index.
                  </strong>{" "}
                  <code className="font-mono text-signal text-[0.92em]">
                    (userId, createdAt)
                  </code>{" "}
                  for a user&apos;s own posts,{" "}
                  <code className="font-mono text-signal text-[0.92em]">
                    (carId, createdAt)
                  </code>{" "}
                  for a car&apos;s build history,{" "}
                  <code className="font-mono text-signal text-[0.92em]">
                    (clubId, createdAt)
                  </code>{" "}
                  for a club&apos;s feed.
                </li>
                <li>
                  <strong className="text-paper">
                    Filtered counts get their own compound index.
                  </strong>{" "}
                  The unread-message counter indexes{" "}
                  <code className="font-mono text-signal text-[0.92em]">
                    (receiverId, read)
                  </code>
                  . The unread-notification badge indexes{" "}
                  <code className="font-mono text-signal text-[0.92em]">
                    (userId, read)
                  </code>
                  . Without those, every page load does a sequential scan on
                  the table that grows fastest.
                </li>
              </BulletList>
            </Section>

            <Section heading="Auth without a third party" index="05">
              <p>
                JWT in httpOnly cookies, bcryptjs for hashing. Boring by design.
                The interesting decision was keeping auth in the monolith
                rather than reaching for Auth0 or NextAuth. Reasoning: the app
                owns user records, usernames, follow relationships, and
                cascading deletes on user removal. Delegating identity to an
                external service would turn every one of those into a
                synchronization problem. The cost of a few dozen lines of JWT
                sign-and-verify is less than the cost of two systems of record
                for the same user.
              </p>
              <p>
                Cascading deletes on the user do get aggressive — drop a user
                and their cars, posts, comments, likes, and memberships go
                with them. That&apos;s intentional: GDPR-style hard deletes
                should work from one DELETE, not from an orchestration script.
              </p>
            </Section>

            <Section heading="What I&apos;d do differently" index="06">
              <BulletList>
                <li>
                  <strong className="text-paper">
                    Pick the feed query shape earlier.
                  </strong>{" "}
                  The &quot;home feed&quot; — posts from people you follow, in
                  reverse chronological order — is a fan-out problem that
                  every social platform eventually hits. Doing it as a live
                  query over{" "}
                  <code className="font-mono text-signal text-[0.92em]">
                    Follow
                  </code>{" "}
                  +{" "}
                  <code className="font-mono text-signal text-[0.92em]">
                    Post
                  </code>{" "}
                  works at low scale and dies gracelessly at higher scale. I
                  didn&apos;t need fan-out-on-write here, but I&apos;d
                  at least sketch the migration path before the schema freezes.
                </li>
                <li>
                  <strong className="text-paper">
                    Put soft delete on the content tables.
                  </strong>{" "}
                  Posts, comments, and listings benefit from a{" "}
                  <code className="font-mono text-signal text-[0.92em]">
                    deletedAt
                  </code>{" "}
                  column even when users don&apos;t need restore. Moderation
                  and abuse recovery are so much cheaper with a soft-delete
                  column than with a real purge.
                </li>
                <li>
                  <strong className="text-paper">
                    Seed the database with enough data to stress-test.
                  </strong>{" "}
                  The existing seed script covers all 17 models with demo data.
                  Useful for a demo; useless for finding the query that
                  sequential-scans a 10k-row table. A next iteration would
                  ship a load generator alongside the seed, parameterized by
                  user count.
                </li>
              </BulletList>
            </Section>

            <Section heading="Closing" index="07">
              <p>
                The part of this project I think about most isn&apos;t any
                single feature — it&apos;s how many product decisions turn
                into schema decisions. An enum instead of a lookup table. A
                denormalized column to skip a join. A composite unique to
                enforce an invariant the API would otherwise forget. A
                polymorphic pointer shaped as sparse foreign keys so cascades
                still work.
              </p>
              <p>
                Senior full-stack work is, in large part, deciding where
                complexity lives. In Garage Hub most of it lives in the
                schema, on purpose. The routes are thin, the validators are
                boring, and the product features read like SELECTs with
                filters. That&apos;s the shape you want.
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
                <StackRow label="Database">
                  PostgreSQL via Prisma 7 (@prisma/adapter-pg)
                </StackRow>
                <StackRow label="Auth">
                  JWT in httpOnly cookies, bcryptjs hashing
                </StackRow>
                <StackRow label="UI">
                  shadcn/ui, Base UI, Tailwind 4, react-markdown (GFM)
                </StackRow>
                <StackRow label="Uploads">
                  react-dropzone + route handlers for media ingest
                </StackRow>
                <StackRow label="API surface">
                  REST handlers: auth, cars, clubs, conversations, events,
                  marketplace, notifications, posts, search, upload, users
                </StackRow>
                <StackRow label="Schema scale">
                  17 Prisma models across 5 product surfaces
                </StackRow>
                <StackRow label="Code">
                  github.com/raimieltan/garage-hub
                </StackRow>
              </dl>
            </section>

            {/* CTA */}
            <section className="border-t hairline pt-12 mt-14">
              <p className="font-display text-2xl sm:text-3xl italic leading-snug text-paper">
                Hiring for a senior full-stack role?
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
