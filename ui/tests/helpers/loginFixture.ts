import { test as base } from "@playwright/test";
import { URL_BASE, URL_LOGIN } from "../../pom/data/urls";
import { LoginPage } from "../../pom/pages/loginPage";
import { LOGIN_CREDENTIALS } from "../../pom/data/credentials";

export const test = base.extend<{ loginPage: LoginPage }>({
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto(URL_LOGIN);
		await loginPage.waitForRoot();
		await loginPage.login(
			LOGIN_CREDENTIALS.STANDARD_USER,
			LOGIN_CREDENTIALS.PASSWORD
		);
		await page.waitForURL(URL_BASE);
		await use(loginPage);
	},
});
