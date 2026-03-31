import { Page, Locator, expect } from "@playwright/test";
import { PageFactory } from "./pageFactory";

export class LoginPage extends PageFactory {
	public loginFormRoot: Locator;
	public readonly emailInput: Locator;
	public readonly passwordInput: Locator;
	public readonly loginButton: Locator;
	public readonly errorMessage: Locator;
	public readonly signupErrorMessage: Locator;
	public signupFormRoot: Locator;
	public readonly signupButton: Locator;
	public readonly signupName: Locator;
	public readonly signupEmail: Locator;

	constructor(page: Page) {
		super(page);
		this.loginFormRoot = page.locator(".login-form");
		this.signupFormRoot = page.locator(".signup-form");
		this.emailInput = page.getByTestId("login-email");
		this.passwordInput = page.getByTestId("login-password");
		this.loginButton = page.getByTestId("login-button");
		this.errorMessage = page.getByText("Your email or password is incorrect!");
		this.signupButton = page.getByTestId("signup-button");
		this.signupName = page.getByTestId("signup-name");
		this.signupEmail = page.getByTestId("signup-email");
		this.signupErrorMessage = page.getByText(/already exist|email already/i);
	}

	async waitForRoot() {
		await expect(this.loginFormRoot).toBeVisible();
	}

	async waitForSignupRoot() {
		await expect(this.signupFormRoot).toBeVisible();
	}

	async login(username: string, password: string) {
		await this.emailInput.fill(username);
		await this.passwordInput.fill(password);
		await this.loginButton.click();
	}

	async waitForErrorMessage() {
		await this.errorMessage.waitFor({ state: "visible" });
	}

	async getErrorMessage() {
		return this.errorMessage.textContent();
	}

	async logout() {
		await this.page.getByText(/logout/i).click({ force: true });
	}

	async signup(name: string, email: string) {
		await expect(this.signupName).toBeVisible();
		await this.signupName.fill(name);
		await expect(this.signupEmail).toBeVisible();
		await this.signupEmail.fill(email);
		await this.signupButton.click();
	}
}
