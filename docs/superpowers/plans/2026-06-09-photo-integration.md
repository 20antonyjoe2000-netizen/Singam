# Photo Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace placeholder jpegs with real race photos of coach Sivabalan and add a 3-photo strip to the Philosophy section.

**Architecture:** Copy 5 photos from `Photo/` to `singam-web/public/assets/` with clean names, then update 3 existing components to reference them. Philosophy gets a new photo strip div above the principles grid.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v3, `next/image`

---

## File Map

| File | Action |
|------|--------|
| `singam-web/public/assets/coach-kolkata.webp` | Create (copy from Photo/) |
| `singam-web/public/assets/coach-portrait.png` | Create (copy from Photo/) |
| `singam-web/public/assets/race-kangayam.webp` | Create (copy from Photo/) |
| `singam-web/public/assets/race-delhi.webp` | Create (copy from Photo/) |
| `singam-web/public/assets/race-road.webp` | Create (copy from Photo/) |
| `singam-web/components/sections/Hero.tsx` | Modify — change `src` + `alt` |
| `singam-web/components/sections/About.tsx` | Modify — change `src` + `alt` |
| `singam-web/components/sections/Philosophy.tsx` | Modify — add photo strip + import Image |

---

## Task 1: Copy photos to public/assets/

**Files:**
- Create: `singam-web/public/assets/coach-kolkata.webp`
- Create: `singam-web/public/assets/coach-portrait.png`
- Create: `singam-web/public/assets/race-kangayam.webp`
- Create: `singam-web/public/assets/race-delhi.webp`
- Create: `singam-web/public/assets/race-road.webp`

- [ ] **Step 1: Copy all 5 photos**

```bash
cp "/home/joe/App/singam/Photo/604344481_18326351719244543_6720992223840369289_n.webp" \
   /home/joe/App/singam/singam-web/public/assets/coach-kolkata.webp

cp "/home/joe/App/singam/Photo/Gemini_Generated_Image_2mmdwy2mmdwy2mmd.png" \
   /home/joe/App/singam/singam-web/public/assets/coach-portrait.png

cp "/home/joe/App/singam/Photo/530689059_18308928670244543_1653518551909257221_n.webp" \
   /home/joe/App/singam/singam-web/public/assets/race-kangayam.webp

cp "/home/joe/App/singam/Photo/563078644_18317029069244543_4058199573077167125_n.webp" \
   /home/joe/App/singam/singam-web/public/assets/race-delhi.webp

cp "/home/joe/App/singam/Photo/581521707_18322985233244543_6081155196061279733_n.webp" \
   /home/joe/App/singam/singam-web/public/assets/race-road.webp
```

- [ ] **Step 2: Verify**

```bash
ls /home/joe/App/singam/singam-web/public/assets/
```

Expected output includes: `coach-kolkata.webp`, `coach-portrait.png`, `race-kangayam.webp`, `race-delhi.webp`, `race-road.webp`

---

## Task 2: Update Hero.tsx

**Files:**
- Modify: `singam-web/components/sections/Hero.tsx` (line 11)

- [ ] **Step 1: Update `src` and `alt` in Hero.tsx**

In `singam-web/components/sections/Hero.tsx`, find:
```tsx
src="/assets/coach-victory.jpeg"
alt="Singam coach celebrating at the finish line"
```

Replace with:
```tsx
src="/assets/coach-kolkata.webp"
alt="Sivabalan flexing with medal at Tata Steel World 25K Kolkata"
```

- [ ] **Step 2: Commit**

```bash
git -C /home/joe/App/singam/singam-web add public/assets/coach-kolkata.webp components/sections/Hero.tsx
git -C /home/joe/App/singam/singam-web commit -m "feat: use real race photo in Hero section"
```

---

## Task 3: Update About.tsx

**Files:**
- Modify: `singam-web/components/sections/About.tsx` (line 24–25)

- [ ] **Step 1: Update `src`, `alt`, and `className` in About.tsx**

In `singam-web/components/sections/About.tsx`, find:
```tsx
src="/assets/coach-running.jpeg"
alt="Singam coach racing"
fill
className="object-cover"
```

Replace with:
```tsx
src="/assets/coach-portrait.png"
alt="Sivabalan Elango — Singam Ironman Academy coach"
fill
className="object-cover object-top"
```

- [ ] **Step 2: Commit**

```bash
git -C /home/joe/App/singam/singam-web add public/assets/coach-portrait.png components/sections/About.tsx
git -C /home/joe/App/singam/singam-web commit -m "feat: use studio portrait in About section"
```

---

## Task 4: Add race photo strip to Philosophy.tsx

**Files:**
- Modify: `singam-web/components/sections/Philosophy.tsx`

The strip goes between the heading block and the principles grid. It uses the same `gap: 1px` + `background: rgba(255,255,255,0.08)` visual trick as the existing grid. `mt-[-1px]` on the principles grid merges the two borders into one clean line.

- [ ] **Step 1: Add `Image` import and `racePhotos` array**

At the top of `singam-web/components/sections/Philosophy.tsx`, add after the existing import:
```tsx
import Image from "next/image"
```

Add this constant after the `principles` array:
```tsx
const racePhotos = [
  { src: "/assets/race-kangayam.webp", alt: "Sivabalan flexing at Kangayam Marathon finish" },
  { src: "/assets/race-delhi.webp", alt: "Sivabalan racing at Vedanta Delhi Half Marathon" },
  { src: "/assets/race-road.webp", alt: "Sivabalan victory fist at road race" },
]
```

- [ ] **Step 2: Add photo strip and fix principle grid margin**

In `singam-web/components/sections/Philosophy.tsx`, find the `{/* 2×2 grid */}` comment block:
```tsx
        {/* 2×2 grid — 1px gap achieved via background on parent */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 mt-[60px]"
          style={{
            gap: "1px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
```

Replace with:
```tsx
        {/* Race photo strip */}
        <div
          className="grid grid-cols-3 mt-[60px]"
          style={{
            gap: "1px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {racePhotos.map((photo) => (
            <RevealWrapper key={photo.src} className="relative h-[240px] overflow-hidden bg-bg">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 33vw"
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
```

- [ ] **Step 3: Commit**

```bash
git -C /home/joe/App/singam/singam-web add public/assets/race-kangayam.webp public/assets/race-delhi.webp public/assets/race-road.webp components/sections/Philosophy.tsx
git -C /home/joe/App/singam/singam-web commit -m "feat: add race photo strip to Philosophy section"
```

---

## Task 5: Verify visually

- [ ] **Step 1: Start dev server**

```bash
cd /home/joe/App/singam/singam-web && npm run dev
```

Expected: server starts on `http://localhost:3000`

- [ ] **Step 2: Check each section**

Open `http://localhost:3000` and verify:
1. **Hero** — Kolkata medal photo fills full-screen background, dual gradient overlay visible, text readable
2. **About** — Studio portrait fills left column, white bg portrait contrasts with dark section, caption "The Coach" visible at bottom
3. **Philosophy** — 3-race-photo strip appears above the 4 principle cards, photos are cropped `object-top`, borders align with principle grid borders below

- [ ] **Step 3: Check mobile (640px breakpoint)**

Resize browser to 640px width and verify:
- Philosophy photo strip: at `grid-cols-3` it stays 3 columns even on mobile — if photos look too compressed, that's acceptable for v1 (can revisit)
- Hero + About look correct on mobile

- [ ] **Step 4: Final commit if any tweaks were needed**

```bash
git -C /home/joe/App/singam/singam-web add -A
git -C /home/joe/App/singam/singam-web commit -m "fix: photo integration visual tweaks"
```
