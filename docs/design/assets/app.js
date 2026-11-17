// Prototype runtime: icon sprite, nav/footer, theme switch, achievements.
const ICONS = {
  star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
  trophy:
    '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  gamepad:
    '<path d="M6 11h4"/><path d="M8 9v4"/><path d="M15 12h.01"/><path d="M18 10h.01"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>',
  tree: '<path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"/><path d="M12 22v-3"/>',
  heart:
    '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  coffee:
    '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M6 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>',
  code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
  shield:
    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  globe:
    '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  command:
    '<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>',
  printer:
    '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
  arrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  download:
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
};
const icon = (name, cls = "ico") =>
  `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v === null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  },
};

export const ACHIEVEMENTS = [
  { id: "explorer", name: "Explorer", hint: "Visit every page" },
  { id: "polyglot", name: "Polyglot", hint: "Switch the language" },
  { id: "bookworm", name: "Bookworm", hint: "Find the bookshelf" },
  { id: "nightowl", name: "Night owl", hint: "Try dark mode" },
  { id: "hohoho", name: "Ho ho ho", hint: "Find December mode" },
  { id: "konami", name: "Konami", hint: "You know the code" },
];
const PAGES = ["work", "case-study", "cv", "about"];

let toastTimer;
function showToast(message) {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.append(el);
  }
  el.innerHTML = `<div class="medal">${icon("trophy")}</div><div><div class="pixel">Achievement unlocked</div><strong>${message}</strong></div>`;
  requestAnimationFrame(() => el.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
}

export function unlock(id) {
  const got = new Set(store.get("achievements", []));
  if (got.has(id)) return;
  got.add(id);
  store.set("achievements", [...got]);
  const a = ACHIEVEMENTS.find((x) => x.id === id);
  showToast(`${a.name}: ${a.hint.toLowerCase()}`);
  document.dispatchEvent(new CustomEvent("achievements:change"));
}
export const unlocked = () => new Set(store.get("achievements", []));

const THEMES = [
  { id: "light", label: "Light", icon: "sun" },
  { id: "dark", label: "Dark", icon: "moon" },
  { id: "festive", label: "Festive", icon: "tree" },
];
const LANGS = ["EN", "PT", "IT", "DE"];

function applyTheme(id) {
  document.documentElement.dataset.theme = id;
  store.set("theme", id);
  const t = THEMES.find((x) => x.id === id);
  const btn = document.getElementById("themeBtn");
  if (btn) btn.innerHTML = `${icon(t.icon)}${t.label}`;
  if (id === "dark") unlock("nightowl");
  if (id === "festive") unlock("hohoho");
}

function renderChrome() {
  const page = document.body.dataset.page;
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${Object.entries(
      ICONS,
    )
      .map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`)
      .join("")}</svg>`,
  );
  const nav = document.querySelector("[data-nav]");
  if (nav) {
    const links = [
      ["work", "Work", "work.html"],
      ["case-study", "Case studies", "case-study.html"],
      ["about", "About", "about.html"],
      ["cv", "CV", "cv.html"],
    ];
    nav.outerHTML = `
      <div class="site-lights" aria-hidden="true"><svg viewBox="0 0 1200 30" preserveAspectRatio="none">${lightsSvg()}</svg></div>
      <div class="wrap"><nav class="site-nav" aria-label="Main">
        <a class="logo" href="index.html">${icon("star")}bianca</a>
        <div class="nav-links">${links
          .map(
            ([id, label, href]) =>
              `<a href="${href}"${id === page ? ' aria-current="page"' : ""}>${label}</a>`,
          )
          .join("")}</div>
        <div class="nav-tools">
          <button class="chip pixel" id="langBtn" aria-label="Change language">${icon("globe")}<span>${store.get("lang", "EN")}</span></button>
          <button class="chip pixel" id="themeBtn" aria-label="Change theme"></button>
        </div>
      </nav></div>`;
  }
  const footer = document.querySelector("[data-footer]");
  if (footer) {
    footer.outerHTML = `<div class="wrap"><footer class="site-footer">
      <span>Built with Next.js 16, coffee and lo-fi · © 2026 Bianca Espindola</span>
      <span class="pixel">↑ ↑ ↓ ↓ ← → ← → B A</span></footer></div>`;
  }
}

function lightsSvg() {
  const colors = ["#c1121f", "#e0a526", "#14532d", "#2f80ed"];
  let wire = "M0 4 ";
  let bulbs = "";
  for (let i = 0; i <= 24; i++) {
    const x = i * 50;
    wire += `Q ${x + 25} 18 ${x + 50} 4 `;
    bulbs += `<g class="bulb"><ellipse cx="${x + 25}" cy="20" rx="5" ry="8" fill="${colors[i % colors.length]}"/></g>`;
  }
  return `<path d="${wire}" stroke="#2b1416" stroke-width="2" fill="none"/>${bulbs}`;
}

function wire() {
  const themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const cur = document.documentElement.dataset.theme || "light";
      const next =
        THEMES[(THEMES.findIndex((t) => t.id === cur) + 1) % THEMES.length];
      applyTheme(next.id);
    });
  }
  const langBtn = document.getElementById("langBtn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const cur = store.get("lang", "EN");
      setLang(LANGS[(LANGS.indexOf(cur) + 1) % LANGS.length]);
    });
  }
  const code = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let pos = 0;
  addEventListener("keydown", (e) => {
    pos = e.key === code[pos] ? pos + 1 : e.key === code[0] ? 1 : 0;
    if (pos === code.length) {
      pos = 0;
      unlock("konami");
    }
  });
  const shelf = document.querySelector("[data-bookshelf]");
  if (shelf && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          unlock("bookworm");
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(shelf);
  }
  const page = document.body.dataset.page;
  if (PAGES.includes(page)) {
    const visited = new Set(store.get("visited", []));
    visited.add(page);
    store.set("visited", [...visited]);
    if (PAGES.every((p) => visited.has(p))) unlock("explorer");
  }
}

export function setLang(next) {
  store.set("lang", next);
  const label = document.querySelector("#langBtn span");
  if (label) label.textContent = next;
  document.documentElement.lang = next.toLowerCase();
  document.dispatchEvent(new CustomEvent("lang:change", { detail: next }));
  if (next !== "EN") unlock("polyglot");
}
export const getLang = () => store.get("lang", "EN");

export { icon };

renderChrome();
document.documentElement.dataset.theme = store.get("theme", "light");
applyTheme(document.documentElement.dataset.theme);
wire();
