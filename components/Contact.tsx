import { profile } from "@/lib/data";
import { SectionLabel } from "./SectionLabel";

export function Contact() {
  return (
    <section id="contact" className="relative px-5 sm:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          index="05 — Contact"
          title="Let's talk."
          kicker="Open to senior / staff backend and full-stack roles"
        />

        <div className="grid grid-cols-12 gap-8 lg:gap-14">
          <div className="col-span-12 lg:col-span-7">
            <h3 className="font-display text-[11vw] sm:text-[7vw] md:text-[5.5vw] leading-[0.95] tracking-tightest">
              <a
                href={`mailto:${profile.email}`}
                className="underline-brackets hover:text-signal transition-colors break-all"
              >
                <span className="italic">{profile.email}</span>
              </a>
            </h3>
            <p className="mt-8 max-w-xl text-paper-dim leading-relaxed">
              The fastest way to reach me is email. I read every message, and I
              reply within a day. Tell me what you&apos;re building, how your
              team works, and where you want this to go — I&apos;ll tell you if
              I&apos;m the right fit.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
            <ContactRow label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <ContactRow label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s+/g, "")}`} />
            <ContactRow label="GitHub" value="github.com/raimieltan" href={profile.github} />
            <ContactRow label="Resume" value="Sean_Tan_Resume.pdf" href={profile.resumeHref} download />
            <div className="border hairline bg-ink-soft p-5">
              <div className="font-mono text-[0.65rem] tracking-widest2 uppercase text-rust">
                Location
              </div>
              <div className="mt-2 text-paper">{profile.location}</div>
              <div className="mt-1 font-mono text-[0.7rem] tracking-widest2 uppercase text-muted">
                {profile.timezone}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
  download,
}: {
  label: string;
  value: string;
  href: string;
  download?: boolean;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...(download ? { download: true } : {})}
      className="group flex items-center justify-between border hairline p-5 hover:border-signal transition-colors bg-ink-soft"
    >
      <div>
        <div className="font-mono text-[0.65rem] tracking-widest2 uppercase text-rust">
          {label}
        </div>
        <div className="mt-1 text-paper group-hover:text-signal transition-colors break-all">
          {value}
        </div>
      </div>
      <span className="font-mono text-paper-dim group-hover:text-signal group-hover:translate-x-1 transition-all">
        →
      </span>
    </a>
  );
}
