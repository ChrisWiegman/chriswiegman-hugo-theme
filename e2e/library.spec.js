const { test, expect } = require("@playwright/test");

test("library page renders book list", async ({ page }) => {
  await page.goto("/library/");

  await expect(page.locator("h1.post-title")).toContainText("My Library");
  await expect(page.locator(".books .book").first()).toBeVisible();
});

test("sitemap uses latest finished date for library", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  const body = await response.text();

  const libraryMatch = body.match(
    /<loc>[^<]*\/library\/<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/,
  );
  expect(libraryMatch).not.toBeNull();
  expect(libraryMatch[1]).toMatch(/^2026-01-18T/);
});
