import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";
import { CardDetails } from "../data/interfaces";

export class PaymentPage extends PageFactory {
	readonly page: Page;
	readonly paymentRoot: Locator;
	readonly nameOnCardInput: Locator;
	readonly cardNumberInput: Locator;
	readonly cvcInput: Locator;
	readonly expirationMonthInput: Locator;
	readonly expirationYearInput: Locator;
	readonly payAndConfirmOrderButton: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.paymentRoot = page.locator("#cart_items");
		this.nameOnCardInput = page.getByTestId("name-on-card");
		this.cardNumberInput = page.getByTestId("card-number");
		this.cvcInput = page.getByTestId("cvc");
		this.expirationMonthInput = page.getByTestId("expiry-month");
		this.expirationYearInput = page.getByTestId("expiry-year");
		this.payAndConfirmOrderButton = page.getByTestId("pay-button");
	}

	async waitForRoot() {
		await this.paymentRoot.waitFor({ state: "visible" });
	}

	async enterCardDetails(cardDetails: CardDetails) {
		await this.nameOnCardInput.fill(cardDetails.nameOnCard);
		await this.cardNumberInput.fill(cardDetails.cardNumber);
		await this.cvcInput.fill(cardDetails.cvc);
		await this.expirationMonthInput.fill(cardDetails.expirationMonth);
		await this.expirationYearInput.fill(cardDetails.expirationYear);
	}

	async payAndConfirmOrder() {
		await this.payAndConfirmOrderButton.click();
	}
}
