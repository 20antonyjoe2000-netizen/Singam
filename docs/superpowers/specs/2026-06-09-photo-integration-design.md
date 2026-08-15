# Photo Integration Design — Singam Web
Date: 2026-06-09

## Summary

Scatter 5 real photos of coach Sivabalan into existing sections (Hero, About, Philosophy). No new sections. Replaces 2 placeholder jpegs with authentic race photography.

## Photo Assignments

| Section | Source File | Dest Asset | Notes |
|---------|-------------|------------|-------|
| Hero (bg) | `Photo/604344481_..._n.webp` | `public/assets/coach-kolkata.webp` | Tata Steel 25K Kolkata — medal flex, huge smile, Strava data visible |
| About (portrait) | `Photo/Gemini_Generated_Image_2mmdwy2mmdwy2mmd.png` | `public/assets/coach-portrait.png` | Studio portrait, clean white bg |
| Philosophy strip #1 | `Photo/530689059_..._n.webp` | `public/assets/race-kangayam.webp` | Kangayam Marathon finish, smiling flex |
| Philosophy strip #2 | `Photo/563078644_..._n.webp` | `public/assets/race-delhi.webp` | Delhi Half Marathon, intense concentration |
| Philosophy strip #3 | `Photo/581521707_..._n.webp` | `public/assets/race-road.webp` | Road race victory fist, palm tree backdrop |

## Changes Per Component

### Hero.tsx
- Change `src` from `/assets/coach-victory.jpeg` → `/assets/coach-kolkata.webp`
- Update `alt` text to match new photo

### About.tsx
- Change `src` from `/assets/coach-running.jpeg` → `/assets/coach-portrait.png`
- Update `alt` text
- Remove bottom gradient overlay (not needed for portrait — plain bg)
- Keep caption "The Coach / Singam · Marathon & Ironman"

### Philosophy.tsx
- Add 3-photo horizontal strip between heading block and principle grid
- Strip: `grid grid-cols-3`, height `240px`, `gap-[1px]`, same border color as principle grid (`rgba(255,255,255,0.08)`)
- Each cell: `relative overflow-hidden`, `Image fill object-cover`
- Wrap in `RevealWrapper`
- No captions on strip photos

## File Operations
1. `cp` each source photo to `singam-web/public/assets/` with clean name
2. Existing `coach-running.jpeg` and `coach-victory.jpeg` can stay (no delete needed)

## Out of Scope
- `530695276`, `530836487`, `573087803`, `581298331` — not used, remain in `Photo/`
- No new sections
- No lightbox / click interactions
- No lazy-loading changes beyond Next.js defaults
