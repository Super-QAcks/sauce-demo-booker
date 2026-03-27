import { Page } from "@playwright/test";

export class PageFactory {
	protected page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async goto(url: string) {
		await this.page.goto(url, { waitUntil: "commit", timeout: 60000 });
	}
}
