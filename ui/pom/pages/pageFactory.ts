import { Page } from "@playwright/test";

export class PageFactory {
	constructor(
		public readonly page: Page,
		public url: string
	) {
		this.url = url;
	}

	async goto() {
		await this.page.goto(this.url);
	}
}
