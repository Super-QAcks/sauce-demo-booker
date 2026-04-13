import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";

export class CheckoutPage extends PageFactory {
	readonly page: Page;
	readonly checkoutRoot: Locator;
	readonly deliveryAddressForm: Locator;
	readonly billingAddressForm: Locator;
	readonly reviewOderSection: Locator;
	readonly commentOrderTextArea: Locator;
	readonly placeOrderButton: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.checkoutRoot = page.locator("#cart_items > .container");
		this.deliveryAddressForm = page.locator("#address_delivery");
		this.billingAddressForm = page.locator("#address_invoice");
		this.reviewOderSection = page.locator("#cart_info");
		this.commentOrderTextArea = page.locator('textarea[name="message"]');
		this.placeOrderButton = page.getByRole("link", { name: "Place Order" });
	}

	async waitForRoot() {
		await this.checkoutRoot.waitFor({ state: "visible" });
	}

	async commentOrder(comment: string) {
		await this.commentOrderTextArea.fill(comment);
	}

	async placeOrder() {
		await this.placeOrderButton.click();
	}
}
