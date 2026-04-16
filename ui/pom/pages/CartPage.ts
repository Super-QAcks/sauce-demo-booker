import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";
import { CartItemCard } from "../component/cartItemCard.component";

export class CartPage extends PageFactory {
	readonly page: Page;
	readonly cartRoot: Locator;
	readonly checkoutButton: Locator;
	readonly modalCheckoutRoot: Locator;
	readonly modalRegisterLoginLink: Locator;
	readonly modalContinueOnCartButton: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.cartRoot = page.locator("#cart_info");
		this.checkoutButton = page.getByText("Proceed To Checkout");
		this.modalCheckoutRoot = page.locator(".modal-content");
		this.modalRegisterLoginLink = page.getByRole("link", {
			name: "Register / Login",
		});
		this.modalContinueOnCartButton = page.getByRole("button", {
			name: "Continue On Cart",
		});
	}

	async waitForCart() {
		await this.cartRoot.waitFor({ state: "visible" });
	}

	async getCartItemByName(name: string) {
		return new CartItemCard(
			this.cartRoot.locator("tr").filter({ hasText: name })
		);
	}

	async clickCheckout() {
		await this.checkoutButton.click();
	}

	async waitForModalCheckout() {
		await this.modalCheckoutRoot.waitFor({ state: "visible" });
	}

	async clickModalRegisterLogin() {
		await this.modalRegisterLoginLink.click();
	}
}
