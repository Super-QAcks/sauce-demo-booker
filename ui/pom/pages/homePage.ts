import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";
import { ProductCard } from "../component/productCard.component";

export class HomePage extends PageFactory {
	readonly page: Page;
	readonly homeSlider: Locator;
	readonly homeFeaturesProducts: Locator;
	readonly productCards: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.homeSlider = page.locator("section#slider");
		this.homeFeaturesProducts = page.locator(".features_items");
		this.productCards = page.locator(".product-image-wrapper");
	}

	async waitForPage() {
		await this.homeSlider.isVisible();
	}

	async getProductbyName(name: string) {
		return new ProductCard(this.productCards.filter({ hasText: name }));
	}
}
