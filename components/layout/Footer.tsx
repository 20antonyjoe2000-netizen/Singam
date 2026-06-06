import Link from "next/link"

const navLinks = [
  { label: "Coach", href: "#about" },
  { label: "Approach", href: "#philosophy" },
  { label: "Plans", href: "#pricing" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  return (
    <footer className="pt-16 pb-[52px] border-t-2 border-accent">
      <div className="wrap flex justify-between items-start gap-6 flex-wrap">
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

        {/* Address */}
        <address className="not-italic text-muted text-[13.5px] leading-[1.7] max-w-[280px]">
          Singam Ironman Academy
          <br />
          Kattu Nedungulam Village,
          <br />
          Sivagangai, Tamil Nadu 630562
        </address>

        {/* Nav links */}
        <div className="flex gap-[26px]">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-[12px] font-bold uppercase tracking-[0.08em] text-muted hover:text-accent transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-faint text-[12px] uppercase tracking-[0.08em]">
          © 2026 Singam Ironman Academy
        </p>
      </div>
    </footer>
  )
}
