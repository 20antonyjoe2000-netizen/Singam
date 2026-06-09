import Image from "next/image"
import { RevealWrapper } from "@/components/RevealWrapper"

const chips = [
  "Running · Bike · Swim",
  "Ice Bath & Sauna",
  "Strength Training",
  "Est. Sivagangai",
]

export function About() {
  return (
    <section
      id="about"
      className="bg-bg-2 border-t border-white/[0.08] border-b border-b-white/[0.08]"
    >
      {/* No vertical padding on container — photo bleeds to section edges */}
      <div className="max-w-site mx-auto px-9">
        <div className="grid grid-cols-1 min-[860px]:grid-cols-[0.9fr_1.1fr] gap-0">

          {/* Photo column */}
          <RevealWrapper className="relative min-h-[560px]">
            <Image
              src="/assets/coach-portrait.png"
              alt="Sivabalan Elango — Singam Ironman Academy coach"
              fill
              className="object-cover object-top"
              sizes="(max-width: 860px) 100vw, 45vw"
              priority={false}
            />
            {/* Gradient fade bottom */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.05) 46%)",
              }}
            />
            {/* Caption */}
            <div className="absolute left-0 bottom-0 px-7 py-6">
              <b className="block font-display text-[30px] uppercase tracking-[0.02em] leading-[0.95]">
                The Coach
              </b>
              <span className="text-[12px] font-bold tracking-[0.1em] uppercase text-muted">
                Singam · Marathon &amp; Ironman
              </span>
            </div>
          </RevealWrapper>

          {/* Copy column */}
          <RevealWrapper
            delay={70}
            className="flex flex-col justify-center px-9 min-[860px]:pl-[70px] py-[110px]"
          >
            <p className="eyebrow">The academy</p>
            <h2
              className="font-display mt-4 mb-[22px]"
              style={{
                fontSize: "clamp(34px, 4.6vw, 60px)",
                lineHeight: 0.92,
              }}
            >
              Where lions
              <br />
              are made.
            </h2>
            <p className="text-muted text-[17px] mb-4 max-w-[520px]">
              Singam Ironman Academy is a marathon training &amp; fitness-vacation
              centre in Sivagangai, Tamil Nadu — built by endurance athletes who
              came up through the Chennai Runners community.
            </p>
            <p className="text-muted text-[17px] mb-4 max-w-[520px]">
              We bring running, cycling, swimming, strength, ice bath and sauna
              together in one place, then package that same system into coaching
              you can follow from anywhere. Beginners to Kona qualifiers — every
              plan is built by hand and adjusted to the data your body sends back.
            </p>
            <div className="flex flex-wrap gap-[10px] mt-[18px]">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="text-[12px] font-bold uppercase tracking-[0.06em] text-fg px-[15px] py-[9px] border border-line bg-bg"
                >
                  {chip}
                </span>
              ))}
            </div>
          </RevealWrapper>

        </div>
      </div>
    </section>
  )
}
