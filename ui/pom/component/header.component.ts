import { Page, Locator } from "@playwright/test";
import { URL_PRODUCTS } from "../data/urls";

export class HeaderComponent {
	readonly headerRoot: Locator;
	readonly contactUs: Locator;
	readonly signUpLogin: Locator;
	readonly productsLink: Locator;
	readonly testCasesLink: Locator;
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
		this.headerRoot = page.locator("#header");
		this.contactUs = page.getByRole("link", { name: "Contact Us" });
		this.signUpLogin = page.getByRole("link", { name: "Signup / Login" });
		this.productsLink = page.getByRole("link", { name: /Products/i });
		this.testCasesLink = page.getByRole("link", { name: " Test Cases" });
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

	async clickProductsLink() {
		await this.productsLink.waitFor({ state: "visible", timeout: 10000 });
		await this.productsLink.click({ force: true });
		if (this.page.url().includes("#google_vignette")) {
			await this.page.goto(URL_PRODUCTS);
		}
	}

	async clickTestCasesLink() {
		await this.testCasesLink.click({ force: true });
	}
}
