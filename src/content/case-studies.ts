import type { CaseStudySlug } from "./home";

/** Long-form case studies, English-first (decision 008). */
export type CaseStudy = {
  slug: CaseStudySlug;
  title: string;
  lead: string;
  meta: { role: string; timeline: string; stack: string };
  problem: { title: string; body: string };
  constraints: { title: string; items: string[] };
  options: {
    title: string;
    items: { name: string; text: string; chosen?: boolean }[];
  };
  decision: { title: string; quote: string; source?: string };
  outcome: {
    title: string;
    metrics: { value: string; label: string }[];
    body?: string;
  };
  learned: { title: string; body: string };
};

export const caseStudyContent: Record<CaseStudySlug, CaseStudy> = {
  "this-site": {
    slug: "this-site",
    title: "How I built this site",
    lead: "My 2023 portfolio was a hero, an About section and a CV that leaked my phone number. This is how I rebuilt it to feel like meeting me, in four languages, with every decision written down.",
    meta: {
      role: "Design + frontend",
      timeline: "Nov 2026 — ongoing",
      stack: "Next.js 16 · TypeScript 7 · Tailwind 4",
    },
    problem: {
      title: "It didn’t sound like me",
      body: "The old site was a template with my name on it: no projects, no story, a dark-mode button that did nothing, and a public CV with my birth date, phone number and home address.",
    },
    constraints: {
      title: "Four languages, 30-second readers",
      items: [
        "Recruiters skim: role, experience and CV must be visible right away",
        "EN, PT, IT and DE: native in one, bilingual in another, still learning the other two",
        "Free hosting and a free Figma plan (one mode, three pages, a tool-call quota)",
        "No personal data in the repo, ever again",
      ],
    },
    options: {
      title: "Three ways forward",
      items: [
        { name: "Patch v1", text: "Fast, but keeps every structural bug." },
        {
          name: "Astro",
          text: "Great for content, less overlap with my day job.",
        },
        {
          name: "Next.js 16",
          text: "The stack I use at work, with server components and i18n routing built in.",
          chosen: true,
        },
      ],
    },
    decision: {
      title: "Rebuild, and write it all down",
      quote:
        "Every choice gets a log entry: context, options, decision, trade-offs. This page is written from that log.",
      source: "docs/case-study/decisions.md",
    },
    outcome: {
      title: "What changed",
      metrics: [
        {
          value: "4",
          label: "languages, typed so a missing translation fails the build",
        },
        {
          value: "30+",
          label:
            "browser tests, incl. accessibility checks in every language and theme",
        },
        {
          value: "0",
          label: "photos with GPS or camera data; a test enforces it",
        },
      ],
      body: "The tests caught real bugs on the way: a theme button whose accessible name didn’t match its label, a notification that lost contrast in dark mode, and long German words overflowing on phones.",
    },
    learned: {
      title: "Constraints are design input",
      body: "Figma’s one-mode limit pushed me to name design tokens exactly like the CSS variables they became. When the Figma quota ran out, prototyping in HTML got me closer to the real thing, faster. And writing decisions down made them quicker, not slower.",
    },
  },

  sportsbook: {
    slug: "sportsbook",
    title: "Sportsbook features at ComeOn",
    lead: "Building betting features that have to be fast, clear and correct for players in three languages, as the main frontend developer in my team.",
    meta: {
      role: "Frontend developer",
      timeline: "Apr 2024 — now",
      stack: "React · Next.js · TypeScript",
    },
    problem: {
      title: "Complex bets, simple screens",
      body: "Features like Boosted Odds and Bet Builder pack a lot of rules into a small screen. Players need to understand what they’re getting at a glance, in English, Brazilian Portuguese or Austrian German.",
    },
    constraints: {
      title: "What made it tricky",
      items: [
        "Three locales in every release: EN, PT-BR and DE-AT",
        "Designs arrive in Figma and need to become responsive, accessible components",
        "Components get reused across features, so they have to be flexible and documented",
      ],
    },
    options: {
      title: "How to build it",
      items: [
        {
          name: "One-off screens",
          text: "Quick for a single feature, but every new feature starts from zero.",
        },
        {
          name: "Reusable components + docs",
          text: "More work up front, but each feature makes the next one faster.",
          chosen: true,
        },
      ],
    },
    decision: {
      title: "Turn client problems into building blocks",
      quote:
        "I start from the client’s problem, not the ticket, and leave behind components and docs the whole team can reuse.",
    },
    outcome: {
      title: "What changed",
      metrics: [
        { value: "3", label: "languages in every release: EN, PT-BR, DE-AT" },
        {
          value: "2026",
          label: "Make It Happen award, ComeOn Summer Awards",
        },
      ],
      body: "I can’t share internal numbers or unreleased screens, but this work earned me the Make It Happen award at the ComeOn Summer Awards 2026.",
    },
    learned: {
      title: "Listening is a frontend skill",
      body: "The best solutions came from asking one more question before writing code. Translating a client’s problem well matters as much as translating the UI.",
    },
  },

  "iomt-security": {
    slug: "iomt-security",
    title: "Securing a cardiac wearable",
    lead: "My Computer Engineering thesis: can a small ECG wearable encrypt its data without slowing down? Published at SBSEG 2022.",
    meta: {
      role: "Researcher",
      timeline: "Thesis · 2022",
      stack: "C++ · ESP32 · MQTT · cryptography",
    },
    problem: {
      title: "Health data on an open network",
      body: "Medical IoT devices are spreading fast. A cardiac wearable that sends ECG readings over wireless and remote networks is an easy target for man-in-the-middle and eavesdropping attacks, yet it has very little computing power for encryption.",
    },
    constraints: {
      title: "Tiny device, real-time data",
      items: [
        "Low-power hardware with limited CPU and memory",
        "ECG signals have to arrive on time, so latency matters",
        "The security layer must not cut throughput",
      ],
    },
    options: {
      title: "Three algorithms",
      items: [
        {
          name: "AES-256 CBC",
          text: "The established standard, and the best latency and throughput in our tests.",
          chosen: true,
        },
        {
          name: "SPECK",
          text: "A lightweight block cipher designed for constrained devices.",
        },
        {
          name: "CLEFIA",
          text: "A lightweight block cipher standardised for embedded use.",
        },
      ],
    },
    decision: {
      title: "Measure, don’t guess",
      quote:
        "We implemented all three on the wearable and ran load tests, measuring latency and throughput while ECG signals were being sent.",
      source: "B. Manoel et al., SBSEG 2022, pp. 97–110",
    },
    outcome: {
      title: "What we found",
      metrics: [
        { value: "3", label: "algorithms implemented and load-tested" },
        { value: "AES-256", label: "best results for latency and throughput" },
        { value: "1", label: "peer-reviewed paper, SBSEG 2022" },
      ],
      body: "All three performed well enough, which shows a security layer is feasible on an IoMT device. AES-256 CBC came out on top, making it the best fit for the cardiac wearable.",
    },
    learned: {
      title: "Trade-offs, measured",
      body: "This project taught me to back decisions with data. I still use that habit in frontend work: when two options look equal, I measure.",
    },
  },
};
