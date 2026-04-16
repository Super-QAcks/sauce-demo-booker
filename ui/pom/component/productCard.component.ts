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
		this.addtoCartOverlayButton = root.locator(".product-overlay .add-to-cart");
		this.viewProductButton = root.locator(".choose a");
		this.viewProductButton = root.getByRole("link", {
			name: /View Product/i,
		});
		this.addtoCartOverlayButton = root.locator(".productinfo .add-to-cart");
	}

	async addToCart() {
		await this.addToCartButton.first().click();
	}

	async addToCartOverlay() {
		await this.hoverOverCard();
		await this.addtoCartOverlayButton.click();
	}

	async hoverOverCard() {
		await this.rootCard.hover({ force: true });
	}

	async viewProduct() {
		await this.viewProductButton.scrollIntoViewIfNeeded();
		await this.viewProductButton.click({ force: true });
	}
}
