import { test, expect } from "@playwright/test";
import { test as LoginFixture } from "./helpers/loginFixture";
import { LoginPage } from "../pom/pages/loginPage";
import { URL_LOGIN } from "../data/urls";
import { LOGIN_CREDENTIALS } from "../data/credentials";

LoginFixture.describe("Login Page Tests", () => {
	LoginFixture("should log out successfully", async ({ loginPage }) => {
		LoginFixture.step("Click on Logout link", async () => {
			await loginPage.logout();
		});

		LoginFixture.step("Validate successful logout", async () => {
			await loginPage.waitForRoot();
		});
	});
});

//need to redo this test with .step('stepDescription') for this test follow the Test Steps (HomePage>ClickHeaderLoginButton>enterIncorrectAddress)
// //need to merge another branch with homePage file

test("should not log in with invalid credentials", async ({ page }) => {
	const loginPage = new LoginPage(page);
	await loginPage.goto(URL_LOGIN);
	await loginPage.waitForRoot();
	await loginPage.login(
		LOGIN_CREDENTIALS.INVALID_USER,
		LOGIN_CREDENTIALS.INVALID_PASSWORD
	);
	expect(await loginPage.getErrorMessage()).toContain(
		"Your email or password is incorrect!"
	);
});
