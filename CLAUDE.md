# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development commands

### Frontend (repo root)
- `npm install`
- `npm run dev` — start the Vite dev server.
- `npm run build` — build the production bundle into `dist/`.
- `npm run preview` — serve the built frontend locally.
- `npm test` — run Vitest.
- `npx vitest run src/App.test.jsx` — run a single test file.
- `npx vitest run src/App.test.jsx -t "dismisses the loader after the timeout and exposes the app tree"` — run one named test.
- `npm run lint` — run the configured ESLint script. Note: `package.json` defines this script, but this repo does not currently have a top-level `eslint` dependency installed, so verify the lint toolchain before relying on it.
- `npm run deploy` — publish `dist/` to GitHub Pages via `gh-pages`.

### Backend (`backend/`)
- `python -m venv .venv`
- `source .venv/Scripts/activate` — activate the venv in this Windows + bash environment.
- `pip install -r requirements.txt`
- `uvicorn main:app --reload --port 8000` — start the FastAPI service used by the chatbot.

## Architecture overview

- The frontend is a Vite React app, not Create React App. `README.md` is still CRA boilerplate; trust `package.json`, `vite.config.js`, and current source code instead.
- `src/index.jsx` wraps the app in `BrowserRouter`, but the site is effectively a single-page portfolio. Navigation is section/hash based, not route-based.
- `src/App.jsx` is the top-level composition layer. It controls the splash loader, mounts the global animated background, wraps the page in the Lenis-based `SmoothScroll` container, renders the portfolio sections in order, and mounts the floating chatbot.
- The credentials section is implemented in `src/components/Achievements/Achievements.jsx` but imported into `src/App.jsx` under the alias `Credentials`. If you are searching for the credentials section, check both names.
- Most of the visual behavior lives in `src/components/animations/` rather than in the section components themselves. The major animation engines are:
  - `HyperKineticHero.jsx` — hero section, nav behavior, magnetic cursor interactions, and scroll-reactive hero effects.
  - `ParallaxStarsBackground.jsx` — global starfield background used via `GlobalBackground`.
  - `WebGLScrollSync.jsx` — custom WebGL shader canvas for the projects section.
  - `HyperScrollScene.jsx` — 3D scroll tunnel used by the achievements/credentials section.
  - `SmoothScroll.jsx` — initializes Lenis and exposes it on `window.lenis`.
- The section components (`Home`, `About`, `Skills`, `Projects`, `Contact`) are mostly composition + content holders. Several sections keep their content as in-file arrays/constants rather than loading from JSON or an API.
- Styling is primarily plain CSS (`*.css`) plus a few highly customized UI components in `src/components/ui/*.tsx` that rely on inline styles and shader-driven rendering. Tailwind packages are installed, but the current app is not built around Tailwind utility classes.
- `src/components/Contact/Contact.jsx` posts directly to Web3Forms from the browser. It does not use the local FastAPI backend.
- `src/components/ChatBot/ChatBot.jsx` posts directly to `http://localhost:8000/chat`. If you change backend ports, deployment topology, or add environment-specific URLs, update the frontend fetch target here.

## Chatbot backend

- `backend/main.py` is a single-file FastAPI RAG service.
- On startup it reads `backend/data/*.txt`, concatenates the text, splits it into chunks, embeds them with `sentence-transformers/all-MiniLM-L6-v2`, and builds an in-memory FAISS index.
- The `/chat` endpoint embeds the user query, retrieves the top matching chunks from FAISS, builds a prompt that constrains answers to the retrieved context, and sends that prompt to OpenRouter.
- Backend responses return both `answer` and `sources`; the frontend displays the answer and exposes the retrieved snippets in a collapsible sources list.
- The backend expects `OPENROUTER_API_KEY` to be available via environment variables / `.env`.
- If you change files under `backend/data/`, restart the FastAPI server so the FAISS index rebuilds from the updated text corpus.
- If `backend/data/` is empty, startup seeds a sample `bio.txt`; that behavior is in `backend/main.py`.

## Testing notes

- Frontend tests run with Vitest configured in `vite.config.js` using the `jsdom` environment and `src/setupTests.js`.
- `src/App.test.jsx` is a broad integration-style test for the landing page shell and its major animated sections, not just a narrow unit test of `App`.
- `src/setupTests.js` mocks `IntersectionObserver`, `requestAnimationFrame`, `matchMedia`, and canvas/WebGL APIs so the animation-heavy components can render under jsdom. When animation-related tests fail, inspect the mocks and test environment assumptions before changing production components.
