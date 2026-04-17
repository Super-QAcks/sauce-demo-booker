import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";
import { ProductCard } from "../component/productCard.component";
import { AddedProductModal } from "../component/addedProductModal.component";
import { Product } from "../data/interfaces";
export class HomePage extends PageFactory {
	readonly page: Page;
	readonly homeSlider: Locator;
	readonly homeFeaturesProducts: Locator;
	readonly activeSlider: Locator;
	readonly activeSliderH2: Locator;
	readonly productCards: Locator;
	readonly addedProductModal: AddedProductModal;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.homeSlider = page.locator("section#slider");
		this.activeSlider = page.locator(
			"#slider-carousel > .carousel-inner > .active"
		);
		this.activeSliderH2 = this.activeSlider.getByRole("heading", {
			name: "Full-Fledged practice website for Automation Engineers",
		});
		this.homeFeaturesProducts = page.locator(".features_items");
		this.productCards = page.locator(".product-image-wrapper");
		this.addedProductModal = new AddedProductModal(page);
	}

	async waitForRoot() {
		await this.homeSlider.isVisible();
	}

	async getProductbyName(name: string) {
		return new ProductCard(this.productCards.filter({ hasText: name }).first());
	}

	async addProductsToCart(products: Record<string, Product>) {
		for (const product of Object.values(products)) {
			const productCard = await this.getProductbyName(product.name);
			await productCard.addToCartOverlay();
			await this.addedProductModal.waitForModal();
			await this.addedProductModal.clickContinueShopping();
		}
	}
}
