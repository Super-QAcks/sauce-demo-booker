import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";

export class LoginPage extends PageFactory {
	public loginFormRoot: Locator;
	readonly loginFormTitle: Locator;
	private readonly emailInput: Locator;
	private readonly passwordInput: Locator;
	private readonly loginButton: Locator;
	private readonly errorMessage: Locator;

	readonly signUpFormRoot: Locator;
	readonly signUpFormTitle: Locator;
	readonly signUpNameInput: Locator;
	readonly signUpEmailInput: Locator;
	readonly signUpButton: Locator;
	readonly signUpErrorMessage: Locator;

	constructor(page: Page) {
		super(page);
		this.loginFormRoot = page.locator(".login-form");
		this.loginFormTitle = page.getByRole("heading", {
			name: "Login to your account",
		});
		this.emailInput = page.getByTestId("login-email");
		this.passwordInput = page.getByTestId("login-password");
		this.loginButton = page.getByTestId("login-button");
		this.errorMessage = page.getByText("Your email or password is incorrect!");

		this.signUpFormRoot = page.locator(".signup-form");
		this.signUpFormTitle = page.getByRole("heading", {
			name: "New User Signup!",
		});
		this.signUpNameInput = page.getByTestId("signup-name");
		this.signUpEmailInput = page.getByTestId("signup-email");
		this.signUpButton = page.getByTestId("signup-button");
		this.signUpErrorMessage = page.getByText("Email Address already exist!");
	}

	async waitForRoot() {
		await this.loginFormRoot.waitFor({ state: "visible" });
	}

	async waitForSignUpRoot() {
		await this.signUpFormRoot.waitFor({ state: "visible" });
	}

	async login(username: string, password: string) {
		await this.emailInput.fill(username);
		await this.passwordInput.fill(password);
		await this.loginButton.click();
	}

	async signUp(name: string, email: string) {
		await this.signUpNameInput.fill(name);
		await this.signUpEmailInput.fill(email);
		await this.signUpButton.click();
	}

	async waitForSingUpErrorMessage() {
		await this.signUpErrorMessage.waitFor({ state: "visible" });
	}

	async getSignUpErrorMessage() {
		return this.signUpErrorMessage.textContent();
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
}
