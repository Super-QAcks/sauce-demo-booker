import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
	await page.goto("https://playwright.dev/");
	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
	await test.step("Go to the Playwright homepage", async () => {
		await page.goto("https://playwright.dev/");
	});

	await test.step("Click on the 'Get started' link", async () => {
		await page.getByRole("link", { name: "Get started" }).click();
	});

	await test.step("Expects the URL to contain 'docs/intro'", async () => {
		await expect(
			page.getByRole("heading", { name: "Installation" })
		).toBeVisible();
	});
});
