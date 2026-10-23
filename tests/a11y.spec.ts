import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PAGES = ["/", "/videos/", "/videos/kerberoasting/", "/notes/", "/notes/nmap-cheat-sheet/", "/blog/", "/blog/ssrf-to-cloud-keys/", "/resources/", "/about/", "/search/", "/this-page-does-not-exist/"];

for (const theme of ["dark", "light"] as const) {
  for (const path of PAGES) {
    test(`${path} has no axe violations (${theme})`, async ({ page }) => {
      await page.addInitScript((t) => localStorage.setItem("npp-theme", t), theme);
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      expect(results.violations).toEqual([]);
    });
  }
}

test("no horizontal page scroll at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const path of PAGES) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});

test("skip link moves focus to main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
});

test("copy button copies commands without prompts or output", async ({ page, context, browserName }) => {
  test.skip(browserName !== "chromium", "clipboard permissions are Chromium-only");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/videos/kerberoasting/");
  await page.getByRole("button", { name: /Copy commands/ }).first().click();
  const text = await page.evaluate(() => navigator.clipboard.readText());
  expect(text.startsWith("impacket-GetUserSPNs")).toBe(true);
  expect(text).not.toContain("ServicePrincipalName");
});
