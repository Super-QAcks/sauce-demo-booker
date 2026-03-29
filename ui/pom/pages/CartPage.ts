import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";

export class CartPage extends PageFactory {
	readonly page: Page;
	readonly cartRoot: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.cartRoot = page.locator("#cart_info");
	}

	async waitForCart() {
		await this.cartRoot.isVisible();
	}

	getCartItemByName(name: string): Locator {
		return this.cartRoot.locator("tr").filter({ hasText: name });
	}
}
