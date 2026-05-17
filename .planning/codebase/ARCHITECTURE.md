---
last_mapped_commit: unknown
---
# ARCHITECTURE.md

**Date:** 2026-05-17

## System Architecture
This is a standard two-tier web application architecture:
1.  **Frontend:** A Single Page Application (SPA) built with React and Vite.
2.  **Backend:** A monolithic REST API built with Node.js and Express.

## Frontend Architecture (`frontend/`)
*   **Pattern:** React component-based architecture with client-side routing.
*   **State Management:** State appears to be localized within components, possibly using React Context (`src/contexts/` directory exists).
*   **Routing:** React Router is used to handle navigation across different views (pages) without reloading the document.
*   **Entry Point:** `frontend/index.html` (Vite's default entry) which loads `src/main.jsx` (assumed based on standard Vite setups).
*   **Data Flow:** Components fetch data from the backend via REST endpoints using `axios`.

## Backend Architecture (`backend/`)
*   **Pattern:** Express.js REST API.
*   **Entry Point:** `backend/server.js` serves as the main application file, handling routing, middleware setup, and database connections.
*   **Data Persistence:** Uses a local SQLite database (`backend/database.sqlite`).
*   **Data Flow:** Receives HTTP requests from the frontend, queries/mutates the SQLite database, and returns JSON responses.

## Key Abstractions & Layers
*   **Presentation Layer:** React components (`frontend/src/components/`, `frontend/src/pages/`).
*   **API/Service Layer:** `axios` calls within the frontend (likely abstracted into custom hooks or utility functions).
*   **Controller/Routing Layer:** Express routes defined in `backend/server.js`.
*   **Data Access Layer:** SQLite queries executed within Express routes.

## Deployment Model
*   Conversation logs mention deployment on Vercel. It is highly likely the frontend is deployed as static assets to Vercel's Edge Network, while the backend is deployed as a serverless function on Vercel, or possibly hosted separately. The usage of a file-based SQLite database (`database.sqlite`) presents challenges for serverless deployment (as serverless environments are typically ephemeral and read-only), which is a key architectural consideration.
