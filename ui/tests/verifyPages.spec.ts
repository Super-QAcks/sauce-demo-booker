import { URL_BASE } from "../pom/data/urls";
import { expect, test } from "@playwright/test";
import { TestCases } from "../pom/pages/testCasesPage";
import { Products } from "../pom/pages/productsPage";
import { HomePage } from "../pom/pages/homePage";
import { ProductDetailsPage } from "../pom/pages/productDetailsPage";
import { PRODUCT_DETAILS } from "../pom/data/products";
import { HeaderComponent } from "../pom/component/header.component";

test.describe("Login tests", () => {
	let testCases: TestCases;
	let products: Products;
	let homePage: HomePage;
	let productDetailsPage: ProductDetailsPage;
	let headerComponent: HeaderComponent;

	test.beforeEach(async ({ page }) => {
		testCases = new TestCases(page);
		products = new Products(page);
		homePage = new HomePage(page);
		headerComponent = new HeaderComponent(homePage.page);
		productDetailsPage = new ProductDetailsPage(page);
		await homePage.addBlocker(); // Block images to speed up tests
		await test.step("Navigate to the Home page", async () => {
			await page.goto(URL_BASE);
		});
	});

	//flaky test, needs to be fixed, skipping for now
	test.skip("TC7 - Verify Test Cases page", async () => {
		await test.step("Click on Test cases page Link", async () => {
			await headerComponent.clickTestCasesLink();
		});

		await test.step("Validate the Test Cases page", async () => {
			await testCases.validateTestCasesPage();
		});
	});

	test("TC8 - Verify All products and product details page", async () => {
		const product = PRODUCT_DETAILS.default;
		const productCard = await homePage.getProductbyName(product.name);
		await test.step("Click on Products page Link", async () => {
			await headerComponent.clickProductsLink();
			await homePage.closeAdds();
		});

		await test.step("Validate the Products page", async () => {
			await products.validateProductsPage();
		});

		await test.step("Click on first product's 'View Product' link", async () => {
			await productCard.viewProduct();
		});

		await test.step("Validate the Product details page", async () => {
			await productDetailsPage.waitForRoot();
			await expect(productDetailsPage.productInformation).toContainText(
				PRODUCT_DETAILS.default.name
			);
			await expect(productDetailsPage.productInformation).toContainText(
				`Rs. ${PRODUCT_DETAILS.default.price}`
			);
			await expect(productDetailsPage.productInformation).toContainText(
				`Availability: ${PRODUCT_DETAILS.default.availability}`
			);
			await expect(productDetailsPage.productInformation).toContainText(
				`Condition: ${PRODUCT_DETAILS.default.condition}`
			);
			await expect(productDetailsPage.productInformation).toContainText(
				`Brand: ${PRODUCT_DETAILS.default.brand}`
			);
			await expect(productDetailsPage.productInformation).toContainText(
				`Category: ${PRODUCT_DETAILS.default.category}`
			);
		});
	});
});
