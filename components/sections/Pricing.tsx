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

        {/* Header: title left, toggle right */}
        <RevealWrapper>
          <div className="flex flex-col min-[640px]:flex-row min-[640px]:items-end justify-between gap-6 mb-[52px]">
            <div>
              <p className="eyebrow">Plans &amp; pricing</p>
              <h2
                className="font-display mt-[18px]"
                style={{ fontSize: "clamp(40px, 7vw, 86px)", lineHeight: 0.9 }}
              >
                Pick your
                <br />
                weapon.
              </h2>
              <p className="text-muted text-[18px] mt-[22px] max-w-[480px]">
                Cancel anytime. Every plan includes the Singam app, weekly
                check-ins, and race-day strategy.
              </p>
            </div>

            {/* Billing toggle */}
            <div
              className="inline-flex items-center border-2 border-line p-1 bg-bg self-start min-[640px]:self-end flex-none"
              role="tablist"
              aria-label="Billing period"
            >
              <button
                role="tab"
                aria-selected={cycle === "monthly"}
                onClick={() => setCycle("monthly")}
                className={cn(
                  "font-body text-[13px] font-extrabold uppercase tracking-[0.08em]",
                  "px-5 py-[10px] cursor-pointer transition-all duration-200",
                  cycle === "monthly"
                    ? "bg-accent text-ink"
                    : "bg-transparent text-muted hover:text-fg"
                )}
              >
                Monthly
              </button>
              <button
                role="tab"
                aria-selected={cycle === "annual"}
                onClick={() => setCycle("annual")}
                className={cn(
                  "font-body text-[13px] font-extrabold uppercase tracking-[0.08em]",
                  "px-5 py-[10px] cursor-pointer transition-all duration-200 flex items-center gap-[8px]",
                  cycle === "annual"
                    ? "bg-accent text-ink"
                    : "bg-transparent text-muted hover:text-fg"
                )}
              >
                Annual
                <span
                  className={cn(
                    "text-[11px] font-extrabold tracking-[0.06em]",
                    cycle === "annual" ? "text-ink/80" : "text-accent"
                  )}
                >
                  SAVE 20%
                </span>
              </button>
            </div>
          </div>
        </RevealWrapper>

        {/* Plans grid */}
        <div className="grid grid-cols-1 min-[860px]:grid-cols-3 gap-[3px] bg-white/[0.06]">
          {plans.map((plan, i) => (
            <RevealWrapper
              key={plan.tag}
              delay={i * 70}
              className="flex flex-col"
            >
              {/* Top banner row — keeps all cards vertically aligned */}
              {plan.featured ? (
                <div className="bg-accent text-ink text-[11px] font-extrabold tracking-[0.14em] text-center py-[8px]">
                  MOST POPULAR
                </div>
              ) : (
                <div className="py-[8px] text-[11px] bg-bg invisible select-none">&nbsp;</div>
              )}

              <div
                className={cn(
                  "flex flex-col flex-1 p-[38px_32px] bg-bg",
                  plan.featured
                    ? "border-x-2 border-b-2 border-accent"
                    : "border border-transparent"
                )}
              >
                {/* Plan name */}
                <div
                  className={cn(
                    "font-display text-[26px] uppercase leading-none mb-[16px]",
                    plan.featured ? "text-accent" : "text-fg"
                  )}
                >
                  {plan.tag}
                </div>

                {/* Price */}
                <div
                  className="font-display flex items-baseline gap-[6px] mb-[8px]"
                  style={{ fontSize: 68, lineHeight: 0.9 }}
                >
                  <span>${cycle === "monthly" ? plan.monthly : plan.annual}</span>
                  <small className="font-body text-[15px] text-faint font-semibold">/MO</small>
                </div>

                <p className="text-[14.5px] text-muted mb-[26px] min-h-[44px]">
                  {plan.desc}
                </p>

                <ul className="flex flex-col gap-[13px] mb-[32px] flex-1 list-none">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className="text-[14.5px] text-fg flex gap-[10px] items-start font-medium"
                    >
                      {plan.featured ? (
                        <span className="flex-none w-[18px] h-[18px] rounded-full bg-accent text-ink text-[10px] font-extrabold flex items-center justify-center mt-[2px] shrink-0">
                          ✓
                        </span>
                      ) : (
                        <span className="text-accent font-extrabold flex-none leading-[1.5] shrink-0">
                          ✓
                        </span>
                      )}
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={cn(
                    "w-full inline-flex items-center justify-center",
                    "text-[13px] font-extrabold uppercase tracking-[0.08em]",
                    "px-[26px] py-[14px] border-2",
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
