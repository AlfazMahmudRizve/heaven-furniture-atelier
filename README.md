# 🏛️ Heaven Furniture Atelier — Luxury Web Experience

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.1-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Lenis Scroll](https://img.shields.io/badge/Lenis_Scroll-Smooth-111111?style=for-the-badge)](https://lenis.darkroom.engineering/)
[![Vitest](https://img.shields.io/badge/Vitest-27_Tests_Passing-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> An award-winning, editorial luxury web experience showcasing architectural design, fluid motion choreography, bespoke interactive product configurators, and quiet-luxury typography. Built and designed by **Alfaz Mahmud Rizve**.

---

## 🎨 Design Philosophy & Concept

This project explores the intersection of **high-end architectural design**, **editorial print typography**, and **modern interactive web engineering**:

- **Warm Linen × Deep Espresso Dual-Tone Palette**:
  - Primary Linen (`#FBF0DA` / `#D6CBBC`): Evoking raw travertine marble, linen fabric, and warm daylight.
  - Deep Espresso (`#1E1005` / `#332820`): Grounded in seasoned timber heartwood and dark bronze.
  - Accent Bronze Gold (`#9C7443` / `#C5A073`): Refined highlights and subtle glowing accents.
- **Micro-Interactions & Motion Choreography**:
  - **Animated Line Dividers**: Precision architectural line-drawing animations (`scaleX` interpolation on viewport entry).
  - **Creative Underline Links & Bottom-Fill Buttons**: Smooth hover transitions with cubic-bezier easing.
  - **Rotating Text & Staggered Reveals**: Masked typography reveals inspired by luxury design studios.

---

## 🌟 Key Features

### 1. Fullscreen Split-Screen Overlay Navigation
- Interactive floating glass header with scroll-aware hide/reveal states and backdrop blur.
- Fullscreen split overlay menu:
  - **Left Panel (Linen)**: Numbered navigation links with interactive hover backgrounds and bronze accent bars.
  - **Right Panel (Espresso)**: Atelier contact information, location, and social links.

### 2. Cinematic Editorial Hero
- Slow-motion Ken Burns zoom interpolation tied to scroll progress.
- Staggered typography reveals with smooth alpha and vertical transforms.
- Animated diagonal `Explore ↗` callout.

### 3. Dedicated Full-Bleed Product Showcase Suites
- Alternating dark (`#1E1005`) and light (`#FBF0DA`) rhythm across 5 dedicated product chapters:
  - **Suite 01 · Sovereign Burma Teak Sectional** (Living Room Atelier)
  - **Suite 02 · Imperial Fluted Platform Bed** (Master Bedroom Suite)
  - **Suite 03 · Grand Heritage Sintered Stone Suite** (Royal Dining Hall)
  - **Suite 04 · Presidential Sanctum Desk** (Executive Study Suite)
  - **Suite 05 · 100% Custom Residence Blueprint** (Bespoke Atelier)
- Parallax image scrolling depth and structured architectural specification strips.

### 4. Interactive Bespoke Studio Configurator
- Real-time furniture customization engine allowing users to configure room type, timber species, luxury fabric choices, and dimensional sliders.
- Generates dynamic, structured inquiry payloads with pre-filled specifications.

### 5. Architectural Project Lookbook Grid
- 2-column showcase with real-time status badges (*In Development*, *Current Project*, *Bespoke Commission*) and hover-zoom photography.

---

## 🛠️ Technology Stack & Architecture

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | **React 19** + **Vite 8** | Modern concurrent rendering, fast hydration, and instant HMR |
| **Styling** | **Tailwind CSS 4** | Ultra-performant `@theme` CSS custom properties and zero-runtime footprint |
| **Animation** | **Framer Motion 13** | Hardware-accelerated transitions, viewport triggers, and spring physics |
| **Smooth Scroll** | **Lenis** | Momentum-based inertial scrolling with 60fps smoothness |
| **Testing** | **Vitest 4** + **Happy DOM** | 27 / 27 unit & integration tests covering data integrity and utility helpers |
| **Icons** | **Lucide React** | Feather-light SVG iconography |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (recommended: 20.18+ or 22+)
- npm 10+

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AlfazMahmudRizve/heaven-furniture-atelier.git
   cd heaven-furniture-atelier
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Run the automated test suite**:
   ```bash
   npm test
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```
   Optimized static bundle generated in `dist/` (~383 KB).

---

## 👨‍💻 Author

**Alfaz Mahmud Rizve**
- GitHub: [@AlfazMahmudRizve](https://github.com/AlfazMahmudRizve)
- Project Repository: [heaven-furniture-atelier](https://github.com/AlfazMahmudRizve/heaven-furniture-atelier)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
