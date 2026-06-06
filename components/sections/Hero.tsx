import Link from "next/link"
import { RevealWrapper } from "@/components/RevealWrapper"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-end pb-[70px] overflow-hidden">
      {/* Background media placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="ph-bg h-full flex items-end justify-end p-7">
          <span className="font-mono text-[11.5px] text-faint uppercase tracking-[0.05em] px-3 py-1.5 border border-dashed border-white/20 bg-black/50">
            [ Hero film — athlete on the road, hard light, motion blur ]
          </span>
        </div>
        {/* Dual gradient overlay matching prototype */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.25) 100%), linear-gradient(0deg, #000 2%, transparent 40%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="wrap relative z-10 w-full">
        {/* Kick line */}
        <RevealWrapper className="inline-flex items-center gap-3 mb-[22px]">
          <span className="w-11 h-[3px] bg-accent block" aria-hidden="true" />
          <span className="eyebrow">Marathon &amp; Ironman</span>
        </RevealWrapper>

        {/* Headline */}
        <RevealWrapper delay={70}>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(64px, 12.5vw, 184px)",
              lineHeight: 0.82,
            }}
          >
            Pain is
            <br />
            <em className="not-italic text-accent">temporary.</em>
            <br />
            <span className="text-stroke-white">Finishing</span> isn&apos;t.
          </h1>
        </RevealWrapper>

        {/* Lede */}
        <RevealWrapper delay={140}>
          <p
            className="max-w-[540px] mt-[30px] text-muted"
            style={{ fontSize: "clamp(16px, 1.9vw, 20px)" }}
          >
            Coaching for athletes who refuse to quit. Marathon and Ironman plans
            engineered to put you on the start line ready — and across the line
            proud.
          </p>
        </RevealWrapper>

        {/* CTAs */}
        <RevealWrapper
          delay={210}
          className="flex gap-4 mt-[34px] flex-wrap"
        >
          <Link
            href="#pricing"
            className="inline-flex items-center justify-center bg-accent text-ink text-[14px] font-extrabold uppercase tracking-[0.08em] px-[34px] py-[18px] border-2 border-transparent hover:bg-fg hover:text-black transition-all duration-200 hover:-translate-y-0.5"
          >
            See the plans
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center text-fg text-[14px] font-extrabold uppercase tracking-[0.08em] px-[34px] py-[18px] border-2 border-line hover:border-accent hover:text-accent transition-all duration-200 hover:-translate-y-0.5"
          >
            Book a free call
          </Link>
        </RevealWrapper>
      </div>
    </section>
  )
}
