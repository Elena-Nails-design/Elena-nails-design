---
last_mapped_commit: unknown
---
# CONVENTIONS.md

**Date:** 2026-05-17

## Frontend Conventions

*   **File Extension:** React components use `.jsx` consistently.
*   **Component Structure:** Functional components with React Hooks (`useState`, `useMemo`, `useCallback`, `useEffect`).
*   **Styling:** Utility-first styling with Tailwind CSS (`^4.2.2`), often combined with Framer Motion for animations (`<motion.div>`). The design uses custom color classes like `bg-primary`, `bg-gold`, and specific glassmorphism effects (`glass-luxury`).
*   **Internationalization (i18n):** Deeply integrated using `react-i18next`. Strings are accessed via the `t()` function, and RTL/LTR logic is handled dynamically in `App.jsx` based on the current language.
*   **Routing:** React Router v7 (`^7.14.0`) is used, specifically utilizing `HashRouter`. Routes are defined centrally in `App.jsx`, often using `lazy` and `Suspense` for code splitting.
*   **State Management:** Component-level state (`useState`). Some global state seems to be managed via Context (`ThemeContext.jsx` for dark/light mode).
*   **Animations:** Framer Motion is heavily used for route transitions (`AnimatePresence` in `App.jsx`) and component-level micro-interactions.
*   **Accessibility:** There is a dedicated `AccessibilityMenu.jsx` component and `Accessibility.jsx` page, indicating a conscious effort towards a11y, though further code review is needed to assess the depth (e.g., ARIA attributes).
*   **Icons:** `lucide-react` is the standard icon set.

## Backend Conventions

*   **Framework:** Express.js.
*   **Database:** SQLite (`sqlite3` package) using a local file (`database.sqlite`).
*   **Structure:** Currently monolithic, contained within `server.js`.

## Cross-Cutting Concerns
*   **Proxying:** The Vite dev server is configured to proxy `/api` requests to `http://localhost:5000` (the Node backend).
