# Singam Ironman Academy — Next.js 15 Port Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the Singam Ironman Academy HTML prototype (Direction B / Nike Bold, file `singam/Singam Ironman Academy.html`) into a production-ready Next.js 15 TypeScript site with Tailwind CSS and ShadCN UI.

**Architecture:** App Router single-page site. All six sections assembled in `app/page.tsx` as imported components. `"use client"` only on Header (scroll state), Pricing (billing toggle), Contact (form state), and RevealWrapper (IntersectionObserver). Server Action in `app/actions/contact.ts` handles form validation and submission.

**Tech Stack:** Next.js 15, TypeScript 5, Tailwind CSS v3, ShadCN UI, `next/font/google` (Anton + Archivo)

---

## File Map

| File | Responsibility |
|------|----------------|
| `singam-web/app/layout.tsx` | Root layout, font injection, metadata |
| `singam-web/app/globals.css` | Tailwind directives, brand CSS utilities, marquee keyframe |
| `singam-web/app/page.tsx` | Assembles all section components |
| `singam-web/app/actions/contact.ts` | Server Action: validate form, return result |
| `singam-web/tailwind.config.ts` | Brand color tokens, display/body font families |
| `singam-web/components/layout/Header.tsx` | Fixed sticky nav with scroll-blur (client) |
| `singam-web/components/layout/Footer.tsx` | Site footer with address + nav links (server) |
| `singam-web/components/sections/Hero.tsx` | Full-height hero (server) |
| `singam-web/components/sections/Marquee.tsx` | Scrolling ticker (server, CSS animation) |
| `singam-web/components/sections/About.tsx` | Split-layout about with photo (server) |
| `singam-web/components/sections/Philosophy.tsx` | 4-principle 2×2 grid (server) |
| `singam-web/components/sections/Pricing.tsx` | Plans + monthly/annual toggle (client) |
| `singam-web/components/sections/Contact.tsx` | Contact form calling Server Action (client) |
| `singam-web/components/RevealWrapper.tsx` | IntersectionObserver scroll reveal (client) |
| `singam-web/lib/utils.ts` | `cn()` helper |
| `singam-web/public/assets/singam-academy.webp` | Copied from source prototype |

---

### Task 1: Scaffold project

**Files:**
- Create: `singam-web/` (entire project)

- [ ] **Step 1: Run create-next-app from the singam root**

```bash
cd /home/joe/App/singam
npx create-next-app@latest singam-web \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias="@/*"
cd singam-web
```

Expected: `singam-web/` created with Next.js 15, TypeScript, Tailwind v3, App Router.

- [ ] **Step 2: Init ShadCN UI**

```bash
npx shadcn@latest init --defaults
```

Accept all defaults (style: Default, base color: Neutral, CSS variables: Yes).

- [ ] **Step 3: Add required ShadCN components**

```bash
npx shadcn@latest add button input select textarea label
```

- [ ] **Step 4: Copy image asset**

```bash
mkdir -p public/assets
cp ../singam/assets/singam-academy.webp public/assets/
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: Default Next.js page at http://localhost:3000 with no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 + Tailwind + ShadCN"
```

---

### Task 2: Tailwind brand tokens

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace tailwind.config.ts**

```typescript
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#e6122b",
          2: "#ff2a3c",
        },
        bg: {
          DEFAULT: "#000000",
          2: "#0b0b0b",
        },
        fg: "#ffffff",
        muted: "#a6a6a6",
        faint: "#6e6e6e",
        line: {
          DEFAULT: "rgba(255,255,255,0.14)",
          2: "rgba(255,255,255,0.08)",
        },
        ink: "#0a0500",
        // Keep ShadCN required tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        body: ["var(--font-archivo)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      maxWidth: {
        site: "1280px",
      },
      keyframes: {
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

- [ ] **Step 2: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: add Singam brand tokens to Tailwind config"
```

---

### Task 3: Global CSS + fonts + root layout

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* ShadCN required CSS vars — mapped to brand */
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    --border: 0 0% 14%;
    --input: 0 0% 11%;
    --ring: 354 86% 49%;
    --radius: 0rem;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: #000000;
    color: #ffffff;
    font-family: var(--font-archivo), Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    line-height: 1.5;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}

@layer utilities {
  /* Shared max-width container */
  .wrap {
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 36px;
    padding-right: 36px;
  }

  /* Eyebrow label style */
  .eyebrow {
    font-size: 12px;
    letter-spacing: 0.34em;
    text-transform: uppercase;
    color: #e6122b;
    font-weight: 700;
  }

  /* Outline text (hero "Finishing") */
  .text-stroke-white {
    color: transparent;
    -webkit-text-stroke: 2px #ffffff;
  }

  /* Striped placeholder background */
  .ph-bg {
    background:
      repeating-linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.025) 0 14px,
        transparent 14px 28px
      ),
      #0b0b0b;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
}

/* Respect reduced motion for marquee */
@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation: none !important;
  }
}
```

- [ ] **Step 2: Replace app/layout.tsx**

```tsx
import type { Metadata } from "next"
import { Anton, Archivo } from "next/font/google"
import "./globals.css"

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
})

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Singam Ironman Academy — Marathon & Ironman Coaching",
  description:
    "Marathon & Ironman coaching from Singam's Marathon Village — running, cycling, swimming, strength and recovery, engineered to put you on the start line ready and across the line proud.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${anton.variable} ${archivo.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Verify build compiles**

```bash
npm run build
```

Expected: Build succeeds (no type errors, no missing module errors). The page will be empty — that's fine at this stage.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: global CSS, brand tokens, Anton + Archivo fonts via next/font"
```

---

### Task 4: Utility + RevealWrapper

**Files:**
- Modify: `lib/utils.ts`
- Create: `components/RevealWrapper.tsx`

- [ ] **Step 1: Ensure lib/utils.ts exports cn()**

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 2: Create components/RevealWrapper.tsx**

```tsx
"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function RevealWrapper({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || !("IntersectionObserver" in window)) return

    const vh = window.innerHeight
    // Already in viewport — leave visible
    if (el.getBoundingClientRect().top <= vh * 0.92) return

    setRevealed(false)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    )

    observer.observe(el)
    // Failsafe: never leave content permanently hidden
    const timer = setTimeout(() => setRevealed(true), 2500)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,.61,.36,1)]",
        "motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100",
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]",
        className
      )}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/utils.ts components/RevealWrapper.tsx
git commit -m "feat: cn() utility and RevealWrapper (IntersectionObserver scroll reveal)"
```

---

### Task 5: Header

**Files:**
- Create: `components/layout/Header.tsx`

- [ ] **Step 1: Create components/layout/Header.tsx**

```tsx
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
          "backdrop-blur-[16px]",
          "[backdrop-filter:blur(16px)_saturate(140%)]",
        ]
      )}
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
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Header.tsx
git commit -m "feat: Header — sticky nav with scroll-blur effect"
```

---

### Task 6: Footer

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create components/layout/Footer.tsx**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: Footer — address, nav links, red top border"
```

---

### Task 7: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create components/sections/Hero.tsx**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: Hero — full-height, outline text, dual gradient, CTAs"
```

---

### Task 8: Marquee section

**Files:**
- Create: `components/sections/Marquee.tsx`

- [ ] **Step 1: Create components/sections/Marquee.tsx**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Marquee.tsx
git commit -m "feat: Marquee — infinite scrolling ticker with red bg"
```

---

### Task 9: About section

**Files:**
- Create: `components/sections/About.tsx`

- [ ] **Step 1: Create components/sections/About.tsx**

```tsx
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
              src="/assets/singam-academy.webp"
              alt="Singam Marathon Village, Sivagangai"
              fill
              className="object-cover"
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
                Singam
              </b>
              <span className="text-[12px] font-bold tracking-[0.1em] uppercase text-muted">
                Marathon Village · Sivagangai, TN
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat: About — split layout with image, caption, credential chips"
```

---

### Task 10: Philosophy section

**Files:**
- Create: `components/sections/Philosophy.tsx`

- [ ] **Step 1: Create components/sections/Philosophy.tsx**

```tsx
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

        {/* 2×2 grid — 1px gap achieved via background on parent */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 mt-[60px]"
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Philosophy.tsx
git commit -m "feat: Philosophy — 2×2 principle grid with outline numbers"
```

---

### Task 11: Pricing section

**Files:**
- Create: `components/sections/Pricing.tsx`

- [ ] **Step 1: Create components/sections/Pricing.tsx**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Pricing.tsx
git commit -m "feat: Pricing — 3-plan grid with monthly/annual toggle"
```

---

### Task 12: Server Action + Contact section

**Files:**
- Create: `app/actions/contact.ts`
- Create: `components/sections/Contact.tsx`

- [ ] **Step 1: Create app/actions/contact.ts**

```typescript
"use server"

export type ContactResult =
  | { success: true }
  | { success: false; error: string }

export async function submitContact(
  formData: FormData
): Promise<ContactResult> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const goal = String(formData.get("goal") ?? "").trim()
  const msg = String(formData.get("msg") ?? "").trim()

  if (!name) {
    return { success: false, error: "Name is required." }
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "A valid email address is required." }
  }

  // Wire an email service here when ready, e.g.:
  // await resend.emails.send({ from: "...", to: "hello@singamacademy.com",
  //   subject: `New enquiry from ${name}`, text: `Goal: ${goal}\n\n${msg}` })

  console.log("Contact form submission:", { name, email, goal, msg })

  return { success: true }
}
```

- [ ] **Step 2: Create components/sections/Contact.tsx**

```tsx
"use client"

import { useState } from "react"
import { submitContact, type ContactResult } from "@/app/actions/contact"
import { RevealWrapper } from "@/components/RevealWrapper"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const GOALS = [
  "First marathon",
  "Marathon PR / Boston qualifier",
  "First Ironman / 70.3",
  "Ironman PR / Kona qualifier",
  "Getting back into endurance",
]

const chips = ["hello@singamacademy.com", "Sivagangai · Worldwide (remote)"]

export function Contact() {
  const [result, setResult] = useState<ContactResult | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    const data = new FormData(e.currentTarget)
    const res = await submitContact(data)
    setResult(res)
    setPending(false)
  }

  const sent = result?.success === true

  return (
    <section id="contact" className="py-[130px]">
      <div className="wrap">
        <div className="grid grid-cols-1 min-[820px]:grid-cols-2 gap-[70px] items-center">

          {/* Copy */}
          <RevealWrapper>
            <p className="eyebrow">Start the conversation</p>
            <h2
              className="font-display mt-4"
              style={{ fontSize: "clamp(40px, 5.5vw, 72px)", lineHeight: 0.88 }}
            >
              Find your
              <br />
              finish line.
            </h2>
            <p className="text-muted text-[17px] mt-[22px] max-w-[420px]">
              Tell us your race and timeline. We&apos;ll send a free plan
              recommendation and book a 20-minute call — no pressure, no spam.
            </p>
            <div className="flex flex-wrap gap-[10px] mt-7">
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

          {/* Form */}
          <RevealWrapper delay={70}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[14px]"
              noValidate
            >
              {/* Full name */}
              <div className="flex flex-col gap-[7px]">
                <Label className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
                  Full name
                </Label>
                <Input
                  name="name"
                  placeholder="Your name"
                  required
                  disabled={sent}
                  className="bg-bg-2 border-line text-fg placeholder:text-faint text-[15px] h-auto px-4 py-[15px] rounded-none focus-visible:ring-0 focus-visible:border-accent"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-[7px]">
                <Label className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  required
                  disabled={sent}
                  className="bg-bg-2 border-line text-fg placeholder:text-faint text-[15px] h-auto px-4 py-[15px] rounded-none focus-visible:ring-0 focus-visible:border-accent"
                />
              </div>

              {/* Training goal */}
              <div className="flex flex-col gap-[7px]">
                <Label className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
                  What are you training for?
                </Label>
                <Select name="goal" defaultValue={GOALS[0]} disabled={sent}>
                  <SelectTrigger className="bg-bg-2 border-line text-fg text-[15px] h-auto py-[15px] rounded-none focus:ring-0 focus:ring-offset-0 focus:border-accent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-bg-2 border-line rounded-none">
                    {GOALS.map((g) => (
                      <SelectItem
                        key={g}
                        value={g}
                        className="text-fg focus:bg-bg focus:text-accent"
                      >
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-[7px]">
                <Label className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
                  Anything we should know? (optional)
                </Label>
                <Textarea
                  name="msg"
                  rows={3}
                  placeholder="Race date, current weekly volume, injuries…"
                  disabled={sent}
                  className="bg-bg-2 border-line text-fg placeholder:text-faint text-[15px] px-4 py-[15px] rounded-none resize-none focus-visible:ring-0 focus-visible:border-accent"
                />
              </div>

              <button
                type="submit"
                disabled={pending || sent}
                className={cn(
                  "mt-1.5 inline-flex items-center justify-center",
                  "bg-accent text-ink text-[14px] font-extrabold uppercase tracking-[0.08em]",
                  "px-[34px] py-[18px] border-2 border-transparent",
                  "transition-all duration-200",
                  "hover:bg-fg hover:text-black hover:-translate-y-0.5",
                  "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                )}
              >
                {sent ? "Sent ✓" : pending ? "Sending…" : "Send & book my call"}
              </button>

              <p className="text-[12px] text-faint uppercase tracking-[0.06em]">
                We reply within one business day.
              </p>

              {sent && (
                <p className="text-accent text-[14px] font-bold">
                  ✓ Request received — check your inbox shortly.
                </p>
              )}
              {result && !result.success && (
                <p className="text-accent text-[14px] font-bold">
                  {result.error}
                </p>
              )}
            </form>
          </RevealWrapper>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/actions/contact.ts components/sections/Contact.tsx
git commit -m "feat: Contact section + Server Action (validation, extensible for email)"
```

---

### Task 13: Assemble page + production build

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx**

```tsx
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { Marquee } from "@/components/sections/Marquee"
import { About } from "@/components/sections/About"
import { Philosophy } from "@/components/sections/Philosophy"
import { Pricing } from "@/components/sections/Pricing"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <About />
        <Philosophy />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Start dev server and do visual QA**

```bash
npm run dev
```

Open http://localhost:3000 and check against `../singam/Singam\ Ironman\ Academy.html` (open both in browser side by side).

**QA checklist:**
- [ ] Header transparent on load → blurs + border appears on scroll > 20px
- [ ] Brand triangle mark (red, clip-path) visible in header and footer
- [ ] Desktop nav links hidden below 860px viewport width
- [ ] Hero: full viewport height, content at bottom-left, outline text on "Finishing", red italic on "temporary."
- [ ] Hero: gradient fades (left-to-right + bottom-to-top) visible over placeholder bg
- [ ] Marquee: red background, Anton text, scrolling left, "✦" dividers, stops if `prefers-reduced-motion`
- [ ] About: photo on left with caption overlay, copy on right, credential chips
- [ ] Philosophy: 2×2 grid, 1px gap borders, outline stroke numbers, hover changes cell bg
- [ ] Pricing: square toggle (not pill), "MOST POPULAR" red banner on middle plan, prices update when toggling monthly/annual
- [ ] Contact: two-column layout, ShadCN form fields, submit → success message, error shown for missing name/email
- [ ] Footer: 2px red top border, address, nav links, copyright
- [ ] Scroll reveal: elements below fold start hidden, fade+slide in on scroll

- [ ] **Step 3: Production build**

```bash
npm run build
```

Expected: Exit 0, no TypeScript errors, no ESLint errors.

- [ ] **Step 4: Final commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble homepage — Singam Ironman Academy complete"
```
