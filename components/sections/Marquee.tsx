const ITEMS = ["Running", "Cycling", "Swimming", "Strength", "Ice Bath", "Sauna"]

export function Marquee() {
  // Duplicate items so seamless loop works: track is 2× items wide,
  // animation translates -50% which lands exactly at the start.
  const track = [...ITEMS, ...ITEMS]

  return (
    <div
      aria-hidden="true"
      className="border-t-2 border-b-2 border-accent bg-accent overflow-hidden py-[13px]"
    >
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {track.map((item, i) => (
          <span
            key={i}
            className="font-display text-[22px] uppercase text-ink tracking-[0.03em] inline-flex items-center"
          >
            {item}
            <span className="mx-[30px] text-[13px] opacity-70" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
