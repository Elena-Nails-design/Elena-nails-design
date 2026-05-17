---
last_mapped_commit: unknown
---
# CONCERNS.md

**Date:** 2026-05-17

## Technical Debt & Areas of Concern

1.  **Missing Automated Tests:** As noted in `TESTING.md`, there are zero automated tests for both the frontend and backend. This makes refactoring risky and increases the likelihood of regressions, especially as the application grows.

2.  **Backend Deployment Strategy:** The backend uses a local SQLite database (`backend/database.sqlite`). While fine for local development, this poses a major challenge for serverless deployment platforms like Vercel (mentioned in conversation logs), which are ephemeral. Data written to the SQLite database on a serverless function will be lost on subsequent invocations. A cloud-based database (e.g., PostgreSQL via Supabase/Neon, or MongoDB) is highly recommended for production.

3.  **Monolithic Backend:** The entire backend logic, including routing, middleware, and database access, appears to be housed within a single `backend/server.js` file. This should be refactored into a modular structure (e.g., separating controllers, routes, and data access) to improve maintainability.

4.  **Frontend Routing Strategy:** The frontend uses `HashRouter`. While this simplifies deployment on static hosts (avoiding 404s on direct URL access), `BrowserRouter` is generally preferred for modern web apps for cleaner URLs and better SEO, provided the hosting environment is configured to rewrite all requests to `index.html`.

5.  **Environment Variables & Security:** The backend uses `dotenv`. It is critical to ensure that `.env` files containing sensitive information (database credentials, API keys) are not committed to version control. (The `.gitignore` file was confirmed to exist, but its contents should be verified to ensure `.env` is ignored).

6.  **Error Handling (Frontend to Backend):** In `frontend/src/pages/Booking.jsx`, the form submission currently only sets a `submitted` state to `true` and offers generic links (WhatsApp, Instagram). It does not appear to send data to the backend API. If the backend is intended to store these bookings in the SQLite database, that connection needs to be implemented and robust error handling added for network failures.
