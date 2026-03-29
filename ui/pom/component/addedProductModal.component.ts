import { Locator, Page } from "@playwright/test";

export class AddedProductModal {
	readonly page: Page;
	readonly modalRoot: Locator;
	readonly viewCartButton: Locator;
	readonly continueShoppingButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.modalRoot = this.page.locator("#cartModal");
		this.viewCartButton = this.modalRoot.getByRole("link", {
			name: "View Cart",
		});
		this.continueShoppingButton = this.modalRoot.getByRole("button", {
			name: "Continue Shopping",
		});
	}

	async waitForModal() {
		await this.modalRoot.isVisible();
	}

	async clickViewCart() {
		await this.viewCartButton.click();
	}

	async clickContinueShopping() {
		await this.continueShoppingButton.click();
	}
}
