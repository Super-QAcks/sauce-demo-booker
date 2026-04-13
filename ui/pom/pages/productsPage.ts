import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";

export class Products extends PageFactory {
	readonly productsHeading: Locator;

	constructor(page: Page) {
		super(page);
		this.productsHeading = page.getByRole("heading", { name: "All Products" });
	}

	async validateProductsPage() {
		await this.productsHeading.isVisible();
	}
}
