import { Page, Locator } from "@playwright/test";

export class HeaderComponent {
	readonly headerRoot: Locator;
	readonly contactUs: Locator;
	readonly cart: Locator;
	readonly signUpLogin: Locator;
	readonly logout: Locator;
	readonly deleteAccount: Locator;
	readonly loggedUserName: Locator;

	constructor(page: Page) {
		this.headerRoot = page.locator("#header");
		this.contactUs = page.getByRole("link", { name: "Contact Us" });
		this.logout = page.getByRole("link", { name: "Logout" });
		this.deleteAccount = page.getByRole("link", { name: "Delete Account" });
		this.cart = page.getByRole("link", { name: "Cart" });
		this.signUpLogin = page.getByRole("link", { name: "Signup / Login" });
		this.loggedUserName = page.getByText("Logged in as").locator("b");
	}

	async waitForRoot() {
		await this.headerRoot.waitFor({ state: "visible" });
	}

	async clickContactUs() {
		this.waitForRoot();
		await this.contactUs.click();
	}

	async clickSignUpLogin() {
		this.waitForRoot();
		await this.signUpLogin.click();
	}

	async clickCart() {
		this.waitForRoot();
		await this.cart.click();
	}

	async clickLogout() {
		this.waitForRoot();
		await this.logout.click();
	}

	async clickDeleteAccount() {
		this.waitForRoot();
		await this.deleteAccount.click();
	}
}
