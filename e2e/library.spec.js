const { test, expect } = require("@playwright/test");

test("library page renders book list", async ({ page }) => {
  await page.goto("/library/");

  await expect(page.locator("h1.post-title")).toContainText("My Library");
  await expect(page.locator(".books .book").first()).toBeVisible();
});

test("year filter shows only books read in that year", async ({ page }) => {
  await page.goto("/library/");

  const yearBtn = page.locator(".summary-card[data-filter-year='2024']");
  await expect(yearBtn).toBeVisible();
  await yearBtn.click();

  await expect(yearBtn).toHaveAttribute("aria-pressed", "true");

  const visibleBooks = page.locator(".books .book:visible");
  await expect(visibleBooks).toHaveCount(3);

  const hiddenBooks = page.locator(".books .book[hidden]");
  await expect(hiddenBooks).toHaveCount(2);

  await expect(page.locator(".book-count")).toContainText("3");
  await expect(page.locator("[data-filter-label]")).toContainText("read in 2024");
  await expect(page.locator("[data-filter-clear]")).toBeVisible();
});

test("author filter shows only books by that author", async ({ page }) => {
  await page.goto("/library/");

  const authorBtn = page.locator(".book-author[data-filter-author='elliot ackerman']").first();
  await authorBtn.click();

  await expect(authorBtn).toHaveAttribute("aria-pressed", "true");

  const visibleBooks = page.locator(".books .book:visible");
  await expect(visibleBooks).toHaveCount(3);

  await expect(page.locator(".book-count")).toContainText("3");
  await expect(page.locator("[data-filter-label]")).toContainText("by Elliot Ackerman");
});

test("rating filter shows only books with that rating", async ({ page }) => {
  await page.goto("/library/");

  const ratingBtn = page.locator(".book-rating[data-filter-rating='4']").first();
  await ratingBtn.click();

  await expect(ratingBtn).toHaveAttribute("aria-pressed", "true");

  const visibleBooks = page.locator(".books .book:visible");
  await expect(visibleBooks).toHaveCount(3);

  await expect(page.locator(".book-count")).toContainText("3");
  await expect(page.locator("[data-filter-label]")).not.toBeEmpty();
});

test("clear filter restores all books", async ({ page }) => {
  await page.goto("/library/");

  const totalBooks = await page.locator(".books .book").count();

  await page.locator(".summary-card[data-filter-year='2024']").click();
  await expect(page.locator("[data-filter-clear]")).toBeVisible();

  await page.locator("[data-filter-clear]").click();

  await expect(page.locator("[data-filter-clear]")).toHaveAttribute("hidden", "");
  await expect(page.locator(".books .book:visible")).toHaveCount(totalBooks);
  await expect(page.locator(".book-count")).toContainText(String(totalBooks));
});

test("clicking active filter toggles it off", async ({ page }) => {
  await page.goto("/library/");

  const totalBooks = await page.locator(".books .book").count();
  const yearBtn = page.locator(".summary-card[data-filter-year='2024']");

  await yearBtn.click();
  await expect(yearBtn).toHaveAttribute("aria-pressed", "true");

  await yearBtn.click();
  await expect(yearBtn).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator(".books .book:visible")).toHaveCount(totalBooks);
  await expect(page.locator("[data-filter-clear]")).toHaveAttribute("hidden", "");
});

test("summary card shows correct year counts", async ({ page }) => {
  await page.goto("/library/");

  await expect(page.locator(".library-summary")).toBeVisible();
  await expect(page.locator(".summary-card[data-filter-year='2024']")).toBeVisible();
  await expect(page.locator(".summary-card[data-filter-year='2024'] .summary-count")).toContainText("3");
  await expect(page.locator(".summary-card[data-filter-year='2026'] .summary-count")).toContainText("1");
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
