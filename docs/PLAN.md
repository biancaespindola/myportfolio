# Portfolio v2 — Plan

Started 2026-11-17. Branch: `rebuild-nextjs`. Decisions and their reasoning live in [case-study/decisions.md](case-study/decisions.md). That file is the raw material for the "How I built this site" case study.

## 1. Who the site is about

| Trait                                                    | How the site shows it                                                                                                                                     |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Warm, friendly, people person                            | Warm palette (🧡 orange, cream, cocoa), rounded shapes, first-person copy, "Kind words" from colleagues, "Let's grab a coffee ☕" contact CTA             |
| Problem solver                                           | Projects are written as case studies: **Problem → Constraints → Options → Decision → Outcome → What I learned**                                           |
| Cute + nerd                                              | Small illustrated touches (a pixel-art avatar or sticker set), nerdy microcopy, a hidden easter egg                                                       |
| Gamer                                                    | **Achievements**: toasts like "🏆 Explorer: visited every page", "Bookworm: opened the bookshelf". Konami code unlocks something silly                    |
| Book lover                                               | **Bookshelf** on /about: currently reading, all-time favourites                                                                                           |
| Loves Christmas                                          | **Seasonal theme**: in December the site switches on its own to a festive palette with gentle snow (respects `prefers-reduced-motion`, can be turned off) |
| Half Italian, half Brazilian, lives abroad, travel lover | "Journey" strip: Brazil → Italy/Austria → now. Site in EN / PT / IT / DE                                                                                  |
| Coffee + music while coding                              | Footer: "Built with ☕ and 🎧", plus an optional "Now playing"                                                                                            |

Tone: friendly and confident, not corporate. Fun extras never get in the way of a recruiter skimming the page in 30 seconds.

## 2. Pages

- `/` **Home**: hero (photo or illustration, one-line intro, CTA buttons: View work / Download CV), 3 highlights, featured case studies
- `/work`: experience timeline (ComeOn, Khomp, EJEC, LARM), skills grouped by what you _do_ with them, not by logo
- `/projects` + `/projects/[slug]`: case studies in MDX. **Case study #1 is this site.**
- `/cv`: web CV generated from the same data as the rest of the site. Print stylesheet means "Save as PDF" gives a clean CV, so there's no hand-edited Europass to keep in sync
- `/about`: story, bookshelf, games, languages, fun facts, publication (IoMT security paper, SBSEG 2022)
- `/contact`: email + LinkedIn + GitHub, friendly copy. No form in v1

## 3. Stack (versions checked on npm, 2026-11-17)

Picked for two things: what shows up in 2026 frontend job ads, and what's worth talking about in an interview. Each tech below has a story in the case study.

| Concern | Choice | Recruiter signal / why |
|---|---|---|
| Framework | **Next.js 16** App Router, React Server Components, Turbopack, Cache Components (`'use cache'`) | The default React meta-framework; you already use `'use cache'` at work |
| UI runtime | **React 19 + React Compiler 1.0** | Auto-memoisation instead of hand-written `useMemo`/`useCallback`. A current talking point |
| Language | **TypeScript** strict. Try **TS 7** (new Go-native compiler) at scaffold time; fall back to 6.x if Next/tooling don't support it yet | "Shipped on TS 7" is a strong, timely signal |
| Styling | **Tailwind CSS 4** (`@theme` tokens, CSS variables) | Industry default; tokens map 1:1 to Figma variables |
| Components | **shadcn/ui** (Radix primitives, code you own) | In most React job ads now; accessible by default |
| Design → code | **Figma variables** (light / dark / festive modes) → Tailwind `@theme` | Design tokens as a single source of truth; shows you can work with designers |
| Motion | **Motion 14** + **View Transitions API** for page transitions | Modern, native-feeling navigation; always respects `prefers-reduced-motion` |
| i18n | **Native Next 16 i18n**: `app/[lang]`, typed JSON dictionaries, `next/root-params`, `proxy.ts` (decision 018) | No dependency, works with Cache Components; you've shipped multilingual at ComeOn |
| Content | Typed TS data (`content/`) + **MDX** (`@next/mdx`) for case studies | One source for pages, CV, SEO, AI chat |
| Client state | **Zustand 5** + `persist` (achievements, theme) | Same pattern as at work |
| AI | **"Ask Bianca"**: chat that answers recruiter questions from your CV/case studies. Claude API (`claude-haiku-5-5`), streaming, rate-limited, spending cap. Plus `/llms.txt` | Biggest attention-grabber in 2026; shows practical AI integration, not hype. Optional, phase 5 |
| OG images | `next/og` per page + locale | Nice link previews on LinkedIn |
| Quality | **Vitest 5** + Testing Library, **Playwright 1.65** + **axe**, **Storybook 10** for components, **Lighthouse CI** | Storybook + a11y gate = senior-level habits, and fits your WCAG background |
| Lint/format | **Biome 2** (one fast tool instead of ESLint + Prettier) | Modern, fast; `next lint` is gone in 16 anyway |
| CI/CD | GitHub Actions (typecheck, Biome, tests, a11y, Lighthouse), Renovate, Conventional Commits | Visible, green README badges |
| Analytics | Privacy-friendly analytics (Umami/Plausible), no cookie banner | GDPR-friendly; you're in the EU |
| Hosting | Netlify (`@netlify/plugin-nextjs` 5), preview deploy per PR | URL continuity (decision 007). Vercel is more native to Next; revisit if Netlify blocks a feature |

Not included: TanStack Query (no client-side server state), Redux, a CMS (content lives in the repo), a backend database.

## 4. Phases

Each phase ends with a deploy preview and a decision-log entry.

0. ✅ **Setup** (2026-11-17, Netlify still to connect): scaffold Next.js on this branch, tooling, CI, Netlify preview. Move v1 to `legacy/` or tag `v1` so the "before" can be screenshotted for the case study.
1. **Design**: moodboard → tokens (colour, type, radius, spacing) → light / dark / festive themes → key screens in Figma: https://www.figma.com/design/Qw47mG7PdVWPnss9eQ5VFt (done 2026-11-17: tokens, components, Home desktop in 3 themes + mobile; palette switched to Berry & cream; Christmas mode prototype in `docs/design/christmas-mode.html`; Work, Case study, CV and About designed as HTML prototypes in `docs/design/` (index at `/docs/design/index.html`) after the Figma Starter MCP limit was hit).
2. **Content**: write `content/profile.ts`, `experience.ts`, `skills.ts`, `projects.ts` in EN; gather 2–3 testimonials; refresh the CV (see open questions).
3. **Core build** (Home ✅, Work ✅, About ✅, Case studies ✅ 2026-11-17): layout, nav, Home, Work, About, Contact, i18n routing, dark mode that actually works.
4. ✅ **CV page** (2026-11-17): `/[locale]/cv` + print CSS; check the PDF output in Chrome/Safari.
5. **Delight**: achievements, Konami easter egg, December theme + snow, bookshelf, optional "Ask Bianca" AI chat + `/llms.txt`.
6. **Quality**: Lighthouse ≥ 95 on every category, axe clean, keyboard-only pass, OG images per locale, sitemap, `hreflang`.
7. **Case study**: write "How I built this site" from `decisions.md` (EN first).
8. **Launch**: merge, swap Netlify to v2, update the GitHub profile README (it still says "learning React/Next" and "working on Voice Notes Ease").

## 5. v1 issues worth fixing (good "before" material)

- `<body>` rendered inside React (`App.jsx`). Invalid nesting
- Tailwind loaded twice: CDN `<script>` in `index.html` + PostCSS build
- Dark-mode toggle only swaps the icon; the theme never changes
- Nav links have `href=""`; no anchors or routes
- Images have empty `alt`
- No mobile layout (fixed two-column hero)
- **The public CV PDF contains date of birth, phone number and home address**, and it's outdated (Khomp listed as current)

## 6. Answers (2026-11-17)

| #   | Topic        | Answer                                                                                                                                                                             |
| --- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | ComeOn role  | Frontend Developer, since Apr 2024. Main frontend dev of the team; turns client problems into solutions. **"Make It Happen" award, Summer Awards 2026** (photos available)         |
| 2   | Location     | Graz, Austria                                                                                                                                                                      |
| 3   | Old CV PDF   | Purge from git history (see §7)                                                                                                                                                    |
| 4   | Domain       | Keep `biancaespindola.netlify.app` for now                                                                                                                                         |
| 5   | Translations | Phased: UI + CV in all 4 at launch (machine-translated, then reviewed by native speakers); case studies EN first                                                                   |
| 6   | Avatar       | Both: illustrated avatar in the hero, real photo on About/CV                                                                                                                       |
| 7   | Case studies | See §8                                                                                                                                                                             |
| 8   | Shelf        | **Books:** The Lord of the Rings, Anne of Green Gables (series), Pale Blue Dot, The Demon-Haunted World. **Games:** The Legend of Zelda (Ocarina of Time + series), Stardew Valley |

### Content facts from LinkedIn (more accurate than the old CV)

- **ComeOn Group**, Frontend Developer, Apr 2024 – now, Graz (on-site): sportsbook features (Boosted Odds, Bet Builder, dashboards) in React/Next.js; Figma → responsive UI; multilingual EN / PT-BR / DE-AT; documentation and reusable UI components.
- **Khomp**: Software Developer Jan 2021 – Feb 2022 (C/C++/PHP/JS, telecom); Front-end Developer Mar 2022 – Apr 2024 (remote; TS, React, MUI, Redux, Next.js; +20% accessibility via WCAG).
- **EJEC**: Frontend Developer Oct 2019 – Jan 2021; **Junior Head of HR** Dec 2019 – Jun 2020 (ran hiring, introduced 1:1s). This is evidence for "people person".
- **LARM**: Software Development Researcher 2017–2019 (C++, Python, ESP32, MQTT, cryptography).
- **UFSC**: BSc Computer Engineering 2015–2022; paper at SBSEG 2022.
- Your LinkedIn has no Honors section, so the Make It Happen award isn't there yet.

## 7. Purging the old CV (needs your go-ahead)

1. `git filter-repo --path src/assets/resumeBianca.pdf --invert-paths` on a fresh mirror clone
2. Force-push every branch and tag to GitHub
3. Redeploy the **live v1 Netlify site** without the PDF. The download button serves it publicly today, and the git purge doesn't touch Netlify.
4. Limits: anyone who already cloned or forked the repo, plus caches, may still have it. Treat the phone number and address as already exposed.

## 8. Case studies (in order)

1. **This site**: built from `decisions.md`.
2. **Sportsbook features at ComeOn**: Boosted Odds / Bet Builder, shipping in 3 locales, the Make It Happen award. Strongest and most recent; it's what recruiters want to see. **Check ComeOn's policy on public write-ups first.** No internal metrics, screenshots of unreleased work or code; describe the problem and approach at a high level.
3. **IoMT security thesis**: a real problem (securing ECG data on a wearable), measurable comparison of AES-256 CBC vs SPECK vs CLEFIA, published. It sets you apart from other frontend devs and shows engineering depth.
4. **Mini case on the Work page (not a full study): accessibility at Khomp** (+20% via WCAG). Cheap to write and backs up the a11y quality bar in this site.

Left out: VoiceNotesEase and design-system. Both were last touched in 2022–2024 with no live demo; an unfinished project weakens a case study page. They can go in a small "Playground" list linking to GitHub.

## 9. Still open

- ComeOn policy on public write-ups (ask your lead)
- Testimonials: who could write 2–3 lines (team lead, PO, Khomp colleague)?
- Award photo: one that's OK to publish
