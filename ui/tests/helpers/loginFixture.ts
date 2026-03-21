import { test as base } from "@playwright/test";
import { URL_BASE } from "../../pom/data/urls";
import { LoginPage } from "../../pom/pages/loginPage";

export const test = base.extend<{ loginPage: LoginPage }>({
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
		await loginPage.waitForRoot();
		await loginPage.login();
		await page.waitForURL(URL_BASE);
		await use(loginPage);
	},
});

export const invalidLoginTest = base.extend<{ loginPage: LoginPage }>({
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
		await loginPage.waitForRoot();
		await loginPage.invalidLogin();
		await loginPage.waitForErrorMessage();
		await use(loginPage);
	},
});
