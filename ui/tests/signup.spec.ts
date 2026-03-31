import { expect, test } from "@playwright/test";
import { LoginPage } from "../pom/pages/loginPage";
import { SignupPage } from "../pom/pages/signupPage";
import {
	USER_SIGNUP,
	LOGIN_SIGNUP_INVALID,
	LOGIN_SIGNUP_DUPLICATE,
} from "../data/credentials";
import { URL_LOGIN, URL_SIGNUP } from "../data/urls";
import { API } from "../services/api";

test.describe("Sign up feature", () => {
	test.beforeEach(async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto(URL_LOGIN);
		await loginPage.waitForSignupRoot();
	});

	test("2.1 Create account with valid data", async ({ page }) => {
		const signupPage = new SignupPage(page);
		const loginPage = new LoginPage(page);
		await test.step("Fill signup section with valid name and email", async () => {
			await loginPage.signup(USER_SIGNUP.name, USER_SIGNUP.email);
			await page.waitForLoadState("domcontentloaded");
		});

		await test.step("Verify navigation to signup account creation form", async () => {
			await expect(page).toHaveURL(URL_SIGNUP, { timeout: 10000 });
		});

		await test.step("Fill complete signup form with all required fields", async () => {
			await signupPage.fillForm(USER_SIGNUP);
		});

		await test.step("Verify account creation success and user authentication", async () => {
			await page.waitForLoadState("domcontentloaded");
			const successMessageLocator = page.getByText(
				/account created|account successfully/i
			);
			await expect(successMessageLocator).toBeVisible({ timeout: 5000 });
		});

		await test.step("Delte account", async () => {
			const api = new API(page);
			await api.deleteAccount(USER_SIGNUP.email, USER_SIGNUP.password);
		});
	});

	test("3.1 Invalid email format should fail with error", async ({ page }) => {
		const loginPage = new LoginPage(page);
		await test.step("Fill signup with invalid email format and attempt submission", async () => {
			await loginPage.signup(
				LOGIN_SIGNUP_INVALID.name,
				LOGIN_SIGNUP_INVALID.email
			);
			await page.waitForLoadState("domcontentloaded");
		});

		await test.step("Verify validation error or rejection of invalid email", async () => {
			await expect(page).toHaveURL(URL_LOGIN, { timeout: 5000 });
		});
	});

	test("3.2 Empty name field should show validation error", async ({
		page,
	}) => {
		const loginPage = new LoginPage(page);
		await test.step("Attempt signup with empty name field", async () => {
			await expect(loginPage.signupEmail).toBeEditable();
			await loginPage.signupEmail.fill(LOGIN_SIGNUP_INVALID.email);
			await loginPage.signupButton.click();
			await page.waitForLoadState("domcontentloaded");
		});

		await test.step("Verify name required validation error", async () => {
			const urlCheck = expect(page).toHaveURL(URL_LOGIN);
			await urlCheck;
		});
	});

	test("3.3 Duplicate email address should be rejected", async ({ page }) => {
		const loginPage = new LoginPage(page);
		const api = new API(page);
		const USER = { ...USER_SIGNUP, ...LOGIN_SIGNUP_DUPLICATE };
		await test.step("Create initial account with email", async () => {
			await api.createAccount(USER);
		});

		await test.step("Attempt signup again with duplicate email address", async () => {
			await loginPage.goto(URL_LOGIN);
			await page.waitForLoadState("domcontentloaded");
			await loginPage.signup(USER.name, USER.email);
			await page.waitForLoadState("domcontentloaded");
		});

		await test.step("Verify duplicate email error message", async () => {
			await expect(loginPage.signupErrorMessage).toBeVisible({ timeout: 5000 });
		});

		await test.step("Delete account", async () => {
			await api.deleteAccount(USER.email, USER.password);
		});
	});
});
