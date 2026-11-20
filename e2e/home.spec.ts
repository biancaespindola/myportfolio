import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

// December switches visitors with no saved theme to festive; pin a November
// date so tests that expect the light theme pass all year.
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-11-18T10:00:00"));
});

// The achievement tracker listens for keys only after it has restored saved
// progress; recording the current language is the first thing it does then.
const trackerReady = (page: Page) =>
  page.waitForFunction(() =>
    localStorage.getItem("achievements")?.includes('"lastLocale"'),
  );

test("redirects / to the visitor's language", async ({ browser }) => {
  const context = await browser.newContext({ locale: "pt-BR" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/pt$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt");
  await context.close();
});

for (const lang of ["en", "pt", "it", "de"]) {
  for (const path of [
    "",
    "/work",
    "/cv",
    "/about",
    "/case-studies",
    "/case-studies/this-site",
    "/projects",
  ]) {
    test(`/${lang}${path} has no axe violations`, async ({ page }) => {
      await page.goto(`/${lang}${path}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const { violations } = await new AxeBuilder({ page }).analyze();
      expect(violations).toEqual([]);
    });
  }

  test(`/${lang}/cv prints on one A4 page without site chrome`, async ({
    page,
  }) => {
    await page.goto(`/${lang}/cv`);
    await page.emulateMedia({ media: "print" });
    await expect(page.locator("header").first()).toBeHidden();
    const sheet = page.getByRole("article");
    await expect(
      sheet.getByRole("img", { name: "Bianca Espindola" }),
    ).toBeVisible();
    const pdf = await page.pdf({ format: "A4", printBackground: true });
    const pages = pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? [];
    expect(pages.length).toBe(1);
  });
}

test("work page lists experience with localized dates", async ({ page }) => {
  await page.goto("/de/work");
  const experience = page.getByRole("region", { name: "Berufserfahrung" });
  await expect(experience.getByRole("heading", { level: 3 })).toHaveCount(5);
  await expect(page.getByText("Apr. 2024 — heute")).toBeVisible();
  await expect(
    page.getByRole("img", { name: /Make-It-Happen-Trophäe/ }),
  ).toBeVisible();
});

test("long German words don't overflow on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const path of [
    "/de",
    "/de/work",
    "/de/about",
    "/de/projects",
    "/de/case-studies/iomt-security",
  ]) {
    await page.goto(path);
    const overflowing = await page.evaluate(() => {
      const clippedByAncestor = (el: Element) => {
        for (let a = el.parentElement; a; a = a.parentElement) {
          const { overflowX } = getComputedStyle(a);
          if (overflowX === "hidden" || overflowX === "clip") return true;
        }
        return false;
      };
      return [...document.querySelectorAll("main *")]
        .filter(
          (el) =>
            el.checkVisibility() &&
            !el.closest("[aria-hidden]") &&
            !clippedByAncestor(el) &&
            el.getBoundingClientRect().right > window.innerWidth + 1,
        )
        .map((el) => `${el.tagName} ${el.textContent?.slice(0, 40)}`);
    });
    expect(overflowing, path).toEqual([]);
  }
});

test.describe("on a phone", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("the header is one row and the menu opens, navigates and closes", async ({
    page,
  }) => {
    await page.goto("/de");
    const header = page.locator("header").first();
    expect((await header.boundingBox())?.height).toBeLessThan(120);
    await expect(
      header.getByRole("navigation", { name: "Hauptmenü" }),
    ).toBeHidden();

    await page.getByRole("button", { name: "Menü", exact: true }).click();
    const menu = page.getByRole("dialog", { name: "Menü" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "Start" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(
      menu.getByRole("button", { name: /^Design wechseln/ }),
    ).toBeVisible();
    const { violations } = await new AxeBuilder({ page }).analyze();
    expect(violations).toEqual([]);

    await menu.getByRole("link", { name: "Arbeit" }).click();
    await expect(page).toHaveURL(/\/de\/work$/);
    await expect(menu).toBeHidden();

    await page.getByRole("button", { name: "Menü", exact: true }).click();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
  });
});

test("desktop keeps the inline nav, and the German header fits at 1024px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/de");
  const header = page.locator("header").first();
  await expect(
    header.getByRole("navigation", { name: "Hauptmenü" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Menü", exact: true }),
  ).toBeHidden();
  const theme = await header
    .getByRole("button", { name: /^Design wechseln/ })
    .boundingBox();
  expect((theme?.x ?? 0) + (theme?.width ?? 0)).toBeLessThanOrEqual(1024);

  // Festive adds the snow chip to the same row.
  await page.evaluate(() => localStorage.setItem("theme", "festive"));
  await page.reload();
  await expect(
    header.getByRole("button", { name: "Lass es schneien" }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(1024);
});

for (const theme of ["dark", "festive"]) {
  test(`${theme} theme has no axe violations`, async ({ page }) => {
    await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    const { violations } = await new AxeBuilder({ page }).analyze();
    expect(violations).toEqual([]);
  });
}

test("with no saved choice, the theme follows the system and sets the browser bar colour", async ({
  browser,
}) => {
  const context = await browser.newContext({ colorScheme: "dark" });
  const page = await context.newPage();
  // Outside December, which defaults to festive instead.
  await page.clock.setFixedTime(new Date("2026-11-18T10:00:00"));
  await page.goto("/en");
  const html = page.locator("html");
  const themeColor = page.locator('meta[name="theme-color"]');
  await expect(html).toHaveAttribute("data-theme", "dark");
  await expect(themeColor).toHaveCount(1);
  await expect(themeColor).toHaveAttribute("content", "#1a1220");

  await page
    .getByRole("button", { name: /^Change theme/ })
    .first()
    .click();
  await expect(html).toHaveAttribute("data-theme", "festive");
  await expect(themeColor).toHaveAttribute("content", "#fff8f1");
  await context.close();
});

test("in December, festive is the default and stays accessible and printable", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2026-12-10T10:00:00"));
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "festive");
  await expect(page.getByRole("button", { name: "Open day 10" })).toBeEnabled();
  const { violations } = await new AxeBuilder({ page }).analyze();
  expect(violations).toEqual([]);

  await page.goto("/en/cv");
  await page.emulateMedia({ media: "print" });
  const pdf = await page.pdf({ format: "A4", printBackground: true });
  const pages = pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? [];
  expect(pages.length).toBe(1);
});

test("theme toggle cycles and persists", async ({ page }) => {
  await page.goto("/en");
  const html = page.locator("html");
  await page.getByRole("button", { name: /^Change theme/ }).click();
  await expect(html).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "dark");
});

test("hero shows the photo, or the Christmas avatar in festive mode", async ({
  page,
}) => {
  await page.goto("/en");
  const photo = page.getByRole("img", { name: /by the water at sunset/ });
  const avatar = page.getByRole("img", { name: /Santa hat/ });
  await expect(photo).toBeVisible();
  await expect(avatar).toBeHidden();

  await page.evaluate(() => localStorage.setItem("theme", "festive"));
  await page.reload();
  await expect(avatar).toBeVisible();
  await expect(photo).toBeHidden();
});

test("every case study renders, and unknown slugs 404", async ({ page }) => {
  for (const [slug, title] of [
    ["this-site", "How I built this site"],
    ["sportsbook", "Sportsbook features at ComeOn"],
    ["iomt-security", "Securing a cardiac wearable"],
  ]) {
    await page.goto(`/en/case-studies/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
  }
  const res = await page.goto("/en/case-studies/nope");
  expect(res?.status()).toBe(404);
});

test.describe("achievements", () => {
  test("switching language unlocks Polyglot", async ({ page }) => {
    await page.goto("/en");
    await trackerReady(page);
    await page.locator('a[hreflang="pt"]').first().click();
    await expect(page).toHaveURL(/\/pt$/);
    await expect(page.getByRole("status")).toContainText("Poliglota");
  });

  test("visiting every page unlocks Explorer on the About board", async ({
    page,
  }) => {
    for (const section of ["work", "case-studies", "cv", "about"]) {
      await page.goto(`/en/${section}`);
      // Wait until the visit is saved before moving on, like a real visitor.
      await expect
        .poll(() => page.evaluate(() => localStorage.getItem("achievements")))
        .toContain(`"${section}"`);
    }
    await expect(
      page.locator('[data-achievement="explorer"][data-unlocked="true"]'),
    ).toBeVisible();
  });

  test("the Konami code unlocks Konami and starts a blizzard", async ({
    page,
  }) => {
    await page.goto("/en");
    await expect(page.locator("canvas[data-snow]")).toHaveAttribute(
      "data-snow",
      "off",
    );
    await trackerReady(page);
    for (const key of [
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
    ])
      await page.keyboard.press(key);
    await expect(page.getByRole("status")).toContainText("Konami");
    await expect(page.locator("canvas[data-snow]")).toHaveAttribute(
      "data-snow",
      "on",
    );
  });

  test("opening an advent door reveals its surprise and unlocks Elf", async ({
    page,
  }) => {
    await page.clock.setFixedTime(new Date("2026-12-10T10:00:00"));
    await page.addInitScript(() => {
      localStorage.setItem("theme", "festive");
      localStorage.setItem(
        "achievements",
        JSON.stringify({ state: { unlocked: ["hohoho"] }, version: 0 }),
      );
    });
    await page.goto("/en");
    await trackerReady(page);
    await expect(page.getByText("0 / 10 opened")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Day 11, opens on 11 December" }),
    ).toBeDisabled();

    await page.getByRole("button", { name: "Open day 7" }).click();
    await expect(page.getByRole("status")).toContainText("Elf");
    await expect(
      page.getByRole("button", {
        name: "Day 7: Make It Happen award, Summer 2026",
      }),
    ).toBeVisible();
    await expect(page.getByText("1 / 10 opened")).toBeVisible();
  });

  test("the Let it snow chip turns the snow off and remembers it", async ({
    page,
  }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "festive"));
    await page.goto("/en");
    const chip = page.getByRole("button", { name: "Let it snow" });
    const snow = page.locator("canvas[data-snow]");
    await expect(chip).toHaveAttribute("aria-pressed", "true");
    await expect(snow).toHaveAttribute("data-snow", "on");

    await chip.click();
    await expect(chip).toHaveAttribute("aria-pressed", "false");
    await expect(snow).toHaveAttribute("data-snow", "off");
    await page.reload();
    await expect(chip).toHaveAttribute("aria-pressed", "false");
    await expect(snow).toHaveAttribute("data-snow", "off");
  });

  test("no snow when the visitor prefers reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(() => localStorage.setItem("theme", "festive"));
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "festive");
    await expect(page.locator("canvas[data-snow]")).toHaveAttribute(
      "data-snow",
      "off",
    );
  });
});

test("search engines get robots, a sitemap, canonical links and who the site is about", async ({
  page,
  request,
}) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain(
    "Sitemap: https://biancaespindola.is-a.dev/sitemap.xml",
  );
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap.match(/<url>/g)).toHaveLength(36);
  expect(sitemap).toContain("https://biancaespindola.is-a.dev/de/cv");

  await page.goto("/de/about");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://biancaespindola.is-a.dev/de/about",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://biancaespindola.is-a.dev/images/og.png",
  );

  await page.goto("/en");
  const person = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ??
      "{}",
  );
  expect(person.name).toBe("Bianca Espindola");
  expect(person.sameAs).toContain(
    "https://www.linkedin.com/in/espindolabianca/",
  );
});
