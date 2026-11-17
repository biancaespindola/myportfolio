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
  test(`/${lang} has no axe violations`, async ({ page }) => {
    await page.goto(`/${lang}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
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
