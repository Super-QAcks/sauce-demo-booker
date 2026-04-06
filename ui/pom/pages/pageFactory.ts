import { Page, Locator } from "@playwright/test";

export class PageFactory {
	protected page: Page;
	readonly scrollUpButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.scrollUpButton = page.locator("#scrollUp");
	}

	async goto(url: string) {
		await this.page.goto(url, { waitUntil: "commit", timeout: 60000 });
	}

	async clickScrollUp() {
		await this.scrollUpButton.click();
		await this.scrollUpButton.waitFor({ state: "hidden" });
	}

	async waitForRoot() {
		await this.scrollUpButton.waitFor({ state: "visible" });
	}
}
