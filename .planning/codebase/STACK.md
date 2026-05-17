---
last_mapped_commit: unknown
---
# STACK.md

**Date:** 2026-05-17

## Overview
This is a modern React SPA using Vite for the frontend build tool. It appears to have a corresponding backend, but focusing on the frontend first, it heavily leverages modern frontend tooling.

## Languages
*   JavaScript / JSX
*   HTML5
*   CSS3

## Frontend Tech Stack
*   **Framework:** React (`^19.2.4`)
*   **Build Tool:** Vite (`^8.0.3`)
*   **Routing:** React Router DOM (`^7.14.0`)
*   **Styling:** Tailwind CSS (`^4.2.2`)
*   **State Management / Fetching:** Axios (`^1.14.0`) for data fetching. Local component state likely used.
*   **Animation:** Framer Motion (`^12.38.0`)
*   **Icons:** Lucide React (`^0.470.0`)
*   **Internationalization:** i18next (`^26.0.3`), react-i18next (`^17.0.2`)
*   **Utility Libraries:**
    *   `date-fns` (`^4.1.0`) for date manipulation.
    *   `clsx` (`^2.1.1`) and `tailwind-merge` (`^3.5.0`) for conditional class joining.
    *   `react-markdown` (`^10.1.0`) for rendering markdown content.
    *   `react-helmet-async` (`^3.0.0`) for head tag management.

## Backend Tech Stack
*   **Framework:** Express (`^5.2.1`)
*   **Database:** SQLite3 (`^6.0.1`)
*   **File Uploads:** Multer (`^2.1.1`)
*   **Middleware:** CORS (`^2.8.6`)
*   **Environment Variables:** dotenv (`^17.4.0`)
*   **Development Tooling:** nodemon (`^3.1.14`)

## Configuration Files
*   `frontend/package.json`: Manages frontend dependencies and scripts.
*   `frontend/vite.config.js`: Configuration for the Vite bundler.
*   `backend/package.json`: Manages backend dependencies and scripts.
*   `.gitignore`: Ignores node_modules, build outputs, and environment variables.
