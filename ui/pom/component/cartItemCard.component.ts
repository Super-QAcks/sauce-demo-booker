import { Locator } from "@playwright/test";

export class CartItemCard {
	readonly rootCard: Locator;
	readonly productName: Locator;
	readonly productPrice: Locator;
	readonly productQuantity: Locator;
	readonly deleteButton: Locator;

	constructor(root: Locator) {
		this.rootCard = root;
		this.productName = root.locator(".cart_description h4 a");
		this.productPrice = root.locator(".cart_price p");
		this.productQuantity = root.locator(".cart_quantity");
		this.deleteButton = root.locator(".cart_quantity_delete");
	}

	async getQuantity() {
		const quantityText = await this.productQuantity.textContent();
		return quantityText;
	}

	async deleteItem() {
		await this.deleteButton.click();
	}
}
