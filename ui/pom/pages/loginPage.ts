import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";
import { LOGIN_CREDENTIALS } from "../../pom/data/credentials";

export class LoginPage extends PageFactory {
	public loginFormRoot: Locator;
	private readonly emailInput: Locator;
	private readonly passwordInput: Locator;
	private readonly loginButton: Locator;

	constructor(page: Page) {
		super(page);
		this.loginFormRoot = page.locator(".login-form");
		this.emailInput = page.getByTestId("login-email");
		this.passwordInput = page.getByTestId("login-password");
		this.loginButton = page.getByTestId("login-button");
	}

	async waitForRoot() {
		await this.loginFormRoot.isVisible();
	}

	async login() {
		await this.emailInput.fill(LOGIN_CREDENTIALS.STANDARD_USER);
		await this.passwordInput.fill(LOGIN_CREDENTIALS.PASSWORD);
		await this.loginButton.click();
	}

	async logout() {
		await this.page.getByText(/logout/i).click({ force: true });
	}
}
