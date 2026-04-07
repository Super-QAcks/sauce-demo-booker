import { Locator } from "@playwright/test";

export class ProductCard {
	readonly rootCard: Locator;
	readonly productName: Locator;
	readonly productPrice: Locator;
	readonly addToCartButton: Locator;
	readonly addtoCartOverlayButton: Locator;
	readonly viewProductButton: Locator;

	constructor(root: Locator) {
		this.rootCard = root;
		this.productName = root.locator(".single-products>div>p");
		this.productPrice = root.locator(".single-products>div>h2");
		this.addToCartButton = root.locator(".productinfo .add-to-cart");
		this.viewProductButton = root.getByRole("link", {
			name: /View Product/i,
		});
		this.addtoCartOverlayButton = root.locator(".productinfo .add-to-cart");
	}

	async addToCart() {
		await this.addtoCartOverlayButton.click();
	}

	async viewProduct() {
		await this.viewProductButton.scrollIntoViewIfNeeded();
		await this.viewProductButton.click({ force: true });
	}
}
