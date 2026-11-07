# LKHODRA (الخضرة والغلة) — The Moroccan & World Fruits, Vegetables, Seasons & Organ Chronobiology Encyclopedia

<div align="center">

[![CI Pipeline](https://github.com/Bosaj/lkhodra/actions/workflows/ci.yml/badge.svg)](https://github.com/Bosaj/lkhodra/actions/workflows/ci.yml)
[![CodeQL Security](https://github.com/Bosaj/lkhodra/actions/workflows/codeql.yml/badge.svg)](https://github.com/Bosaj/lkhodra/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-cyan.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-10b981.svg)](https://tailwindcss.com/)
[![Author: Oussama EL HADJI](https://img.shields.io/badge/Author-Oussama_EL_HADJI-10b981.svg)](https://github.com/Bosaj)
[![Version: 2.0.0](https://img.shields.io/badge/version-2.0.0-amber.svg)](https://github.com/Bosaj/lkhodra)

**The definitive trilingual (Arabic/Darija, French, English) encyclopedia of Moroccan & global fruits, vegetables, tubers, legumes, and medicinal herbs — featuring 12-month & 4-season organ chronobiology, 4-week organ recovery schedules, IGP/AOP terroir mapping, and wholesale souk telemetry.**

[🚀 Live Demo](https://bosaj.github.io/lkhodra/) • [🐛 Report Issue](https://github.com/Bosaj/lkhodra/issues/new/choose) • [🌊 Sister Project: L7OT (الحوت)](https://github.com/Bosaj/l7ot)

</div>

---

## 🌿 Overview

**LKHODRA (الخضرة والغلة)** is an open-source botanical, nutritional, and chronobiological web platform documenting **78+ Moroccan and global fruits, vegetables, tubers, legumes, berries, exotic fruits, and culinary herbs** across all **12 agricultural regions of Morocco** and global markets.

Every season and every month (`يناير` January through `دجنبر` December) places specific physiological demands on human organs (lungs, liver, heart, kidneys, stomach/colon, brain, retina/skin, bones/joints, and blood/iron reserves) while simultaneously ripening the exact fruits and vegetables required to restore them week by week.

---

## ✨ Key Features

### 1. 🍎 78+ Moroccan & World Fruits, Vegetables, Tubers, Legumes & Herbs
- **Authentic Trilingual Taxonomy:** Every specimen includes Moroccan Darija (Arabic & Latin script), Amazigh (Tamazight/Tarifit/Tashelhit), French, English, and official scientific binomial nomenclature.
- **Regional Moroccan Dialect Matrix:** Compare names across **Oriental** (*Berkane, Oujda, Nador*), **Chamal** (*Tangier, Tetouan, Chefchaouen, Larache*), **Centre** (*Casablanca, Rabat, Fès, Meknès, Marrakech, Doukkala*), and **Sud** (*Agadir, Chtouka, Tafilalet, Zagora*).
- **Real Multi-Angle Botanical Photography:** Locally cached Wikimedia Commons photographs with interactive 3-angle specimen switchers (`1. Whole Specimen`, `2. Cross-Section`, `3. Terroir & Culinary`).

### 2. 🫀 4-Season & 12-Month Organ Chronobiology + 4-Week Recovery Engine
- **4 Moroccan Seasons (`الشتاء Lyali`, `الربيع Bakor`, `الصيف Smayem`, `الخريف Autumn`):** Identifies which organs become vulnerable in each season, why climate shifts affect them, and what bioactive compounds they require.
- **12-Month Solar & Agricultural Organ Atlas (`يناير` – `دجنبر`):** Month-by-month breakdown of Moroccan agricultural milestones (*Yennayer*, *Hassouma*, *Nissan*, *Ansra*, *Smayem*, *Lyali*), stressed organs in each month, and a **4-Week Organ Recovery Schedule** (`Week 1` to `Week 4`) for every single month and season.
- **Per-Specimen Organ Prescription Stamp:** Every card and modal displays the target weak organ healed in peak season, the recommended week of the season, and the daily clinical dosage.

### 3. 📊 Clinical Nutrition, Glycemic Index (GI) & ORAC Antioxidant Lab
- Full nutritional telemetry per `100g`: Calories, Water %, Glycemic Index (`GI`), Antioxidant ORAC Score, Vitamin C, Vitamin A, Folate, Potassium, Magnesium, Calcium, Iron, and Dietary Fiber.
- **Food Synergy Lab:** Evidence-based pairings (e.g., *Turmeric + Black Pepper + Olive Oil*, *Bakkoula + Preserved Lemon Vitamin C for 3x non-heme iron uptake*).

### 4. 🗺️ 12 Moroccan Agricultural Terroirs & Live Agrometeorological Telemetry
- Interactive atlas covering **Berkane & Moulouya**, **Souss-Massa & Chtouka**, **Gharb & Loukkos**, **Saïss (Meknès-Fès)**, **Midelt & High Atlas**, **Drâa-Tafilalet**, **Doukkala-Abda**, **Tadla & Béni Mellal**, **Haouz Marrakech**, **Taliouine & Anti-Atlas**, **Tangier-Rif**, and **Dakhla**.
- Live weather & soil telemetry powered by Open-Meteo and Open Food Facts integration.

### 5. 🧺 Souk Qoffa Calculator, Head-to-Head Comparator & Traditional Recipes
- **Souk Qoffa (Basket) Estimator:** Calculate weekly family market budgets in `MAD` with one-click WhatsApp/Clipboard export.
- **Head-to-Head Specimen Duel:** Compare any two fruits or vegetables across GI, ORAC, Vitamin C, Fiber, Potassium, and Souk price.
- **Seasonal Moroccan Recipes & Remedies:** Authentic tagines, salads, couscous, and traditional herbal infusions.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript 5, Vite 8
- **Styling & Design System:** TailwindCSS v4 — *Nocturnal Moroccan Oasis & Bioluminescent Bio-Apothecary* dark-mode architecture with zero-overlap RTL/LTR typography (`Cairo`, `Tajawal`, `Syne`, `Outfit`, `Fraunces`, `JetBrains Mono`)
- **PWA & Offline Support:** `vite-plugin-pwa` with Workbox precaching
- **Testing:** Vitest + React Testing Library
- **Deployment:** Docker + Nginx, GitHub Pages, Vercel, Netlify

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit & integration tests
npm run test

# Build for production
npm run build
```

---

## 👤 Author

**Oussama EL HADJI (`@Bosaj`)**
- GitHub: [@Bosaj](https://github.com/Bosaj)
- Email: `oussousselhadji@gmail.com`

## 📄 License

Licensed under the [MIT License](./LICENSE).
