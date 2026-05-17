---
last_mapped_commit: unknown
---
# STRUCTURE.md

**Date:** 2026-05-17

## High-Level Directory Layout

The repository is structured as a monorepo containing both the frontend client and the backend API.

```text
.
├── frontend/          # React SPA
│   ├── public/        # Static assets (images, favicon, etc.)
│   ├── src/           # Application source code
│   ├── package.json   # Frontend dependencies
│   └── vite.config.js # Frontend build configuration
├── backend/           # Express API server
│   ├── database.sqlite # SQLite database file
│   ├── package.json   # Backend dependencies
│   └── server.js      # Main Express application entry point
├── .github/           # GitHub Actions workflows
├── .planning/         # GSD Agent planning and documentation
└── README.md          # Project documentation
```

## Frontend Structure (`frontend/src/`)

```text
src/
├── components/        # Reusable UI components (buttons, forms, modals)
├── contexts/          # React Context providers for global state
├── locales/           # i18n translation files (likely JSON)
├── pages/             # Top-level route components (views)
```

## Backend Structure (`backend/`)

Currently, the backend is primarily a single file:
*   `server.js`: Contains all route definitions, database logic, and server configuration.

## Key Locations
*   **Asset Storage:** `frontend/public/assets/` holds images organized into subfolders (`blog/`, `nails_epshtein/`, `equipment/`).
*   **Routing Configuration:** Likely found within `frontend/src/App.jsx` or a dedicated `routes.js` file (needs to be confirmed by viewing file contents).
*   **Database Schema/Operations:** Handled directly within `backend/server.js`.

## Naming Conventions
*   **React Components:** PascalCase (e.g., `Booking.jsx` inferred from conversation state).
*   **Directories:** camelCase or lowercase (e.g., `components`, `pages`).
*   **Static Assets:** lowercase with underscores (e.g., `nails_epshtein`).
