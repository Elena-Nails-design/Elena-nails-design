# 💅 Elena Nails - Premium Nail Art Studio Ecosystem

[![Deploy to Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://elenanails.beauty/)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20TailwindCSS-blue?style=for-the-badge)](https://github.com/Elena-Nails-design/Elena-nails-design)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-orange?style=for-the-badge&logo=github-actions)](https://github.com/Elena-Nails-design/Elena-nails-design/actions)

---

## 🇮🇱 שלום וברוכים הבאים ל-Elena Nails
פרויקט זה מייצג פתרון טכנולוגי מתקדם עבור סטודיו לעיצוב ציפורניים ופדיקור רפואי (פודולוגיה). האתר משלב עיצוב יוקרתי, חווית המרה חלקה דרך וואטסאפ, ואופטימיזציה מלאה למנועי חיפוש ולרשתות חברתיות.

---

## 🌟 The Vision
**Elena Nails** is a highly optimized, ultra-premium digital experience designed for high-end local clientele. Built with a "Customer-First" philosophy, the platform guarantees that every interaction—from the seamless localized interface to the final WhatsApp booking flow—feels luxurious, intuitive, and frictionless.

## 🚀 Key Achievements & Features

### 💎 Frontend Excellence & UI/UX
- **Ultra-Modern UI:** A sleek, responsive Single Page Application (SPA) built with **React 19** and **Vite**, featuring glassmorphism effects and dynamic **Framer Motion** transitions.
- **Smart Booking System:** An intuitive calendar-based booking flow utilizing `react-datepicker`. Features include:
  - Smart prevention of weekend (Saturday) bookings.
  - Automatic timezone synchronization.
  - **Frictionless Conversion:** Instantly routes users directly to WhatsApp with a pre-filled, localized appointment request.
- **Cross-Platform Resilience:** Built-in safeguards for Social Media In-App Browsers (WebView). Implements robust fallback mechanisms if native Clipboard APIs are blocked by Instagram/Facebook.

### 🌍 Global & Local Accessibility
- **Full Trilingual Localization (i18n):** Complete semantic translation across Hebrew (RTL), Russian, and English. The calendar UI natively matches the user's selected language.
- **Premium Copywriting:** Tailored messaging positioning the brand as a top-tier "Podiatry" (Medical Pedicure) and Clinical-Grade sterilization salon.
- **Accessibility (a11y):** High-contrast modes, scalable typography, and native dark/light mode integration using Tailwind CSS.

### 🔎 Technical & Local SEO
- **Discoverability:** Dynamic injection of hidden `H1` tags localized per language to capture high-intent local searches (e.g., "Medical Pedicure Ashdod").
- **Google Maps Integration:** Direct geographic routing built into the footer and booking forms for immediate local navigation.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 19, Vite | High-performance component rendering and fast builds |
| **Styling** | Tailwind CSS v4 | Utility-first, highly responsive, native Dark Mode |
| **Localization** | react-i18next | Trilingual support (HE, RU, EN) |
| **Animations** | Framer Motion | Fluid DOM transitions and interactive micro-animations |
| **Date Logic** | react-datepicker, date-fns | Complex calendar routing and localized time slots |
| **Icons** | Lucide React | Clean, scalable vector graphics |
| **Deployment** | Vercel | Global edge-network hosting |

---

## 🏗️ DevOps & CI/CD Pipeline

The project utilizes a professional-grade continuous integration workflow:

### 🔄 Continuous Integration (GitHub)
- **Version Control:** All features strictly branch from and merge to `main`.
- **Atomic Commits:** Standardized semantic commit messages for tracking features, UI fixes, and SEO patches.

### 🚀 Continuous Deployment (Vercel)
The production environment is hosted on **Vercel**, providing:
- **Edge Delivery:** Sub-second load times globally.
- **Zero-Downtime Deploys:** Pushes to the `main` branch automatically deploy to production.

---

## 📂 Project Structure

```bash
Elena-nails-design/
├── frontend/               # The entire SPA
│   ├── src/                
│   │   ├── components/     # Reusable UI (Navigation, Footer, SEO)
│   │   ├── locales/        # JSON translations (he.json, ru.json, en.json)
│   │   ├── pages/          # Full page views (Booking.jsx, Home.jsx)
│   │   ├── index.css       # Global Tailwind & Z-index overrides
│   │   └── App.jsx         # Router & Theme Context Provider
│   ├── package.json        
│   └── vite.config.js      # Build configurations
└── README.md
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm / yarn

### Installation
1. **Clone the repo:**
   ```bash
   git clone https://github.com/Elena-Nails-design/Elena-nails-design.git
   ```
2. **Setup Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev # Runs the local development server at http://localhost:5173
   ```
3. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 🤝 Developed By
Created with ❤️ for **Elena Nails Design**. This project represents the pinnacle of combining luxury aesthetic design with bulletproof React frontend architecture.

---
**[Visit the Live Site](https://elenanails.beauty/)**
