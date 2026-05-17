---
last_mapped_commit: unknown
---
# INTEGRATIONS.md

**Date:** 2026-05-17

## External APIs & Services
*   **Gemini API (`@google/generative-ai`):** Used on the frontend for generative AI capabilities (likely for an AI assistant or content generation based on the `AI Assistant Dashboard` mention in past conversation logs).
*   **WhatsApp Integration:** Mentioned in recent conversation logs ("resolving a functional discrepancy in the booking process where the system incorrectly signals a submission success before the WhatsApp integration is triggered"). This is likely used for appointment booking notifications or direct communication.

## Databases
*   **SQLite (`sqlite3`):** Used in the backend for data storage. Given it's a nail studio site, this likely stores booking appointments, services offered, and possibly user/admin details.

## Expected/Potential Integrations (Requires deeper code scan)
*   **File Storage:** `multer` is in the backend, suggesting image uploads (e.g., gallery images of nail designs). These might be stored locally on the server or pushed to a cloud bucket (like AWS S3 or Google Cloud Storage), though no cloud SDKs are explicitly listed in the package.json.
*   **Deployment/Hosting:** Vercel is mentioned in the conversation logs ("deployment process on Vercel"). Vercel might be handling both frontend and serverless functions, or just frontend with a separate backend deployment.
