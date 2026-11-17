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
  for (const path of ["", "/work"]) {
    test(`/${lang}${path} has no axe violations`, async ({ page }) => {
      await page.goto(`/${lang}${path}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const { violations } = await new AxeBuilder({ page }).analyze();
      expect(violations).toEqual([]);
    });
  }
}

test("work page lists experience with localized dates", async ({ page }) => {
  await page.goto("/de/work");
  const experience = page.getByRole("region", { name: "Berufserfahrung" });
  await expect(experience.getByRole("heading", { level: 3 })).toHaveCount(5);
  await expect(page.getByText("Apr. 2024 — heute")).toBeVisible();
});

test("long German words don't overflow on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const path of ["/de", "/de/work"]) {
    await page.goto(path);
    const overflowing = await page.evaluate(() =>
      [...document.querySelectorAll("main *")]
        .filter(
          (el) =>
            el.checkVisibility() &&
            !el.closest("[aria-hidden]") &&
            el.getBoundingClientRect().right > window.innerWidth + 1,
        )
        .map((el) => `${el.tagName} ${el.textContent?.slice(0, 40)}`),
    );
    expect(overflowing, path).toEqual([]);
  }
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
