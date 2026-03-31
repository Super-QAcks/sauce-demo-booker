import { test } from "@playwright/test";
import { LoginPage } from "../pom/pages/loginPage";
import { URL_LOGIN } from "../data/urls";

test.describe("seed for logged in user", () => {
	test("seed using loginPage fixture", async ({ page }) => {
		const loginPage = new LoginPage(page);
		loginPage.goto(URL_LOGIN);
	});
});
