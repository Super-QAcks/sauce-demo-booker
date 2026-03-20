import { test, expect } from "@playwright/test";
import { LoginPage } from "../pom/pages/loginPage";

test.describe("Login Feature: Negative and Edge Cases", () => {
	test("1.3 invalid email format should fail with error", async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
		await loginPage.waitForRoot();
		await expect(loginPage.loginFormRoot).toBeVisible();

		await page.getByTestId("login-email").fill("invalidemail");
		await page.getByTestId("login-password").fill("Password123!");
		await page.getByTestId("login-button").click();

		await expect(page).toHaveURL(/\/login/);
		await expect(loginPage.loginFormRoot).toBeVisible();
		await expect(page.getByText(/Login to your account/i)).toBeVisible();
	});

	test("1.5 SQL injection style input should be rejected", async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
		await loginPage.waitForRoot();
		await expect(loginPage.loginFormRoot).toBeVisible();

		await page.getByTestId("login-email").fill("' OR '1'='1");
		await page.getByTestId("login-password").fill("anyPassword123");
		await page.getByTestId("login-button").click();

		await expect(page).toHaveURL(/\/login/);
		await expect(loginPage.loginFormRoot).toBeVisible();
		await expect(page.getByText(/Login to your account/i)).toBeVisible();
	});
});
