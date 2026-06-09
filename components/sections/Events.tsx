import { RevealWrapper } from "@/components/RevealWrapper"

const events = [
  {
    name: "Kangayam Marathon 2026",
    day: "16",
    month: "Aug 2026",
    location: "Kangayam, Tamil Nadu",
    distance: "Full Marathon",
  },
  {
    name: "Kauvery Marathon 2026",
    day: "27",
    month: "Sep 2026",
    location: "Tiruchirappalli, Tamil Nadu",
    distance: "Full Marathon",
  },
]

export function Events() {
  return (
    <section id="events" className="py-[130px]">
      <div className="wrap">

        <RevealWrapper className="max-w-[680px]">
          <p className="eyebrow">Race calendar</p>
          <h2
            className="font-display mt-[18px]"
            style={{ fontSize: "clamp(40px, 7vw, 86px)", lineHeight: 0.9 }}
          >
            Upcoming
            <br />
            Races.
          </h2>
          <p className="text-muted text-[18px] mt-[22px] max-w-[560px]">
            Races on the horizon — mark your calendar and start building.
          </p>
        </RevealWrapper>

        <div
          className="mt-[60px]"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {events.map((event, i) => (
            <RevealWrapper
              key={event.name}
              delay={i * 70}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-bg hover:bg-bg-2 transition-colors duration-300 p-[40px]"
              style={
                i > 0
                  ? { borderTop: "1px solid rgba(255,255,255,0.08)" }
                  : undefined
              }
            >
              <div>
                <span
                  className="inline-block font-bold text-[11px] uppercase tracking-[0.12em] px-[10px] py-[5px] mb-[14px]"
                  style={{ background: "#e6122b", color: "#0a0a0a" }}
                >
                  {event.distance}
                </span>
                <h3 className="font-display text-[32px] uppercase tracking-[0.01em]">
                  {event.name}
                </h3>
                <p className="text-muted text-[15px] mt-[6px]">{event.location}</p>
              </div>

              <div className="text-right flex-none">
                <div
                  className="font-display text-[54px] leading-none"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1.5px #e6122b",
                  }}
                >
                  {event.day}
                </div>
                <div className="text-muted text-[13px] font-bold uppercase tracking-[0.08em] mt-[2px]">
                  {event.month}
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>

      </div>
    </section>
  )
}
