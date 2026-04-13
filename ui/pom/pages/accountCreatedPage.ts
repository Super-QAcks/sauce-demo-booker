import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";

export class AccountCreatedPage extends PageFactory {
	readonly page: Page;
	readonly accountCreatedRoot: Locator;
	readonly successMessage: Locator;
	readonly continueButton: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.accountCreatedRoot = page.locator("#form");
		this.successMessage = page.getByTestId("account-created");
		this.continueButton = page.getByTestId("continue-button");
	}

	async waitForRoot() {
		await this.accountCreatedRoot.waitFor({ state: "visible" });
	}

	async clickContinueButton() {
		await this.continueButton.click();
	}
}
