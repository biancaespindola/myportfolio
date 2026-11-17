# Bianca Espindola — Portfolio v2

Personal portfolio and CV. Warm, cute, a little nerdy, in four languages (EN · PT · IT · DE).

- **Plan:** [docs/PLAN.md](docs/PLAN.md)
- **Decision log** (source for the "How I built this site" case study): [docs/case-study/decisions.md](docs/case-study/decisions.md)
- **Design:** [Figma](https://www.figma.com/design/Qw47mG7PdVWPnss9eQ5VFt) · HTML prototypes in [docs/design](docs/design)

## Stack

Next.js 16 (App Router, Cache Components, React Compiler) · React 19 · TypeScript 7 · Tailwind CSS 4 · Biome · Vitest · Playwright + axe

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` / `pnpm start` | Production build / serve |
| `pnpm lint` | Biome lint + format check |
| `pnpm typecheck` | Generate route types, run `tsc` |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm e2e` | Playwright end-to-end + axe accessibility checks (needs a build) |
