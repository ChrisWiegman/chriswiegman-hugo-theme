const { test, expect } = require("@playwright/test");

const pages = ["/about/", "/blog/", "/library/", "/notes/", "/search/?s=hugo"];

test("site header appears on every major page", async ({ page }) => {
  for (const path of pages) {
    await page.goto(path);

    const siteHeader = page.locator("body > header");
    await expect(siteHeader, `missing site header on ${path}`).toBeVisible();
    await expect(siteHeader.locator(".site-title a")).toContainText(
      "Hugo Theme Development Site",
    );
    await expect(siteHeader.locator(".menu")).toContainText("About");
    await expect(siteHeader.locator(".menu")).toContainText("Blog");
  }
});

test("content headers are not styled like the fixed site header", async ({
  page,
}) => {
  for (const path of ["/blog/", "/library/", "/notes/", "/search/?s=hugo"]) {
    await page.goto(path);

    const siteHeader = page.locator("body > header");
    await expect(siteHeader).toBeVisible();
    await expect(siteHeader.locator(".site-title a")).toContainText(
      "Hugo Theme Development Site",
    );
    await expect(siteHeader.locator(".menu")).toContainText("About");

    const contentHeader = page.locator("main .content-header").first();
    await expect(contentHeader, `missing content header on ${path}`).toBeVisible();
    await expect(contentHeader).not.toHaveCSS("position", "fixed");
  }
});
