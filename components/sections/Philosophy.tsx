import Image from "next/image"
import { RevealWrapper } from "@/components/RevealWrapper"

const principles = [
  {
    num: "01",
    title: "Built around your life",
    body: "Plans flex to your schedule, not the other way around. Real progress on the hours you actually have.",
  },
  {
    num: "02",
    title: "Recovery is training",
    body: "We program rest as hard as we program intervals. You adapt when you stop, not when you grind.",
  },
  {
    num: "03",
    title: "Data-informed, human-led",
    body: "Heart rate and power guide the plan. Judgement and experience drive it. Numbers never coach alone.",
  },
  {
    num: "04",
    title: "Consistency wins",
    body: "No hero weeks. No burnout. Small, repeatable sessions stacked over months win the start line.",
  },
]

const racePhotos = [
  { src: "/assets/race-kangayam.webp", alt: "Sivabalan flexing at Kangayam Marathon finish", crop: "50% 63%" },
  { src: "/assets/race-delhi.webp", alt: "Sivabalan racing at Vedanta Delhi Half Marathon", crop: "50% 0%" },
  { src: "/assets/race-road.webp", alt: "Sivabalan victory fist at road race", crop: "47% 46%" },
]

export function Philosophy() {
  return (
    <section id="philosophy" className="py-[130px]">
      <div className="wrap">

        <RevealWrapper className="max-w-[680px]">
          <p className="eyebrow">The approach</p>
          <h2
            className="font-display mt-[18px]"
            style={{ fontSize: "clamp(40px, 7vw, 86px)", lineHeight: 0.9 }}
          >
            No shortcuts.
            <br />
            Just the work.
          </h2>
          <p className="text-muted text-[18px] mt-[22px] max-w-[560px]">
            Four principles drive every plan — from your first 5K build to a
            sub-10 Ironman.
          </p>
        </RevealWrapper>

        {/* Race photo strip */}
        <div
          className="grid grid-cols-3 mt-[60px]"
          style={{
            gap: "1px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {racePhotos.map((photo, i) => (
            <RevealWrapper key={photo.src} className="relative h-[240px] md:h-[320px] overflow-hidden bg-bg">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                style={{ objectPosition: photo.crop }}
                sizes="(max-width: 640px) 100vw, 33vw"
                data-crop-id={`approach-${i}`}
              />
            </RevealWrapper>
          ))}
        </div>

        {/* 2×2 grid — 1px gap achieved via background on parent */}
        {/* mt-[-1px] merges top border with photo strip bottom border */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 mt-[-1px]"
          style={{
            gap: "1px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {principles.map((p, i) => (
            <RevealWrapper
              key={p.num}
              delay={i * 70}
              className="bg-bg hover:bg-bg-2 transition-colors duration-300 p-[46px_40px]"
            >
              {/* Outline number */}
              <div
                className="font-display text-[54px] leading-none"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1.5px #e6122b",
                }}
              >
                {p.num}
              </div>
              <h4 className="font-display text-[28px] uppercase tracking-[0.01em] mt-[14px] mb-[12px]">
                {p.title}
              </h4>
              <p className="text-muted text-[15.5px] max-w-[440px]">{p.body}</p>
            </RevealWrapper>
          ))}
        </div>

      </div>
    </section>
  )
}
