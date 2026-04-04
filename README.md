# Elena Nails Design - Premium Studio Website

A luxury, high-conversion studio website for Elena Epshtein, featuring a bespoke AI Assistant, medical-grade hygiene standards (Autoclave), and a seamless multilingual experience.

## ✨ Key Features
- **AI Assistant**: Personalized nail care advice powered by Gemini 1.5 Flash.
- **Precision Booking**: WhatsApp-integrated booking with automatic 10% website discount.
- **Studio Portfolio**: High-fidelity gallery of signature treatments.
- **Multi-lingual**: Fully localized in Hebrew, Russian, and English.

---

## 🔒 Security & Deployment (CRITICAL)

Because this is a frontend-only (Vite) application, environment variables starting with `VITE_` are bundled into the production code. **To prevent unauthorized use of your API key, you MUST set up restrictions.**

### 1. Restrict API Key (Prevention of Theft)
1. Go to [Google AI Studio](https://aistudio.google.com/) or the [Google Cloud Console](https://console.cloud.google.com/).
2. Locate your **Gemini API Key**.
3. Go to **API Restrictions** -> **Website Restrictions** (HTTP Referrers).
4. Add the following hosts to the allowed list:
   - `https://elena-nails-design.github.io/*`
   - `http://localhost:5173/*` (for your local development)
5. Save. This ensures that even if someone finds the key in your code, it will **only** work on your official website.

### 2. Local Environment (`.env`)
Create a `.env` file in the `frontend` folder:
```bash
VITE_GEMINI_API_KEY=your_key_here
```
**Note**: The `.env` file is ignored by Git and will never be pushed to your repository.

### 3. GitHub Pages Deployment (Production)
If you use GitHub Actions to deploy:
1. Go to your GitHub repository -> **Settings** -> **Secrets and variables** -> **Actions**.
2. Click **New repository secret**.
3. Name: `VITE_GEMINI_API_KEY`
4. Value: Paste your actual Gemini API Key.
5. Your deployment workflow is already configured to read this secret.

---

## 🚀 Tech Stack
- React 19 + Vite
- Tailwind CSS (Premium Styling)
- Framer Motion (Animations)
- i18next (Localization)
- Lucide React (Icons)
- Google Gemini 1.5 Flash (AI)
