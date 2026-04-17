import { test, expect } from "@playwright/test";
import { HomePage } from "../pom/pages/homePage";
import { ProductDetailsPage } from "../pom/pages/productDetailsPage";
import { AddedProductModal } from "../pom/component/addedProductModal.component";
import { HeaderComponent } from "../pom/component/header.component";
import { CartPage } from "../pom/pages/CartPage";
import { URL_BASE } from "../pom/data/urls";
import { VALID_PRODUCTS } from "../pom/data/products";
import { LoginPage } from "../pom/pages/loginPage";
import { USER_SIGNUP, CARD_DETAILS } from "../pom/data/credentials";
import { SignUpPage } from "../pom/pages/signUpPage";
import { AccountCreatedPage } from "../pom/pages/accountCreatedPage";
import { CheckoutPage } from "../pom/pages/checkoutPage";
import { PaymentPage } from "../pom/pages/paymentPage";
import { PaymentDonePage } from "../pom/pages/paymentDonePage";
import { DeletedAccountPage } from "../pom/pages/deletedAccountPage";

test.describe("E2E Tests", () => {
	let homePage: HomePage;
	let productDetailsPage: ProductDetailsPage;
	let addedProductModal: AddedProductModal;
	let cartPage: CartPage;
	let header: HeaderComponent;
	let loginPage: LoginPage;
	let signUpPage: SignUpPage;
	let accounCreatedPage: AccountCreatedPage;
	let checkoutPage: CheckoutPage;
	let paymentPage: PaymentPage;
	let paymentDonePage: PaymentDonePage;
	let deletedAccountPage: DeletedAccountPage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		cartPage = new CartPage(page);
	});

	test("Test Case 13: Verify Product quantity in Cart", async ({ page }) => {
		productDetailsPage = new ProductDetailsPage(page);
		addedProductModal = new AddedProductModal(page);
		const product = VALID_PRODUCTS.default;
		const productCard = await homePage.getProductbyName(product.name);
		const cartItem = await cartPage.getCartItemByName(
			VALID_PRODUCTS.default.name
		);

		await test.step("Navigate to url", async () => {
			await homePage.goto(URL_BASE);
		});

		await test.step("Verify that home page is visible successfully", async () => {
			await homePage.waitForRoot();
		});

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

		await test.step("Verify that product is displayed in cart page with exact quantity", async () => {
			await cartPage.waitForCart();
			await expect(cartItem.productQuantity).toHaveText(
				VALID_PRODUCTS.default.quantity.toString()
			);
		});
	});

	test("Test Case 14: Place Order: Register while Checkout", async ({
		page,
	}) => {
		header = new HeaderComponent(page);
		loginPage = new LoginPage(page);
		signUpPage = new SignUpPage(page);
		accounCreatedPage = new AccountCreatedPage(page);
		checkoutPage = new CheckoutPage(page);
		paymentPage = new PaymentPage(page);
		paymentDonePage = new PaymentDonePage(page);
		deletedAccountPage = new DeletedAccountPage(page);

		await test.step("Navigate to url", async () => {
			await homePage.goto(URL_BASE);
		});

		await test.step("Verify that home page is visible successfully", async () => {
			await homePage.waitForRoot();
		});
		await test.step("Add products to cart", async () => {
			await homePage.addProductsToCart(VALID_PRODUCTS);
		});

		await test.step("Click 'Cart' button", async () => {
			await header.clickCart();
		});

		await test.step("Verify that cart page is displayed", async () => {
			await cartPage.waitForCart();
		});

		await test.step("Click Proceed To Checkout", async () => {
			await cartPage.clickCheckout();
		});

		await test.step("Click 'Register / Login' button", async () => {
			await cartPage.waitForModalCheckout();
			await cartPage.clickModalRegisterLogin();
		});

		await test.step("Fill all details in Signup and create account", async () => {
			await loginPage.waitForSignUpRoot();
			await loginPage.signUp(USER_SIGNUP.name, USER_SIGNUP.email);
			await signUpPage.waitForRoot();
			await signUpPage.fillForm(USER_SIGNUP);
			await signUpPage.submitForm();
		});

		await test.step("Verify 'ACCOUNT CREATED!' and click 'Continue' button", async () => {
			await accounCreatedPage.waitForRoot();
			await expect(accounCreatedPage.successMessage).toContainText(
				"Account Created!"
			);
			await accounCreatedPage.clickContinueButton();
		});

		await test.step("Verify ' Logged in as username' at top", async () => {
			await expect(header.loggedUserName).toHaveText(USER_SIGNUP.name);
		});

		await test.step("Click 'Cart' button", async () => {
			await header.clickCart();
		});

		await test.step("Click 'Proceed To Checkout' button", async () => {
			await cartPage.clickCheckout();
		});

		await test.step("Verify Address Details and Review Your Order", async () => {
			await expect(checkoutPage.deliveryAddressForm).toContainText(
				USER_SIGNUP.zipcode
			);
			await expect(checkoutPage.reviewOderSection).toContainText(
				VALID_PRODUCTS.default.name
			);
		});

		await test.step("Enter description in comment text area and click 'Place Order'", async () => {
			await checkoutPage.commentOrder("Please deliver between 9 AM to 5 PM");
			await checkoutPage.placeOrder();
		});

		await test.step("Enter payment details: Name on Card, Card Number, CVC, Expiration date", async () => {
			await paymentPage.waitForRoot();
			await paymentPage.enterCardDetails(CARD_DETAILS);
		});

		await test.step("Click 'Pay and Confirm Order' button", async () => {
			await paymentPage.payAndConfirmOrder();
		});

		await test.step("Verify success message 'Your order has been placed successfully!'", async () => {
			await paymentDonePage.waitForRoot();
			await expect(paymentDonePage.successMessage).toContainText(
				"Congratulations! Your order has been confirmed!"
			);
		});

		await test.step("Click 'Delete Account' button", async () => {
			await header.clickDeleteAccount();
		});

		await test.step("Verify 'ACCOUNT DELETED!' and click 'Continue' button", async () => {
			await deletedAccountPage.waitForRoot();
			await expect(deletedAccountPage.accountDeletedTitle).toContainText(
				"Account Deleted!"
			);
			await deletedAccountPage.clickContinue();
		});
	});
});
