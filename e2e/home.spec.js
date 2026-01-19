const { test, expect } = require("@playwright/test");

test("homepage renders and navigation is present", async ({ page }) => {
  await page.goto("/");

  const siteTitleLink = page.locator(".site-title a");
  await expect(siteTitleLink).toContainText("Hugo Theme Development Site");
  await expect(siteTitleLink).toHaveAttribute(
    "href",
    "http://127.0.0.1:1313/",
  );
  await expect(page.locator("header .menu")).toContainText("About");
  await expect(page.locator("header .menu")).toContainText("Blog");
  await expect(page.locator("h2.main-header")).toContainText("Recent Posts");
});

test("blog list and post page render", async ({ page }) => {
  await page.goto("/blog");

  await expect(page.locator("h1.post-title")).toContainText("All Posts");
  await expect(page.locator(".posts .post").first()).toBeVisible();

  await page.goto("/2025/09/lorem-ipsum-post-1/");
  await expect(page.locator("h1.post-titlee")).toContainText(
    "Lorem Ipsum Post 1",
  );
});

test("404 page renders", async ({ page }) => {
  const response = await page.goto("/this-does-not-exist/");

  expect(response.status()).toBe(404);
  await expect(page.locator("h1.post-title")).toContainText(
    "Content not found.",
  );
});

test("sitemap and rss feeds are available", async ({ request }) => {
  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  const sitemapBody = await sitemapResponse.text();
  expect(sitemapBody).toContain("<urlset");

  const rssResponse = await request.get("/index.xml");
  expect(rssResponse.ok()).toBe(true);
  const rssBody = await rssResponse.text();
  expect(rssBody).toContain("<rss");
});
