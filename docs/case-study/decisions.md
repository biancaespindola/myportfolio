# Decision log: Portfolio v2

Source material for the "How I built this site" case study. One entry per decision, newest at the bottom. Format:

> **Context** → **Options** → **Decision** → **Why** → **Trade-offs** → **What I learned** (filled in later)

---

## 001 — Rebuild instead of patch v1 · 2026-11-17

- **Context:** v1 (Vite + React 18 + Tailwind, 2023) has a hero and an About section and nothing else. It has structural bugs: `<body>` inside React, Tailwind loaded twice, a dark-mode toggle that does nothing, no mobile layout. The public CV is outdated and exposes personal data.
- **Options:** patch v1 · upgrade v1 (Vite 6, React 19, TS) · rebuild on a new stack.
- **Decision:** rebuild in the same repo on branch `rebuild-nextjs`.
- **Why:** there's little to keep, and keeping the repo keeps its history and the Netlify URL. v1 becomes the "before" of the case study.
- **Trade-offs:** more upfront work than patching.

## 002 — Next.js + TypeScript · 2026-11-17

- **Context:** I work with Next.js daily (SPA → Next.js migration at work) and want to go deeper on it.
- **Options:** Next.js · Astro + React islands · keep Vite.
- **Decision:** Next.js App Router, TypeScript strict.
- **Why:** practice transfers both ways between work and this project. Server components fit a mostly-static content site, and route-based i18n is supported.
- **Trade-offs:** heavier than Astro for a content site; needs care to keep the JS bundle small.

## 003 — Four languages: EN, PT, IT, DE · 2026-11-17

- **Context:** half Italian, half Brazilian, living in a German-speaking region. Language is part of who I am.
- **Options:** EN only · EN+PT · EN+PT+IT · EN+PT+IT+DE.
- **Decision:** all four.
- **Why:** it says something about me before anyone reads a line of copy.
- **Trade-offs:** 4× copy to maintain; IT/DE need reviewers. Mitigation (proposed): translate UI + CV first, case studies EN-first with fallback.

## 004 — Personality-driven design direction · 2026-11-17

- **Context:** I'm warm, friendly, a people person and a problem solver. I love cute and nerdy things, games, books and Christmas.
- **Decision:** "cozy nerd" direction: warm palette, rounded shapes, case-study format for projects, achievements (gamer), bookshelf (reader), a December theme (Christmas), kind words from colleagues (people person).
- **Why:** a portfolio should feel like meeting me, not like reading a template.
- **Guardrail:** a recruiter skimming for 30 seconds must still find role, experience and CV right away. Fun extras are opt-in or easy to ignore.

## 005 — CV generated from site data · 2026-11-17 (proposed)

- **Context:** the Europass PDF went stale (still lists Khomp as current) and contains date of birth, phone and home address.
- **Decision (proposed):** `/cv` page built from the same `content/` data, with print CSS for PDF export. No DOB, phone or street address.
- **Why:** one source of truth, so the CV can't drift from the site; better privacy.

## 006 — Purge the old CV from git history · 2026-11-17 (approved, not yet run)

- **Context:** the Europass PDF in a public repo exposes date of birth, phone and home address. The live v1 site serves it too.
- **Options:** delete going forward · rewrite history.
- **Decision:** rewrite history with `git filter-repo`, force-push, redeploy v1 without the PDF.
- **Why:** deleting going forward still leaves the file one click away in old commits.
- **Trade-offs:** commit hashes change; existing clones/forks/caches can't be cleaned. Lesson: personal data never goes in a repo, and generated CVs leave out what isn't needed.

## 007 — Keep the Netlify subdomain · 2026-11-17

- **Decision:** no custom domain for now; `biancaespindola.netlify.app`.
- **Why:** free, works; a domain can be added later without changing the code.

## 008 — Phased translation · 2026-11-17

- **Decision:** UI + CV in EN/PT/IT/DE at launch (machine-translated, reviewed by native speakers); case studies EN first.
- **Why:** the parts recruiters read are in every language from day one; long-form content doesn't block launch. Refines 003.

## 009 — Illustrated avatar + photo · 2026-11-17

- **Decision:** cute illustrated avatar in the hero; real photo on About and CV.
- **Why:** the illustration carries the "cute + nerd" personality; the photo keeps it human and is what people expect on a CV.

## 010 — Which case studies · 2026-11-17

- **Decision:** (1) this site, (2) ComeOn sportsbook features, (3) IoMT security thesis, plus a mini case on Khomp accessibility. VoiceNotesEase and design-system go to a "Playground" list.
- **Why:** pick what's recent, finished and shows range (product frontend, research/security, a11y) over everything on GitHub. Unfinished projects weaken the page.
- **Constraint:** the ComeOn write-up needs a policy check and stays high-level.

## 011 — Modern, recruiter-visible stack · 2026-11-17

- **Context:** the stack should be current in late 2026 and give me things to talk about in interviews.
- **Decision:** Next.js 16 (RSC, Turbopack, `'use cache'`), React 19 + React Compiler, TypeScript (try TS 7), Tailwind 4 + shadcn/ui, Motion + View Transitions, next-intl 4, Zustand 5, Vitest 5 + Playwright + axe, Storybook 10, Biome 2, Lighthouse CI. Optional "Ask Bianca" AI chat (Claude API) + `/llms.txt`. Versions checked on npm.
- **Why:** each choice appears in current job ads _and_ has a story (see PLAN §3).
- **Not chosen:** TanStack Query, Redux, CMS, database. Nothing on the site needs them.

## 012 — "Cozy nerd" visual system · 2026-11-17

- **Figma:** [Portfolio v2 — Bianca Espindola](https://www.figma.com/design/Qw47mG7PdVWPnss9eQ5VFt) (personal team).
- **Type:** Fraunces (bookish serif, headlines), Nunito (rounded, body), Pixelify Sans (gamer micro-labels). All on Google Fonts, so `next/font` works.
- **Colour:** cream background, terracotta primary, sage accent, honey highlight. Festive swaps in Christmas red and pine green.
- **Signature pieces:** multilingual greeting chip ("OI! · CIAO! · HALLO! · HI!"), achievement toast, bookshelf/games covers, "Let's grab a coffee" CTA, Konami hint in the footer.
- **Icons:** Lucide. Figma doesn't render colour emoji, and emoji look different on every OS anyway.

## 013 — Working around Figma Starter limits · 2026-11-17

- **Context:** Starter allows 1 mode per variable collection and 3 pages.
- **Decision:** one collection per theme (`Theme · Light/Dark/Festive`) with identical variable names. Light screens are linked to components; Dark/Festive screens are detached previews with variables rebound by name. 3 pages: Foundations, Components, Screens.
- **Why:** this maps 1:1 to code (`:root[data-theme="dark"] { --bg-default: … }`), so nothing is lost.
- **Lesson:** a tool constraint pushed the token structure closer to the CSS that will ship.

## 014 — Palette switch: Berry & cream · 2026-11-17

- **Context:** the terracotta palette didn't feel "cute enough".
- **Options:** Berry & cream · Lavender nerd · Forest & candy cane · Midnight arcade (all on the Foundations page in Figma).
- **Decision:** Berry & cream: raspberry `#B4235A`, plum ink `#2A1B2E`, pastel pink `#FFDCE7`, mint `#276B5C`, butter `#FFD166`, cream `#FFF7F2`. Dark = berry night, Festive = Christmas red/pine/gold.
- **Why:** cute and warm without going childish; raspberry passes AA with white text.
- **Lesson:** binding every colour to a variable meant the whole file recoloured in one call.

## 015 — Christmas mode goes all-in · 2026-11-17

- **Context:** a palette swap isn't enough for someone who loves Christmas.
- **Decision:** a full December mode, not a tint:
  - twinkling string lights above the nav; Santa hat on the logo star
  - night-sky hero with snowfall (canvas), snow ground, wreath around the avatar
  - multilingual greeting: "Boas festas · Buon Natale · Frohe Weihnachten"
  - candy-cane secondary buttons, knitted pixel-sweater dividers (pixel = gamer nod)
  - highlights as wrapped gifts; bookshelf "under my Christmas tree" with snow caps
  - **advent calendar**: 24 doors, one per day, each a fact or site easter egg; opening doors feeds achievements
  - "Let's grab a hot cocoa" CTA; Konami code → blizzard
- **Guardrails:** auto-on in December only, "Let it snow" toggle, `prefers-reduced-motion` turns off snow/twinkle/door animation, doors are real buttons with labels.
- **Prototype:** `docs/design/christmas-mode.html` (open via the dev server at `/docs/design/christmas-mode.html`).

## 016 — Figma Starter limits hit · 2026-11-17

- **Context:** the Figma MCP tool-call limit for Starter was reached mid-way through designing Work / Case study / CV / About.
- **Decision (for now):** keep Home + components in Figma; design remaining pages and Christmas mode as HTML prototypes, or continue in Figma after the limit resets / on a paid plan.
- **Lesson:** batch Figma work into fewer, larger calls; free-tier quotas are a real constraint in tooling choices.

## 017 — HTML prototypes for the remaining pages · 2026-11-17

- **Context:** Figma quota used up; Work, Case study, CV and About still needed designs.
- **Decision:** clickable HTML prototypes in `docs/design/` (open `/docs/design/index.html` on the dev server). Shared `assets/site.css` mirrors the Figma tokens (Light/Dark/Festive via `[data-theme]`); `assets/app.js` provides nav/footer, theme + language switch and the achievements system (localStorage, toast).
- **What works:** theme cycling, string lights in Festive, 6 achievements (Explorer, Polyglot, Bookworm, Night owl, Ho ho ho, Konami), CV in EN/PT/IT/DE rendered from one data object and printable to a single A4 page, reading-progress bar on the case study.
- **Why:** the prototypes are already shaped like the real code (tokens as CSS variables, content as data), so the Next.js build can copy decisions instead of re-deriving them.
- **Open:** IT/DE CV text is a machine draft — needs native review. Mobile nav is a scrolling row, not a menu.

## 018 — Native i18n instead of next-intl · 2026-11-17

- **Context:** plan said next-intl; Next 16 docs now ship a first-party pattern: `app/[lang]`, JSON dictionaries, `next/root-params`, `generateStaticParams`, locale negotiation in `proxy.ts` (Next 16's new name for middleware).
- **Decision:** native. Dictionaries are typed from `en.json`, so PT/IT/DE fail the type-check if a key is missing.
- **Why:** zero dependencies, works with Cache Components out of the box, every locale is prerendered. `next/root-params` lets any server component read the locale without prop drilling.
- **Trade-offs:** no ICU plural/date helpers yet. Add `Intl` APIs (or a library) when a page needs them.

## 019 — Phase 0 scaffold and quality gates · 2026-11-17

- **Scaffold:** `create-next-app` 16.4 (Turbopack, Cache Components, React Compiler, Biome, Tailwind 4). v1 files removed on this branch (still on `main`); photos moved to `public/images`.
- **TypeScript 7:** the Go-native compiler works with Next 16 here; build type-check went from ~1.2 s to ~0.3 s.
- **Gates:** Biome, `tsc`, Vitest (locale negotiation), Playwright with axe on every locale, theme persistence test; all in GitHub Actions (`.github/workflows/ci.yml`).
- **First catch:** axe flagged the theme button. Its `aria-label` ("Change theme") didn't contain the visible text ("Light") — WCAG 2.5.3 *label in name*. Fixed with a visually hidden prefix, so the name is "Change theme: Light".
- **Theme before paint:** per the Next docs, the theme script is emitted with `useServerInsertedHTML` (no React `<script>` warning); December defaults to Festive unless the visitor chose a theme.
- **Not done yet:** Netlify site + preview deploys need the account connected; Storybook, Lighthouse CI and OG images come with the real pages.

## 020 — Home page · 2026-11-17

- **Built:** header (nav, language switcher that keeps the current path, theme toggle), hero, highlights, case-study cards, bookshelf & games, coffee CTA, footer, in EN/PT/IT/DE. Copy lives in the dictionaries; structure (icons, covers, tags, shelf) in `src/content/home.ts`.
- **Photo, not illustration (for now):** the hero uses my real photo inside the dashed ring until the illustrated avatar exists (decision 009 still stands).
- **"Kind words" left out:** the Figma mock has placeholder quotes. No invented testimonials on a live site; the section comes back with real ones.
- **Icons:** `lucide-react`, the same set as Figma and the prototypes.
- **Axe in every theme:** checking Dark and Festive found that the hero's achievement toast flipped to a light background in Dark mode, and its yellow label failed contrast. The toast now has fixed dark-plum colours in every theme, like an in-game notification. 8 e2e tests: 4 locales + 2 themes + redirect + theme persistence.
- **Known gap:** nav links prefetch `/work`, `/case-studies`, `/about`, `/cv`, which 404 until those pages are built.

## 021 — Work page · 2026-11-17

- **Built:** `/[lang]/work`: timeline of 5 roles, award card, skills grouped by what I do with them, education, publication. Experience lives in `src/content/experience.ts` (one source for Work now and the CV later), with role/place/bullets per locale.
- **Dates via `Intl`:** stored as ISO year-month, formatted per locale on the server (`Apr 2024 — now`, `apr 2024 — oggi`, `Apr. 2024 — heute`). No hand-written month names in four languages.
- **Bug caught on a phone:** long German words ("Softwareentwicklerin", "Wissenschaftliche Mitarbeiterin Softwareentwicklung") pushed the timeline wider than the screen. Fix: `minmax(0,1fr)` grid columns plus CSS `hyphens: auto`. Because the page has `lang="de"`, the browser hyphenates correctly ("Softwareentwick-lung"). An e2e test now fails if anything in `<main>` overflows a 375px screen in German.
- **Award photo:** left out until a photo is picked.
- **Tests:** 14 e2e (axe on Home + Work × 4 locales, Dark/Festive, redirect, localized dates, mobile overflow, theme persistence).

## 022 — CV page that prints itself · 2026-11-17

- **Built:** `/[lang]/cv`, an A4 sheet generated from the same `experience.ts` as the Work page, plus CV copy in the dictionaries. "Print / save as PDF" calls `window.print()`; print CSS hides the site chrome and sets `@page { size: A4; margin: 0 }`.
- **Photo:** a new professional headshot, converted from a 2.2 MB PNG to a 235 KB JPG (900 px).
- **Fixed sheet colours:** the sheet ignores the site theme, so a visitor in Dark or Festive mode still gets a clean white CV.
- **PDF file name for free:** the page `<title>` is "Bianca Espindola — Lebenslauf" (etc.), which Chrome uses as the default PDF name.
- **Privacy:** no phone number, birth date or home address (see 005/006).
- **Test that a recruiter would care about:** Playwright renders a real PDF per locale and asserts it's exactly **one A4 page**, with the header hidden and the photo present. 22 e2e tests in total.
- **Open:** IT/DE wording still needs a native speaker's review. Not shown on the site, tracked here.

## 023 — Hero photo with a focal point · 2026-11-17

- **Photo:** a sunset portrait by the water replaces the old lake photo on Home. It arrived with no EXIF/GPS metadata, so there's no location leak.
- **Face in focus, by code:** a small `FocalImage` component takes a focal point (`[0.67, 0.41]`, where the face is) and a zoom (2.2×). It sizes and offsets the image in percentages of the circle, so the face stays centred at every screen size. No pre-cropped files, and the framing can be tuned by changing two numbers.
- **Award photo:** still waiting for the file. Pasted images aren't saved to disk.

---

## Journal

- **2026-11-17:** cloned the repo, ran v1 locally (`pnpm install && pnpm dev`; the old `package-lock.json` was imported into pnpm). Audited v1, picked stack/repo/languages, wrote the plan.
- **2026-11-17:** answered the open questions; pulled accurate dates from LinkedIn (the old CV had them wrong); chose the case studies.
- **2026-11-17:** modernised the stack; built the Figma file: tokens (3 themes), 8 text styles, 14 icons, 7 components, Home desktop in Light/Dark/Festive, Home mobile.
- **2026-11-17:** switched to Berry & cream; added Nav/Footer/TimelineItem/AchievementBadge components; hit the Figma MCP limit; built the full Christmas-mode prototype.
- **2026-11-17:** built HTML prototypes for Work, Case study, CV (4 languages, A4 print) and About (achievements board), plus an index page.
- **2026-11-17:** Phase 0 done: Next.js 16 + TS 7 scaffold, tokens/fonts/themes, 4-locale routing, Biome/Vitest/Playwright+axe, CI. All checks green.
- **2026-11-17:** Home page in 4 languages and 3 themes; axe clean everywhere after fixing the Dark-mode toast contrast.
- **2026-11-17:** Work page in 4 languages; German hyphenation fix with a regression test.
- **2026-11-17:** CV page in 4 languages, one A4 page each, with the new headshot.
- **2026-11-17:** new hero photo, framed on the face with a focal-point component.
