type Props = {
  index: string;
  title: string;
  kicker?: string;
  headingId?: string;
};

export function SectionLabel({ index, title, kicker, headingId }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-10 border-b hairline pb-6 mb-10 sm:mb-14">
      <div className="flex items-baseline gap-5">
        <span className="font-mono text-[0.7rem] tracking-widest2 uppercase text-rust">
          {index}
        </span>
        <h2
          id={headingId}
          className="font-display text-3xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tightest text-paper"
        >
          <span className="italic">{title}</span>
        </h2>
      </div>
      {kicker ? (
        <p className="font-mono text-[0.7rem] tracking-widest2 uppercase text-muted max-w-xs sm:text-right">
          {kicker}
        </p>
      ) : null}
    </div>
  );
}
