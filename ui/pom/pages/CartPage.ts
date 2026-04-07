import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";
import { CartItemCard } from "../component/cartItemCard.component";

export class CartPage extends PageFactory {
	readonly page: Page;
	readonly cartRoot: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.cartRoot = page.locator("#cart_info");
	}

	async waitForCart() {
		await this.cartRoot.waitFor({ state: "visible" });
	}

	async getCartItemByName(name: string) {
		return new CartItemCard(
			this.cartRoot.locator("tr").filter({ hasText: name })
		);
	}
}
