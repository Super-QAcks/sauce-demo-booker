import { Page, Locator } from "@playwright/test";

export class HeaderComponent {
	readonly headerRoot: Locator;
	readonly contactUs: Locator;

	constructor(page: Page) {
		this.headerRoot = page.locator("#header");
		this.contactUs = page.getByRole("link", { name: "Contact Us" });
	}

	async clickContactUs() {
		await this.contactUs.click();
		await this.headerRoot.waitFor({ state: "visible" });
	}
}
