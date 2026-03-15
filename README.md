# IMMINOTE PROJECT PROTOCOL
**Version:** 1.0 (Golden Master)
**Status:** Stable / Offline-First PWA

## 1. CORE PHILOSOPHY
* **Simplicity is King:** No frameworks. No build steps. No unnecessary dependencies.
* **Offline First:** The app must function 100% without internet. Data lives in `localStorage`.
* **Speed:** Instant load times. No loading spinners.
* **"Ghost" Mechanics:** The interface should feel frictionless. Do not ask users to name files before writing.

## 2. TECH STACK & CONSTRAINTS
* **Language:** Vanilla HTML5, CSS3, JavaScript (ES6+).
* **Frameworks:** STRICTLY FORBIDDEN (No React, Vue, jQuery, Tailwind).
* **Icons:** ASCII / Unicode text characters only (e.g., `★`, `▶`, `⋮`). No SVG libraries.
* **Fonts:** `JetBrains Mono` (Google Fonts).
* **Storage:** `localStorage` keys:
    * `imminote_notes_v2` (Array of Note objects)
    * `imminote_aliases` (Map of folder renames)

## 3. ESTABLISHED FEATURES (DO NOT BREAK)

### A. The "Ghost Note" State Machine
1.  **Ghost State:** `currentNoteId` is `null`. Editor is empty.
2.  **Activation:** User types *any* character -> Logic creates a note immediately with `Date.now()` ID.
3.  **Cleanup:** If user clears the editor (length 0) -> Note is DELETED from array. State returns to Ghost.
4.  **Constraint:** Never leave an empty note in the database.

### B. The Temporal Sidebar
* **Structure:** `Date (YYYY-MM-DD)` -> `Time (HH:MM:SS)`.
* **Sorting:** Newest timestamps at the top.
* **"TODAY" Bracket:**
    * Header: Text "TODAY" + Line.
    * Footer: Line only (matches header width).
    * *Constraint:* Must separate today's notes from history visually.

### C. State Persistence
* **Open Folders:** Must track open folders in a `Set` (or DOM state snapshot) to prevent the tree from collapsing when Bookmarking or Searching.
* **Selection:** The active note must remain highlighted in the sidebar.

### D. UI/UX Standards
* **Theme:** "Earth Tone" Dark Mode.
    * Background: `#1e1e1e`
    * Accent (Clay): `#cf8e6d`
    * Bookmark (Gold): `#e5c07b`
* **Context Menu:**
    * Must close when clicking *anywhere* else (Global listener).
    * Context-aware options (e.g., "New Folder" only appears on Date items).

## 4. ANTI-HALLUCINATION RULES
1.  **Read Before Write:** Do not assume variable names. Check `notes`, `folderAliases`, or `currentNoteId` definitions in the provided code.
2.  **Incremental Updates:** When adding a feature, provide the *full* updated function or the *full* HTML file to prevent "lazy deletion" of existing logic.
3.  **No "Smart" Features:** Do not add AI, Cloud Sync, or Analytics unless explicitly requested.
4.  **Preserve the Vibe:** Do not suggest "modernizing" the UI with rounded corners or gradients. Keep it brutalist/utilitarian.

## 5. CURRENT CODEBASE SNAPSHOT
* **Main Logic:** Single `index.html` file containing CSS, HTML, and JS.
* **Service Worker:** `sw.js` (currently handles editor input logic in the provided context, though traditionally for caching).

---
*If the AI suggests changing the font to Inter or switching to React, refer to Rule #2.*