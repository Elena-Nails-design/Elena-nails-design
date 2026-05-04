# 💅 Elena Nails - Premium Nail Art Studio Ecosystem

[![Deploy to Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://elenanails.beauty/)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node%20%7C%20SQLite-blue?style=for-the-badge)](https://github.com/Elena-Nails-design/Elena-nails-design)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-orange?style=for-the-badge&logo=github-actions)](https://github.com/Elena-Nails-design/Elena-nails-design/actions)

---

## 🇮🇱 שלום וברוכים הבאים ל-Elena Nails
פרויקט זה מייצג פתרון טכנולוגי מקצה לקצה עבור סטודיו לעיצוב ציפורניים, המשלב עיצוב יוקרתי, מערכת הזמנות חכמה ואוטומציה מלאה.

---

## 🌟 The Vision
**Elena Nails** isn't just a website; it's a digital experience designed to bridge the gap between high-end nail artistry and seamless client management. Built with a "Customer-First" philosophy, the platform ensures that every interaction—from the first click to the final booking confirmation—feels premium and professional.

## 🚀 Key Achievements & Features

### 💎 Frontend Excellence
- **Ultra-Modern UI:** A sleek, responsive interface built with **React 18** and **Vite**, featuring glassmorphism effects and smooth transitions.
- **Smart Booking System:** An intuitive calendar-based booking flow that captures client details and service preferences in real-time.
- **AI-Powered Concierge:** Integrated with **Google Gemini AI** to provide 24/7 automated assistance, answering client queries and guiding them through the booking process.
- **Multi-language Support (i18n):** Ready for a global audience with built-in internationalization.

### ⚙️ Robust Backend & Automation
- **Real-time API:** A custom **Node.js/Express** server managing a secure **SQLite** database for lightning-fast data retrieval.
- **Automated SMS Notification System:** A built-in logic that simulates (and is ready for) real-time SMS alerts for both the admin and the client upon booking confirmation.
- **Admin Command Center:** Secure endpoints to manage, confirm, and update booking statuses.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React, Vite, CSS3 | Performance-driven, high-fidelity UI |
| **Backend** | Node.js, Express | Scalable API & Business logic |
| **Database** | SQLite | Lightweight, reliable data persistence |
| **AI** | Google Gemini API | Intelligent customer engagement |
| **CI/CD** | GitHub Actions | Automated build and test pipelines |
| **Deployment** | Vercel | Global edge-network hosting |

---

## 🏗️ DevOps & CI/CD Pipeline (The "Magic" Behind the Scenes)

We've implemented a professional-grade DevOps workflow to ensure the project is always online, secure, and up-to-date.

### 🔄 Continuous Integration (GitHub Actions)
Our custom `.github/workflows/deploy.yml` automates the heavy lifting:
- **Automatic Builds:** Every push to `main` triggers a fresh build to catch errors early.
- **Security Scans:** Ensures secrets like `VITE_GEMINI_API_KEY` are handled securely via GitHub Secrets.
- **Artifact Management:** Packages the production-ready code for distribution.

### 🚀 Continuous Deployment (Vercel)
The production environment is hosted on **Vercel**, providing:
- **Edge Delivery:** Sub-second load times globally.
- **Zero-Downtime Deploys:** New features are rolled out instantly without interrupting users.
- **Preview Deployments:** Every Pull Request generates a unique staging URL for testing.

---

## 📂 Project Structure

```bash
.
├── .github/workflows/    # CI/CD Pipeline definitions
├── backend/              # Node.js Server & SQLite Database
│   ├── server.js         # Core API Logic & SMS Simulator
│   └── database.sqlite   # Local storage
└── frontend/             # React Application
    ├── src/              # Source code (Components, Pages, Hooks)
    ├── public/           # Static assets
    └── vite.config.js    # Optimized build configuration
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
2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   npm start # Runs on http://localhost:5000
   ```
3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   # Add your VITE_GEMINI_API_KEY to .env
   npm run dev # Runs on http://localhost:5173
   ```

---

## 📈 Future Roadmap
- [ ] Integration with Twilio for real-time SMS.
- [ ] Payment gateway integration (Stripe/PayPal).
- [ ] Advanced analytics dashboard for the owner.
- [ ] Native mobile app using React Native.

---

## 🤝 Developed By
Created with ❤️ for **Elena Nails**. This project showcases the power of modern web technologies combined with a passion for design.

---
**[Visit the Live Site](https://elenanails.beauty/)**
