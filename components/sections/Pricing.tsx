"use client"

import Link from "next/link"
import { useState } from "react"
import { RevealWrapper } from "@/components/RevealWrapper"
import { cn } from "@/lib/utils"

type Cycle = "monthly" | "annual"

const plans = [
  {
    tag: "Self-Guided",
    monthly: 49,
    annual: 39,
    desc: "Periodized plans you run on your own schedule.",
    features: [
      "Adaptive marathon & Ironman plans",
      "Singam training app + analytics",
      "Pacing & race-day strategy guide",
      "Strength & mobility library",
    ],
    cta: "Get started",
    href: "#contact",
    featured: false,
  },
  {
    tag: "1-on-1 Coaching",
    monthly: 199,
    annual: 159,
    desc: "A fully personal plan, rebuilt weekly around your data.",
    features: [
      "Everything in Self-Guided",
      "Custom plan, adjusted weekly",
      "Direct chat with your coach",
      "Monthly video review call",
      "Nutrition & race-week planning",
    ],
    cta: "Start 1-on-1",
    href: "#contact",
    featured: true,
  },
  {
    tag: "Squad",
    monthly: 89,
    annual: 71,
    desc: "Train with a small group chasing the same line.",
    features: [
      "Shared squad training block",
      "Weekly group coaching call",
      "Private squad community",
      "Accountability & leaderboards",
    ],
    cta: "Join a squad",
    href: "#contact",
    featured: false,
  },
]

export function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("monthly")

  return (
    <section
      id="pricing"
      className="py-[130px] bg-bg-2 border-t border-white/[0.08] border-b border-b-white/[0.08]"
    >
      <div className="wrap">

        <RevealWrapper className="max-w-[640px]">
          <p className="eyebrow">Plans &amp; pricing</p>
          <h2
            className="font-display mt-[18px]"
            style={{ fontSize: "clamp(40px, 7vw, 86px)", lineHeight: 0.9 }}
          >
            Pick your
            <br />
            weapon.
          </h2>
          <p className="text-muted text-[18px] mt-[22px] max-w-[560px]">
            Cancel anytime. Every plan includes the Singam app, weekly
            check-ins, and race-day strategy.
          </p>

          {/* Billing toggle */}
          <div
            className="inline-flex items-center mt-[30px] border-2 border-line p-1 bg-bg"
            role="tablist"
            aria-label="Billing period"
          >
            {(["monthly", "annual"] as Cycle[]).map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cycle === c}
                onClick={() => setCycle(c)}
                className={cn(
                  "font-body text-[13px] font-extrabold uppercase tracking-[0.08em]",
                  "px-6 py-[11px] border-none cursor-pointer transition-all duration-200",
                  cycle === c
                    ? "bg-accent text-ink"
                    : "bg-transparent text-muted hover:text-fg"
                )}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
            <span className="text-[12px] font-extrabold uppercase tracking-[0.06em] text-accent ml-[14px] pr-1">
              Save 20%
            </span>
          </div>
        </RevealWrapper>

        {/* Plans grid — 1px gap via parent background */}
        <div
          className="grid grid-cols-1 min-[860px]:grid-cols-3 mt-[48px]"
          style={{
            gap: "1px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {plans.map((plan, i) => (
            <RevealWrapper
              key={plan.tag}
              delay={i * 70}
              className="relative bg-bg hover:bg-bg-2 transition-colors duration-300 flex flex-col"
            >
              {/* "MOST POPULAR" banner on featured plan */}
              {plan.featured && (
                <div className="absolute top-0 left-0 right-0 bg-accent text-ink text-[11px] font-extrabold tracking-[0.14em] text-center py-2">
                  MOST POPULAR
                </div>
              )}

              <div
                className={cn(
                  "flex flex-col flex-1 p-[42px_34px]",
                  plan.featured && "pt-[62px]"
                )}
              >
                <div
                  className={cn(
                    "text-[13px] font-extrabold uppercase tracking-[0.1em]",
                    plan.featured ? "text-accent" : "text-muted"
                  )}
                >
                  {plan.tag}
                </div>

                <div
                  className="font-display mt-[20px] mb-1 flex items-baseline gap-2"
                  style={{ fontSize: 66, lineHeight: 0.9 }}
                >
                  <span>${cycle === "monthly" ? plan.monthly : plan.annual}</span>
                  <small className="font-body text-[15px] text-faint font-semibold">
                    /MO
                  </small>
                </div>

                <p className="text-[14.5px] text-muted mb-[26px] min-h-[42px]">
                  {plan.desc}
                </p>

                <ul className="flex flex-col gap-[13px] mb-[30px] flex-1 list-none">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className="text-[14.5px] text-fg flex gap-[11px] items-start font-medium"
                    >
                      <span className="text-accent font-extrabold flex-none leading-[1.5]">
                        ✓
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={cn(
                    "w-full inline-flex items-center justify-center",
                    "text-[13px] font-extrabold uppercase tracking-[0.08em]",
                    "px-[26px] py-[13px] border-2",
                    "transition-all duration-200 hover:-translate-y-0.5",
                    plan.featured
                      ? "bg-accent text-ink border-transparent hover:bg-fg hover:text-black"
                      : "bg-transparent text-fg border-line hover:border-accent hover:text-accent"
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            </RevealWrapper>
          ))}
        </div>

        <p className="text-center mt-[30px] text-[13.5px] text-faint tracking-[0.02em]">
          Coming to Sivagangai? Ask about on-site camps at the Marathon Village —
          ice bath, sauna &amp; coached sessions included.
        </p>

      </div>
    </section>
  )
}
