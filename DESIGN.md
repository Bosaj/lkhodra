# Design System: LKHODRA (الخضرة والغلة) — Nocturnal Moroccan Oasis & Bio-Apothecary OS

## 1. Visual Theme & Atmosphere
An ultra-luxury **Nocturnal Moroccan Oasis & Bioluminescent Bio-Apothecary** dark-mode interface (`#050b07` / `#0a140e`) engineered for trilingual Arabic/Darija, French, and English legibility, zero text overlapping, and responsive Bento chronology.

## 2. Color Palette & Roles
- **Deep Oasis Obsidian (`#050b07`)** — Primary dark canvas background with subtle emerald/saffron radial illumination
- **Elevated Apothecary Surface (`#0a140e` / `#07120c`)** — Primary specimen plate, chronobiology stage, and modal container fill
- **Bioluminescent Chlorophyll (`#10b981` / `#34d399`)** — Primary interactive accent, active season/organ indicators, and peak harvest badges
- **Taliouine Saffron Gold (`#f59e0b` / `#fbbf24`)** — Secondary semantic accent for weekly organ schedules, IGP terroir stamps, and ORAC scores
- **Alabaster Mint Ink (`#f0f7f2`)** — Primary high-contrast text
- **Sage Mist (`#a7bfb0`)** — Secondary clinical descriptions and metadata

## 3. Multilingual Typography & Arabic Ligature Protection
- **Arabic / Darija (`[dir="rtl"]`):** `Cairo`, `Tajawal`, `Readex Pro` — with strict `letter-spacing: 0 !important` and OpenType `kern`/`liga`/`calt` enabled globally so Arabic letters never disconnect or collide.
- **Latin Display (`Syne` / `Fraunces`) & UI Sans (`Outfit`):** High-contrast geometric display and body legibility.
- **Numeric Telemetry (`JetBrains Mono` + `Cairo` fallback):** Tabular numbers for GI, ORAC, and Souk prices (`MAD/kg`).

## 4. Responsive Zero-Overlap Component Architecture
- **Stacked Organ & Week Prescription Box (`ProduceCard.tsx`):** The seasonal week badge (`الأسبوع 1–4`), vulnerable organ title, and clinical explanation are vertically stacked in dedicated full-width rows with `break-words` so long Arabic/French strings never collide or overflow horizontally.
- **Interactive 3-Angle Thumbnail Switcher:** Displays miniature previews + labels (`1. الثمرة`, `2. المقطع`, `3. التيروار`) directly on the specimen photo frame.
- **Full-Width 4-Season Organ Chronobiology Stage (`App.tsx`):** Interactive 4-season selector paired with a 12-column split view (5 columns for Vulnerable Organs + 7 columns for the 4-Week Organ Recovery Schedule).
