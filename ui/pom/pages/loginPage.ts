import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";
import { LOGIN_CREDENTIALS } from "../../pom/data/credentials";
import { URL_LOGIN } from "../../pom/data/urls";

export class LoginPage extends PageFactory {
	public loginFormRoot: Locator;
	private readonly emailInput: Locator;
	private readonly passwordInput: Locator;
	private readonly loginButton: Locator;
	private readonly errorMessage: Locator;

	constructor(page: Page) {
		super(page, URL_LOGIN);
		this.loginFormRoot = page.locator(".login-form");
		this.emailInput = page.getByTestId("login-email");
		this.passwordInput = page.getByTestId("login-password");
		this.loginButton = page.getByTestId("login-button");
		this.errorMessage = page.getByText("Your email or password is incorrect!");
	}

	async waitForRoot() {
		await this.loginFormRoot.isVisible();
	}

	async login() {
		await this.emailInput.fill(LOGIN_CREDENTIALS.STANDARD_USER);
		await this.passwordInput.fill(LOGIN_CREDENTIALS.PASSWORD);
		await this.loginButton.click();
	}

	async invalidLogin() {
		await this.emailInput.fill(LOGIN_CREDENTIALS.INVALID_USER);
		await this.passwordInput.fill(LOGIN_CREDENTIALS.INVALID_PASSWORD);
		await this.loginButton.click();
	}

	async waitForErrorMessage() {
		await this.errorMessage.waitFor({ state: "visible" });
	}
}
