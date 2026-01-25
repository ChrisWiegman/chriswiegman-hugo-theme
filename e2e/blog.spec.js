const { test, expect } = require("@playwright/test");

test("blog list and post page render", async ({ page }) => {
  await page.goto("/blog");

  await expect(page.locator("h1.post-title")).toContainText("All Posts");
  await expect(page.locator(".posts .post").first()).toBeVisible();

  await page.goto("/2025/09/lorem-ipsum-post-1/");
  await expect(page.locator("h1.post-title")).toContainText(
    "Lorem Ipsum Post 1",
  );
});

test("sitemap uses latest post date for blog page", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  const body = await response.text();

  const blogMatch = body.match(
    /<loc>[^<]*\/blog\/<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/,
  );
  expect(blogMatch).not.toBeNull();
  expect(blogMatch[1]).toMatch(/^2026-01-14T/);
});
