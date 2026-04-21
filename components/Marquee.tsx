import { marqueeTokens } from "@/lib/data";

export function Marquee() {
  const loop = [...marqueeTokens, ...marqueeTokens];
  return (
    <div className="ticker-mask relative overflow-hidden border-y hairline py-5">
      <div className="flex whitespace-nowrap animate-ticker will-change-transform">
        {loop.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="mx-6 flex items-center gap-6 font-mono text-xs sm:text-sm tracking-widest2 uppercase text-paper-dim"
          >
            {t}
            <span className="text-rust">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
