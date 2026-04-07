import { test, expect } from "@playwright/test";
import { HomePage } from "../pom/pages/homePage";
import { ProductDetailsPage } from "../pom/pages/productDetailsPage";
import { AddedProductModal } from "../pom/component/addedProductModal.component";
import { CartPage } from "../pom/pages/CartPage";
import { URL_BASE } from "../pom/data/urls";
import { VALID_PRODUCTS } from "../pom/data/products";

test.describe("E2E Tests", () => {
	let homePage: HomePage;
	let productDetailsPage: ProductDetailsPage;
	let addedProductModal: AddedProductModal;
	let viewCartPage: CartPage;

	test("Test Case 13: Verify Product quantity in Cart", async ({ page }) => {
		homePage = new HomePage(page);
		productDetailsPage = new ProductDetailsPage(page);
		addedProductModal = new AddedProductModal(page);
		viewCartPage = new CartPage(page);
		const product = VALID_PRODUCTS.default;

		await test.step("Navigate to url", async () => {
			await homePage.goto(URL_BASE);
		});

		await test.step("Verify that home page is visible successfully", async () => {
			await homePage.waitForRoot();
		});

		const productCard = await homePage.getProductbyName(product.name);
		await test.step("Click 'View Product' for any product on home page", async () => {
			await productCard.viewProduct();
		});

		await test.step("Verify product detail is opened", async () => {
			await expect(productDetailsPage.productDetailsRoot).toBeVisible();
		});

		await test.step("Increase quantity to 4", async () => {
			await productDetailsPage.changeQuantity(product.quantity);
		});

		await test.step("Click 'Add to cart' button", async () => {
			await productDetailsPage.addToCart();
		});

		await test.step("Click 'View Cart' button", async () => {
			await addedProductModal.waitForModal();
			await addedProductModal.clickViewCart();
		});

		const cartItem = await viewCartPage.getCartItemByName(
			VALID_PRODUCTS.default.name
		);
		await test.step("Verify that product is displayed in cart page with exact quantity", async () => {
			await viewCartPage.waitForCart();
			await expect(cartItem.productQuantity).toHaveText(
				VALID_PRODUCTS.default.quantity.toString()
			);
		});
	});
});
