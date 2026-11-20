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

## 006 — Purge the old CV from git history · 2026-11-17 (done, see 029)

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
- **First catch:** axe flagged the theme button. Its `aria-label` ("Change theme") didn't contain the visible text ("Light") — WCAG 2.5.3 _label in name_. Fixed with a visually hidden prefix, so the name is "Change theme: Light".
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

## 024 — Christmas avatar for Festive mode · 2026-11-17

- **What:** an illustrated portrait of me in a Santa hat replaces the hero photo whenever the theme is Festive (automatic in December). This is the "illustrated avatar" from decision 009, in its Christmas outfit.
- **How:** a `festive:` Tailwind variant (`@custom-variant festive (&:where([data-theme="festive"], …))`). Both images are in the HTML and CSS shows one. The theme is set before first paint, so there's no flash and no extra JavaScript, and the hidden lazy image isn't downloaded.
- **`FocalImage` hardened:** the offset is clamped so a focal point near an edge can never leave an empty gap in the circle.

## 025 — About page in my own words · 2026-11-17

- **Built:** `/[lang]/about` with my own story, a map (Florianópolis → Italy 2022 → Graz 2024), six fun-fact cards and language bars, in EN/PT/IT/DE. The text is mine; I asked for the translations.
- **Photos:** new library portrait (hero) plus ski, Christmas-market and Christmas-mug photos on fun-fact cards. The old 2023 photos are gone (see the cleanup entry).
- **Other people's privacy:** three photos had bystanders: ski-school children, market visitors, an ad poster with someone's face. `FocalImage` crops keep them out of frame (or too small and distant to recognise). That's GDPR-friendly, and children never appear.
- **`FocalImage` grew a `frame` prop** so the same focal-point math works for 4:5 portraits as well as squares and circles.
- **Places trimmed** at my request: Araranguá removed everywhere (map, Work, CV); only the country is listed for EJEC and LARM.
- **Pending:** the book-lover breakfast photo (it arrived without a file).

## 026 — Mini Bianca: an SVG avatar for the fun facts · 2026-11-17

- **Context:** I wanted illustrations instead of my photos on the "Things that make me, me" cards. Real photos stay on Home and in the About hero.
- **Decision:** one hand-coded SVG character (`MiniBianca`) with six outfits: book, ski goggles + controller, museum painting, crown, reindeer antlers + scarf, red beanie + Christmas mug. Long wavy hair, no glasses, big smile, like me (first drawn with tight curls, then changed to waves).
- **Why code, not image files:** ~6 KB for all six, crisp at any size, the background circle follows the theme tokens (Light/Dark/Festive), and there are no bystanders to crop or metadata to strip. The ski, market and mug photos were removed from the site.
- **Bug found while doing it:** card text was clipped because the SVG stretched the card's implicit grid column. Fixed with `grid-cols-1` (`minmax(0,1fr)`).
- **Accessibility:** the avatar is decorative (`aria-hidden="true"`); each card's title and text carry the meaning.

## 027 — Case study pages · 2026-11-17

- **Built:** `/[lang]/case-studies` (index) and three studies: this site, sportsbook at ComeOn, the IoMT security thesis. Each one follows the same arc: problem → constraints → options (chosen one marked) → decision → outcome → what I learned.
- **English-first (decision 008):** long-form text is English; labels, cards and navigation are in all four languages, and PT/IT/DE readers see a note. The article is marked `lang="en"` so screen readers switch voice.
- **Facts only:** the content comes from my CV, LinkedIn, the thesis abstract and this log. The sportsbook study stays high-level, with no internal numbers or unreleased screens.
- **Real 404s with Cache Components:** a dynamic `[slug]` route streamed its static shell (HTTP 200) before `notFound()` ran, so unknown slugs were soft-404s. `dynamicParams` isn't available with Cache Components. Fix: one static route per study, sharing a `CaseStudyView` component. An e2e test asserts the 404 status.
- **Shared `CaseStudyGrid`** for Home, the index and "keep reading".

## 028 — Delight: achievements, snow and lights · 2026-11-17

- **Achievements (gamer side):** six to unlock (Explorer, Polyglot, Bookworm, Night owl, Ho ho ho, Konami). A Zustand store with `persist` (same pattern as at work) keeps them in `localStorage`; a client-only tracker in the root layout awards them and shows a toast announced through an `<output aria-live="polite">`. The About page has a board with progress.
- **Hydration-safe:** the store uses `skipHydration` and rehydrates on mount, so the server HTML and the first client render match (no mismatch warnings).
- **Festive theme:** canvas snow plus twinkling SVG string lights; the Konami code adds an 8-second blizzard. `prefers-reduced-motion` turns the snow off and freezes animations.
- **Tests caught two things:** axe flagged the snow canvas for sitting outside any landmark (fixed by wrapping it in an `aria-hidden` element), and an e2e test raced ahead of React's hydration (fixed by waiting until each visit is saved, like a real visitor). 40 e2e tests, achievement tests stable across 3 repeated runs.
- **Not built:** the "Ask Bianca" AI chat. It needs an API key, costs money per message and needs abuse protection, so it's a separate decision.

## 029 — History purge, done · 2026-11-17

- **Removed from all history** (`main` + `rebuild-nextjs`, via `git filter-branch --index-filter`): 3 CV PDFs with personal contact data, 10 old photos, including a 2020 photo with **GPS coordinates** in its EXIF and the ski/market/mug photos with bystanders (children). Current site images kept.
- **Safety:** full local `git bundle` backup first; the whole site re-verified (12 unit + 40 e2e) before pushing; `--force-with-lease` pinned to the exact old tips.
- **v1 kept alive:** `main` (the live v1 site) imported the CV and two photos, so a small commit removed them; v1 rebuilt without the PDF and Netlify now returns 404 for it.
- **Still to do (outside the repo):** GitHub still serves the old commits by SHA until its own cleanup, so ask GitHub Support to purge cached views and PR #1 refs. Delete old Netlify deploys, whose permalinks still contain the PDF.
- **Lesson:** "it's only in an old commit" is still public. The privacy test now guards `public/images`, but the habit that matters is never committing personal data in the first place.

## 030 — Personal logo, one file for every theme · 2026-11-17

- **What:** my logo kit (script "b" + sparkle, "Bianca" in Baskerville Bold, outlined) replaces the text logo in the header; the favicon is the "b" on a raspberry square (`app/icon.svg`, Next's metadata convention). The default Next favicon is gone.
- **How it adapts:** the kit's SVG uses `currentColor` plus `--logo-accent`. It's inlined as a React component with those wired to the design tokens (`text-ink`, `--logo-accent: var(--color-primary)`), so Light, Dark and Festive recolour it with no extra files. The kit's separate light/dark SVGs weren't needed.
- **Safety:** the kit was unpacked to a scratch folder and checked first: no scripts, links or external references in any SVG.
- **Accessibility:** the logo is `role="img"` with `aria-label="Bianca"`, giving the home link a clear name.

## 031 — Go live on Netlify · 2026-11-17

- **Cleanup finished:** the last Netlify deploy holding the purged CV (`main@452dbf7`, 2024) is deleted, and a GitHub Support ticket asks them to drop the cached old SHAs and PR #1 refs.
- **Host:** stayed on Netlify. It keeps the `biancaespindola.netlify.app` URL (decision 007), it's free, and `@netlify/plugin-nextjs` already ran the deploy previews. Vercel would fit Next 16 best but changes the URL. GitHub Pages can't work: the locale redirect in `proxy.ts` needs a server.
- **How:** merged PR #1 into `main` (the only conflict was v1's `src/App.jsx`, deleted). The merged tree is byte-identical to `rebuild-nextjs`, and the full gate (lint, types, unit, build, 40 e2e) passed before the push. Netlify auto-published it in about a minute; every locale and page returns 200, and the old CV URL still returns 404.

## 032 — Illustrated avatars for the fun facts · 2026-11-17

- **What:** six 2D illustrations I made (book lover, gamer/skier, museum, royal trivia, Christmas market, festive mug) replace the hand-coded SVG mini-me on the About cards. They look much more like me than the SVG did, and the SVG component is deleted.
- **Kit fixes:** the kit's `book-lover.png` was a bad crop (half the gamer, half the market), and `royal-trivia.png` was really a 3×2 sheet of all six. The book and royal tiles were cut from the sheet.
- **Weight:** with `sharp`, 2.7 MB of PNGs became six 512×512 WebPs of about 11 KB each. Re-encoding also strips any metadata, and the privacy test checks every file in `public/images`.
- **Theming:** each illustration fills its card edge to edge as a square with its own cream background, so it reads as artwork in Light, Dark and Festive with no recolouring. `alt=""`, because the card title right below says the same thing.

## 033 — Mobile header and full-screen menu · 2026-11-17

- **Problem:** the site was already responsive, but on a phone the header took three rows (about 195px): logo, then languages and theme, then a sideways-scrolling nav. That's a quarter of the screen before any content.
- **Chosen:** an app-like menu. Below 1024px the header is one row (logo plus a menu button). The button opens a full-screen menu with big Fraunces links, the current page in the brand colour, and languages and theme at the bottom, within thumb reach. Desktop is unchanged. A bottom tab bar, an installable PWA and Figma-first designs were the alternatives.
- **Why a native `<dialog>`:** `showModal()` gives focus trapping, Escape to close, an inert page behind and focus returning to the button, all for free. The menu also closes on any route change, including a language switch. `html:has(dialog[open])` stops the page scrolling underneath.
- **Breakpoint found by testing:** 768px was the first plan, but German labels pushed the theme button off-screen at tablet width, so the switch moved to 1024px. A regression test checks that the German header fits at 1024px.
- **Two theme toggles:** the header and the menu each render one, so the toggle now watches `data-theme` and both labels stay in sync.
- **Tests:** a phone e2e test checks the header is a single row, the menu opens, `aria-current` is set, axe passes with the menu open, a link navigates and closes it, and Escape closes it.

## 034 — Advent calendar, gift shelf and cocoa contact in Festive mode · 2026-11-18

- **Problem:** Festive mode only recoloured the site and added snow, lights and the Christmas avatar. The prototype (`docs/design/christmas-mode.html`) had three Christmas-only sections that never shipped, and the Figma Festive frame was also just the Light layout recoloured.
- **Chosen:** the three prototype sections, Festive only. An advent calendar with 24 doors on the home page, between the case studies and the shelf. The shelf becomes "Under my Christmas tree", with snow on top of each cover. The contact block becomes "Let's grab a hot cocoa", with a mug in place of the coffee cup. The sweater band, the "Let it snow" toggle and the Santa-hat logo stay in the prototype for now.
- **Theme swap without JavaScript:** like the hero avatar, each section renders both texts and the `festive:` variant shows one. Server-rendered pages stay the same for every theme, and the theme script already sets `data-theme` before first paint.
- **Real dates:** in December, doors up to today's date can be opened, and from Christmas Eve all 24 can. The rest of the year every door is locked and the calendar says doors open on 1 December. The date is read on the client, so a cached page never fixes the day. The rule lives in `advent-day.ts` and has its own unit test.
- **Achievement:** opening a door unlocks a seventh achievement, Elf. Opened doors are saved with the other achievement progress in localStorage, so they stay open on a return visit. The About board now shows seven cards per row.
- **Surprises:** 24 short messages in four languages, all true facts about me or hints for the other achievements. The Konami hint is on day 10 and a four-language Christmas greeting is on day 24.
- **Accessibility:** each door is a button whose label says what it does: "Open day 7", "Day 11, opens on 11 December", or the surprise itself once open. The opened count is a polite live region. The door flip only animates with `motion-safe`.
- **Tests:** an e2e test fixes the clock to 10 December, checks that a future door is disabled, opens a door, and expects the Elf toast and the surprise label. Axe passes in Festive mode.
- **Lesson:** the e2e config reuses any server already on port 3100, and an old `next start` there made the new test fail against a stale build. Kill the port and rebuild before trusting an e2e run.

## 035 — Colour and theme audit · 2026-11-18

- **Checked:** WCAG contrast for every text/background token pair in Light, Dark and Festive. All text passes AA; the lowest is muted text in the contact block at 5.0:1. Card borders are 1.2–1.5:1, which is fine because they're decorative: the cards are readable without them.
- **Advent doors:** the yellow focus ring was 2.1:1 on cream, below the 3:1 a focus indicator needs, so it's now the primary red (5.9:1). Locked doors used a grey-out filter that turned the palette into maroon, khaki and olive. I first swapped that for pale dashed tiles, but before December every door is locked, so the whole calendar went pale pink and lost the festive red, green and gold. Final choice: every door keeps its festive colour, and a small lock icon marks the locked ones.
- **System dark mode:** with no saved choice, the site now follows the visitor's light/dark setting (December still defaults to Festive). The trade-off is that dark-mode visitors unlock Night owl without trying, the same way December visitors already unlock Ho ho ho.
- **Browser bar:** the theme script keeps a `theme-color` meta on the current page background, so the mobile browser bar matches the theme. The script turned out to be emitted twice in the server HTML, so the meta part reuses an existing tag.
- **Tokens instead of hex:** the dark achievement pop-ups and the text on yellow stickers were hard-coded Light-theme plum. They're now `--toast-*` and `--brand-on-highlight` tokens, near-black red in Festive. The CV keeps its fixed print colours.
- **Festive copy:** the hero greeting becomes "Boas festas · Buon Natale · Frohe Weihnachten · Merry Christmas", and the footer says "hot cocoa and Christmas lo-fi", in all four languages.
- **December bugs found by testing:** running the suite with the clock set to December failed 13 tests. Two were real bugs that would have reached visitors on 1 December. (1) Openable advent doors already contained their hidden surprise text, so the button's text didn't match its label (axe `label-content-name-mismatch`); surprises now render only once a door is open. (2) `festive:block` beat `print:hidden` in the CSS order, so the string lights printed and pushed the CV onto a second page; it's now `print:hidden!`. The rest assumed the Light theme.
- **Tests:** the e2e clock is pinned to November so the suite passes all year. New tests check the system dark default and the `theme-color` tag, and that December defaults to Festive, passes axe with doors openable, and prints the CV on one page.

## 036 — "Let it snow" switch · 2026-11-18

- **Problem:** in Festive mode the snow always fell. Some visitors find moving particles distracting while reading, and the only way to stop it was to leave the theme or turn on reduced motion system-wide.
- **Chosen:** the prototype's "Let it snow" chip, next to the language switcher in the header and in the mobile menu. It's a toggle button (`aria-pressed`), filled red when snow is on, and on by default.
- **State:** a small Zustand store, persisted to localStorage, so the choice survives reloads and the header and menu chips stay in sync. Like the achievements store, it rehydrates on mount so the server HTML and the first client render match.
- **When it shows:** only in Festive, and hidden for visitors who prefer reduced motion, because snow never falls for them and a switch that does nothing would be confusing.
- **Konami still wins:** the blizzard ignores the switch, because typing the code is an explicit request for snow.
- **Header width:** the German label "Lass es schneien" pushed the 1024px header to 1096px. Below 1280px the header chip shows only the snowflake and keeps the full label for screen readers. The mobile menu always shows the label. The 1024px German header test now also runs in Festive.
- **Tests:** an e2e test switches snow off, checks the canvas stops, reloads, and checks it stays off.

## 037 — Free custom domain: biancaespindola.is-a.dev · 2026-11-19

- **Supersedes 007**, which kept `biancaespindola.netlify.app` because a paid domain wasn't worth it yet.
- **Chosen:** [is-a.dev](https://is-a.dev), a free subdomain service for developers' personal, non-commercial sites. Registration is a pull request to `is-a-dev/register` adding JSON files with DNS records; I opened it myself, as their rules ask for no AI-generated requests.
- **Records:** `biancaespindola.json` with an A record to Netlify's load balancer (75.2.60.5), and `www.biancaespindola.json` with a CNAME to `biancaespindola.netlify.app`. Contact: GitHub username plus Discord, keeping my personal email off a public repo.
- **Timeline:** PR is-a-dev/register#61787 opened 2026-11-18 and was approved and merged the same day. DNS was live by the next morning.
- **Netlify:** added the domain as primary, with `www` redirecting to it. The first Let's Encrypt attempt failed; re-running the DNS check and provisioning the certificate worked within about 3 minutes. HTTP redirects to HTTPS.
- **One address:** a forced 301 in `netlify.toml` sends `biancaespindola.netlify.app/*` to the same path on the new domain, so search engines don't see two copies of the site. Deploy previews live on other hostnames and aren't affected.
- **Absolute language links:** `metadataBase` is set to the new domain, so the `hreflang` alternates are full URLs (`https://biancaespindola.is-a.dev/en`) instead of `/en`, which search engines need.
- **Links elsewhere:** the GitHub profile README and the repo's website field now point to the new domain.

## 038 — Findable by name: SEO basics · 2026-11-19

- **Problem:** with the new domain live, Google still had nothing to work with. There was no `robots.txt` or sitemap, no canonical links, the language links only existed for the home pages, nothing for link previews, and nothing machine-readable saying who the site is about.
- **Sitemap and robots:** `app/sitemap.ts` lists all 32 pages (8 pages × 4 languages), each with its language alternates. `app/robots.ts` allows everything and points to the sitemap. The proxy already skips paths with a dot, so both are served as-is.
- **One helper per page:** `pageMetadata()` in `src/i18n/seo.ts` gives every page its title, description, canonical URL, the same page in the other languages, plus `x-default`, and link-preview tags. `x-default` is the path without a locale, which the proxy already sends to the visitor's language. Before this, every subpage advertised the home pages as its translations.
- **Share image:** a 1200×630 card with my name, role and the reframed photo, rendered with the site's own fonts in Playwright. I first used Next's `opengraph-image` file convention, but it only reached the home page: pages that set their own link-preview tags dropped it, and it was served from an odd `/-/` path. It's now `public/images/og.png`, referenced explicitly, which also puts it under the image privacy test.
- **Who the site is about:** schema.org `Person` structured data on the home page with my name and its accented spelling, role, employer, city, languages, and `sameAs` links to LinkedIn and GitHub. Those links help Google treat the three profiles as one person. Everything in it is already on the site.
- **LinkedIn:** my profile moved to `linkedin.com/in/espindolabianca`. The site, the design prototypes and the GitHub profile README now use it.
- **Google Search Console:** added as a URL-prefix property. The HTML-tag method failed: Google checks `/`, which the proxy redirects to a language, so the checker never saw the tag. The HTML-file method worked, because paths with a dot skip the proxy. Both stay on the site, since removing either can un-verify it. The sitemap was read straight away (32 pages discovered). A manual "request indexing" hit the new property's daily quota; it's optional, because the sitemap already queues every page.
- **Tests:** an e2e test checks robots, the sitemap count, a canonical link and share image on a translated subpage, and the structured data's name and LinkedIn link.

## 039 — A personal project: a brand and document system · 2026-11-19

- **Problem:** I built a full brand and clinical document kit for a family member, a home-care physiotherapist in Rio de Janeiro: logo, brand guide, stationery, and 13 print and Word templates. It shows real skills, but it was unpaid family help, not a job. My employment contract doesn't allow side work, so it must not read as freelance work.
- **First try, rejected:** a dateless "Freelance" entry in the experience list, right after ComeOn. Hiding the dates wasn't enough: the label and the position still said "paid side work during my current job".
- **Where it lives now:** a separate `projects` list in `src/content/experience.ts`. On the CV, it's a "Projects" section under Experience, labelled "Personal project". On the Work page, it's its own section after the job timeline. The context line says it was for a family member. Projects have no dates by design.
- **Anonymous client:** her name only goes public if she agrees.
- **Evidence without personal data:** the Work page shows five previews: the business card, the letterhead, page 1 of the assessment form, the exercise sheet and the privacy notice. The real documents carry her name, WhatsApp, email and professional registration number. Blurring them would look redacted, so I swapped in a made-up name ("Ana Souza") and placeholder contacts in a copy of the project, re-ran the card generator and rendered the other pages from their HTML. The pipeline is single-source, so this was a text swap, and the result looks like the real thing. A note under the gallery says the data is made up. The exercise illustrations are AI-generated, so no real person appears. The images sit at the top level of `public/images`, so the image privacy test covers them.
- **What to show:** the engineering, not just the design. Each document is written once as HTML/CSS. Headless Chrome renders the PDF, and docx-js builds the Word file from the same source, so the two never drift apart.
- **Tests:** the CV still fits on one A4 page in all four languages, and axe passes on both pages.

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
- **2026-11-17:** pushed 042d92d with a failing e2e test (my script grepped the output instead of checking the exit code). The overflow test was flagging the zoomed hero photo, which its circle clips. Fixed the test to ignore ancestor-clipped content and confirmed it still catches the German overflow bug.
- **2026-11-17:** Christmas avatar in Festive mode.
- **2026-11-17:** award photo added to the Make It Happen card (4:5, anchored at the bottom so the trophy text stays in frame). The Work sidebar is no longer sticky: with the photo it's taller than the viewport, and a sticky element taller than the screen hides its own bottom.
- **2026-11-17:** removed the old 2023 iPhone photos from the site and added a Vitest guard that parses each image's EXIF and fails on GPS, camera make or model (verified against an old iPhone photo). They still exist in git history; the planned history purge (decision 006) should drop them too.
- **2026-11-17:** About page with my story, fun facts and four new photos, cropped to keep other people out.
- **2026-11-17:** language levels updated: English is now bilingual (was C1), Italian A2 (was A1), on About and the CV in all four languages.
- **2026-11-17:** fun-fact photos replaced by a hand-coded SVG mini-me (curly hair, no glasses, six outfits).
- **2026-11-17:** mini-me hair changed from tight curls to long waves.
- **2026-11-17:** case study pages (3 + index); soft-404 found and fixed with static routes. About map: Bari, Italy.
- **2026-11-17:** delight features: achievements + board, festive snow and string lights, Konami blizzard.
- **2026-11-17:** history purged (CVs + old photos incl. one with GPS); live v1 no longer serves the CV.
- **2026-11-17:** personal logo + favicon from my logo kit, recoloured by theme tokens.
- **2026-11-17:** old Netlify deploy deleted, GitHub Support ticket sent; the new site is live on biancaespindola.netlify.app.
- **2026-11-17:** fun-fact avatars replaced by my illustrated set; the SVG mini-me was retired.
- **2026-11-17:** mobile version: a one-row header and a full-screen menu below 1024px.
- **2026-11-18:** Festive mode gets an advent calendar (new Elf achievement), the Christmas-tree shelf and the hot-cocoa contact block, in four languages.
- **2026-11-18:** colour audit: advent focus and locked doors, system dark mode, browser bar colour, festive tokens and copy; two December-only bugs found and fixed before December.
- **2026-11-18:** "Let it snow" switch in Festive mode, remembered across visits.
- **2026-11-18:** hero photo reframed to match the Christmas avatar: both faces measured by eyes and mouth in the source images, so the face sits in the same spot and at the same size when the theme changes (zoom 2.2 → 2.87).
- **2026-11-19:** biancaespindola.is-a.dev is live with HTTPS, as the primary domain on Netlify.
- **2026-11-19:** SEO basics (sitemap, robots, canonical and language links, share image, Person data) and the new LinkedIn URL.
- **2026-11-19:** verified in Google Search Console and submitted the sitemap; Google discovered all 32 pages.
- **2026-11-19:** added a personal project, the brand and document system for a family member, to the CV and the Work page, kept apart from the job history. The Work page shows a gallery of the documents with a made-up name and contacts.
