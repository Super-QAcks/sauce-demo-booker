import { Locator } from "@playwright/test";

export class ProductCard {
	readonly rootCard: Locator;
	readonly productName: Locator;
	readonly productPrice: Locator;
	readonly addToCartButton: Locator;
	readonly viewProductButton: Locator;

	constructor(root: Locator) {
		this.rootCard = root;
		this.productName = root.locator(".single-products>div>p");
		this.productPrice = root.locator(".single-products>div>h2");
		this.addToCartButton = root.locator(".productinfo .add-to-cart");
		this.viewProductButton = root.locator(".choose a");
	}

	async addToCart() {
		await this.addToCartButton.click();
	}

	async viewProduct() {
		await this.viewProductButton.click();
	}
}
