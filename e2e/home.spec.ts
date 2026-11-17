import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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
