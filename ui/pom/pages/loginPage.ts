import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";

export class LoginPage extends PageFactory {
	public loginFormRoot: Locator;
	private readonly emailInput: Locator;
	private readonly passwordInput: Locator;
	private readonly loginButton: Locator;
	private readonly errorMessage: Locator;

	constructor(page: Page) {
		super(page);
		this.loginFormRoot = page.locator(".login-form");
		this.emailInput = page.getByTestId("login-email");
		this.passwordInput = page.getByTestId("login-password");
		this.loginButton = page.getByTestId("login-button");
		this.errorMessage = page.getByText("Your email or password is incorrect!");
	}

	async waitForRoot() {
		await this.loginFormRoot.isVisible();
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
}
