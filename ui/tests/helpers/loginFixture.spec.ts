import { test as base } from "@playwright/test";
import { LoginPage } from "../../pom/pages/loginPage";

export const test = base.extend<{ loginPage: LoginPage }>({
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
		await loginPage.waitForRoot();
		await loginPage.login();
		await page.waitForURL("https://automationexercise.com/");
		await use(loginPage);
	},
});
