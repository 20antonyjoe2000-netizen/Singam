# Singam Ironman Academy — Next.js 15 Port

**Date:** 2026-06-06  
**Source:** `/home/joe/App/singam/singam/` HTML prototypes  
**Design direction:** Direction B / Main site (Nike Bold — Singam red `#e6122b`)

---

## Goal

Convert the existing single-file HTML prototype into a production-ready Next.js 15 TypeScript project using Tailwind CSS and ShadCN UI. Visual and functional parity with the prototype is required.

---

## Architecture

**Framework:** Next.js 15, App Router, TypeScript  
**Styling:** Tailwind CSS v4 with custom brand tokens  
**UI primitives:** ShadCN UI (Button, Input, Select, Textarea, Label)  
**Fonts:** `next/font/google` — Anton (display), Archivo (body)

```
singam-web/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx
│   └── actions/
│       └── contact.ts        # Server Action
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # fixed sticky nav, scroll-blur
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── Marquee.tsx
│       ├── About.tsx
│       ├── Philosophy.tsx
│       ├── Pricing.tsx       # "use client" — monthly/annual toggle
│       └── Contact.tsx       # "use client" — form + Server Action
├── hooks/
│   └── useReveal.ts          # IntersectionObserver scroll reveal
├── lib/
│   └── utils.ts              # cn() helper
├── public/
│   └── assets/               # existing images (singam-academy.webp etc)
└── tailwind.config.ts
```

---

## Components

### Header
- Fixed position, transparent by default
- On scroll > 20px: `rgba(0,0,0,0.82)` bg + `backdrop-blur` + bottom border
- Brand: triangle clip-path mark + "SINGAM" in Anton
- Nav links: Coach, Approach, Plans, Contact
- CTA: "Start Training" primary button
- Mobile: nav links hidden < 860px

### Hero
- Full-viewport-height, content aligned bottom-left
- Background: placeholder div (striped pattern) with dual gradient overlay (horizontal fade left + vertical fade bottom)
- Red bar + eyebrow line
- H1 in Anton: "Pain is / *temporary.* / ~~Finishing~~ isn't." (italic = red, stroke = outline text)
- Lede paragraph (muted)
- Two CTAs: "See the plans" (primary) + "Book a free call" (outline)

### Marquee
- Red top/bottom border, red background
- Scrolling track: "Running ✦ Cycling ✦ Swimming ✦ Strength ✦ Ice Bath ✦ Sauna" × 2
- Anton font, dark ink color text
- `animation: scroll 32s linear infinite` — respects `prefers-reduced-motion`

### About
- `bg-bg-2` with top/bottom borders
- Two-column grid: photo left (real image `assets/singam-academy.webp`), copy right
- Photo has absolute caption: "Singam / Marathon Village · Sivagangai, TN"
- Copy: eyebrow, H2 "Where lions are made.", two paragraphs, credential chips

### Philosophy
- Four principle cards in a 2×2 grid (1px gap, shared border)
- Each card: outline number (Anton, stroke-only), H4, paragraph
- Cards fill black bg, hover to `bg-2`

### Pricing
- `"use client"` — monthly/annual toggle controls displayed prices
- Monthly/Annual toggle: square (not pill) buttons, active = red bg
- Three-column plan grid (1px gap):
  - Self-Guided: $49/$39
  - 1-on-1 (featured, "MOST POPULAR" red banner): $199/$159
  - Squad: $89/$71
- Each plan: tag, price in Anton, description, feature list with red checkmarks, CTA button
- Note below grid about on-site camps

### Contact
- Two-column: left = copy (eyebrow, H2, paragraph, chips), right = form
- Form fields: Full name, Email, Training goal (select), Notes (textarea)
- Submit via Server Action → returns `{success: boolean, error?: string}`
- On success: show success message, disable submit button
- ShadCN Input/Select/Textarea/Label used for form fields

### Footer
- Red top border (2px)
- Four-column flex: brand mark, address, nav links, copyright

---

## Data Flow

1. User fills contact form → `handleSubmit` calls Server Action `submitContact(formData)`
2. Server Action validates (name required, email required + valid format)
3. Returns `{success: true}` or `{success: false, error: string}`
4. Client shows success state or validation error
5. (Future: wire email service in `contact.ts` — single file change)

---

## Scroll Reveal

`useReveal(ref)` hook:
- Uses IntersectionObserver (threshold 0.08)
- Elements below fold start `opacity-0 translate-y-[30px]`
- On intersect: transition to `opacity-100 translate-y-0`
- Failsafe: remove hidden state after 2500ms
- Respects `prefers-reduced-motion`

---

## Tailwind Brand Tokens

```ts
// tailwind.config.ts
colors: {
  accent: '#e6122b',
  'accent-2': '#ff2a3c',
  bg: { DEFAULT: '#000000', 2: '#0b0b0b' },
  fg: '#ffffff',
  muted: '#a6a6a6',
  faint: '#6e6e6e',
  line: { DEFAULT: 'rgba(255,255,255,0.14)', 2: 'rgba(255,255,255,0.08)' },
}
```

---

## Error Handling

- Contact form: client-side required validation via HTML5 + server-side re-validation in action
- Images: `next/image` with explicit width/height, fallback placeholder div if image absent
- All `"use client"` components wrapped in error boundaries where practical

---

## Testing

No automated tests in scope for this port. Visual QA against the HTML prototype is the acceptance criterion.

---

## Out of Scope

- Tweaks panel (prototype-only tool)
- Direction A / Apple Minimal variant
- index.html showcase page
- CMS / content management
- Authentication
