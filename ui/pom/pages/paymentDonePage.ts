import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";

export class PaymentDonePage extends PageFactory {
	readonly page: Page;
	readonly paymentDoneRoot: Locator;
	readonly orderPlacedMessage: Locator;
	readonly successMessage: Locator;
	readonly downloadInvoiceButton: Locator;
	readonly continueButton: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.paymentDoneRoot = page.locator("#form");
		this.orderPlacedMessage = page.getByRole("heading", {
			name: "Order Placed!",
		});
		this.successMessage = page
			.locator(".container")
			.filter({ hasText: "Congratulations! Your order has been confirmed!" });
		this.downloadInvoiceButton = page.getByRole("link", {
			name: "Download Invoice",
		});
		this.continueButton = page.getByTestId("continue-button");
	}

	async waitForRoot() {
		await this.paymentDoneRoot.waitFor({ state: "visible" });
	}

	async clickContinue() {
		await this.continueButton.click();
	}

	async clickDownloadInvoice() {
		await this.downloadInvoiceButton.click();
	}
}
