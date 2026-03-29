import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";
import { AddedProductModal } from "../component/addedProductModal.component";

export class ProductDetailsPage extends PageFactory {
	readonly page: Page;
	readonly productDetailsRoot: Locator;
	readonly productName: Locator;
	readonly productPrice: Locator;
	readonly productQuantityInput: Locator;
	readonly addToCartButton: Locator;
	readonly addedProductModal: AddedProductModal;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.productDetailsRoot = page.locator(".product-details");
		this.productName = page.locator(".product-information h2");
		this.productPrice = page.getByText("Rs.");
		this.productQuantityInput = page.locator("#quantity");
		this.addToCartButton = page.locator("button.cart");
		this.addedProductModal = new AddedProductModal(page);
	}

	async waitForRoot() {
		await this.productDetailsRoot.isVisible();
	}

	async addToCart() {
		await this.addToCartButton.click();
	}

	async changeQuantity(amount: number) {
		await this.productQuantityInput.clear();
		await this.productQuantityInput.fill(amount.toString());
	}
}
