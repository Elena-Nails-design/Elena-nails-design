# Before & After Gallery Update TODO

This task tracks updating the interactive Before & After image comparison slider with authentic, high-quality photos from Elena's work, and restoring the section to the homepage once completed.

## Current State
- The `<BeforeAfter />` component has been commented out and hidden in `frontend/src/pages/Home.jsx`.
- We are waiting for two new high-quality before/after images from Elena.

## Checklist

- [ ] **Phase 1: Receive & Import New Assets**
  - [ ] Receive the new "Before" and "After" images from Elena.
  - [ ] Save the images into the project at `frontend/public/assets/nails_epshtein/` (e.g., `before_manicure.jpg` and `after_manicure.jpg`).

- [ ] **Phase 2: Update the React Component**
  - [ ] Open `frontend/src/components/BeforeAfter.jsx` ([BeforeAfter.jsx](file:///Users/costaepshtein14/Desktop/Elena-nails-design/frontend/src/components/BeforeAfter.jsx)).
  - [ ] Update the `before` and `after` paths in the `treatments` array to point to the new images.
  - [ ] Adjust the text labels (`beforeTagHe`, `afterTagHe`, and descriptions) to perfectly match the nails in the new images.

- [ ] **Phase 3: Reactivate and Restore Section**
  - [ ] Open `frontend/src/pages/Home.jsx` ([Home.jsx](file:///Users/costaepshtein14/Desktop/Elena-nails-design/frontend/src/pages/Home.jsx)).
  - [ ] Uncomment `<BeforeAfter />` to make the section visible on the homepage again.

- [ ] **Phase 4: Verification**
  - [ ] Verify the comparison slider works smoothly and displays the new images clearly.
