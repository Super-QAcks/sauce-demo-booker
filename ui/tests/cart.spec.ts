import { test, expect } from "@playwright/test";
import { VALID_PRODUCTS } from "../pom/data/products";
import { URL_BASE } from "../pom/data/urls";
import { HomePage } from "../pom/pages/homePage";
import { CartPage } from "../pom/pages/CartPage";
import { AddedProductModal } from "../pom/component/addedProductModal.component";

test.describe("Cart Test Cases", async () => {
	test("Test Case 17: Remove Products From Cart", async ({ page }) => {
		const homePage = new HomePage(page);
		const cartPage = new CartPage(page);
		const addedProductModal = new AddedProductModal(page);
		const product = VALID_PRODUCTS.greenTshirt;
		const productCard = await homePage.getProductbyName(product.name);
		const cartItem = await cartPage.getCartItemByName(product.name);

		await test.step("Navigate to url", async () => {
			await homePage.goto(URL_BASE);
		});

		await test.step("Verify that home page is visible successfully", async () => {
			await homePage.waitForRoot();
		});

		await test.step("Add products to cart", async () => {
			await productCard.addToCart();
		});

		await test.step("Click 'Cart' button", async () => {
			await addedProductModal.waitForModal();
			await addedProductModal.clickViewCart();
		});

		await test.step("Verify that cart page is displayed", async () => {
			await cartPage.waitForCart();
		});

		await test.step("Click 'X' button corresponding to particular product", async () => {
			await cartItem.deleteItem();
		});

		await test.step("Verify that product is removed from the cart", async () => {
			await expect(cartItem.rootCard).toBeHidden();
		});
	});
});
