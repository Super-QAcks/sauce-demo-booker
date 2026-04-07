import { test, expect } from "@playwright/test";
import { HomePage } from "../pom/pages/homePage";
import { FooterComponent } from "../pom/component/footeer.component";
import { URL_BASE } from "../pom/data/urls";

test.describe("Home Page Tests.", async () => {
	let homePage: HomePage;
	let footerComponent: FooterComponent;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		footerComponent = new FooterComponent(page);
	});

	test("Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality: ", async ({
		page,
	}) => {
		await test.step("Launch browser and Navigate to url 'http://automationexercise.com'", async () => {
			await homePage.goto(URL_BASE);
		});

		await test.step("Verify that home page is visible successfully", async () => {
			await homePage.waitForRoot();
		});

		await test.step("Scroll down page to bottom", async () => {
			await page.evaluate(() => {
				window.scrollTo(0, document.body.scrollHeight);
			});
		});

		await test.step("Verify 'SUBSCRIPTION' is visible", async () => {
			await expect(footerComponent.titleWidget).toBeVisible();
		});

		await test.step("Click on arrow at bottom right side to move upward", async () => {
			await homePage.clickScrollUp();
		});

		await test.step("Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen", async () => {
			await expect(homePage.activeSliderH2).toBeVisible();
		});
	});

	test("Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality", async ({
		page,
	}) => {
		await test.step("Launch browser and Navigate to url 'http://automationexercise.com'", async () => {
			await homePage.goto(URL_BASE);
		});

		await test.step("Verify that home page is visible successfully", async () => {
			await homePage.waitForRoot();
		});

		await test.step("Scroll down page to bottom", async () => {
			await page.evaluate(() => {
				window.scrollTo(0, document.body.scrollHeight);
			});
		});

		await test.step("Verify 'SUBSCRIPTION' is visible", async () => {
			await expect(footerComponent.titleWidget).toBeVisible();
		});

		await test.step("Scroll up page to top", async () => {
			await page.evaluate(() => {
				window.scrollTo(0, 0);
			});
		});

		await test.step("Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen", async () => {
			await expect(homePage.activeSliderH2).toBeVisible();
		});
	});
});
