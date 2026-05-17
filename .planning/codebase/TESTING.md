---
last_mapped_commit: unknown
---
# TESTING.md

**Date:** 2026-05-17

## Testing Infrastructure

Based on the initial scan of `package.json` files for both frontend and backend, **there are currently no automated testing frameworks configured.**

*   **Frontend (`frontend/package.json`):** No testing libraries (like Jest, React Testing Library, or Vitest) are listed in `dependencies` or `devDependencies`. There are no test scripts defined.
*   **Backend (`backend/package.json`):** The `test` script simply echoes `"Error: no test specified" && exit 1`. No testing libraries (like Mocha, Chai, or Jest) are present.

## Current State

Testing appears to be entirely manual at this stage. 

## Recommendations (If testing is to be introduced)
*   **Frontend:** Introduce Vitest (since Vite is already used) and React Testing Library for unit and component testing. Cypress or Playwright could be used for end-to-end (E2E) testing.
*   **Backend:** Introduce Jest or Mocha/Chai for unit and integration testing of the API endpoints. Supertest is recommended for testing the Express routes.
