"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Coach", href: "#about" },
  { label: "Approach", href: "#philosophy" },
  { label: "Plans", href: "#pricing" },
  { label: "Contact", href: "#contact" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b border-transparent",
        "transition-[background,border-color,backdrop-filter] duration-300",
        scrolled && [
          "border-white/[0.08]",
          "bg-black/[0.82]",
          "[backdrop-filter:blur(16px)_saturate(140%)]",
        ]
      )}
      style={scrolled ? { WebkitBackdropFilter: "blur(16px) saturate(140%)" } : undefined}
    >
      <div className="wrap">
        <nav className="flex items-center justify-between h-[70px]">
          {/* Brand */}
          <Link href="#top" className="flex items-center gap-[11px]">
            <span
              className="w-[30px] h-[30px] bg-accent block flex-none"
              style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
              aria-hidden="true"
            />
            <span className="font-display text-[22px] tracking-[0.02em] text-fg">
              Singam
            </span>
          </Link>

          {/* Desktop nav — hidden below 860px */}
          <div className="hidden min-[860px]:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted hover:text-fg transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA button */}
          <Link
            href="#pricing"
            className={cn(
              "inline-flex items-center justify-center",
              "bg-accent text-ink",
              "text-[13px] font-extrabold uppercase tracking-[0.08em]",
              "px-[26px] py-[13px]",
              "border-2 border-transparent",
              "transition-[background,color,transform] duration-200",
              "hover:bg-fg hover:text-black hover:-translate-y-0.5"
            )}
          >
            Start Training
          </Link>
        </nav>
      </div>
    </header>
  )
}
