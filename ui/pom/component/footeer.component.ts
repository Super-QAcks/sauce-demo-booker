import { Page, Locator } from "@playwright/test";

export class FooterComponent {
	readonly footerRoot: Locator;
	readonly titleWidget: Locator;

	constructor(page: Page) {
		this.footerRoot = page.locator("#footer");
		this.titleWidget = page.locator(".single-widget");
	}
}
