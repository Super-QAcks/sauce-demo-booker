import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";

export class DeletedAccountPage extends PageFactory {
	readonly page: Page;
	readonly deletedAccountRoot: Locator;
	readonly accountDeletedTitle: Locator;
	readonly accountDeletedMessage: Locator;
	readonly continueButton: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.deletedAccountRoot = page.locator("#form");
		this.accountDeletedTitle = page.getByRole("heading", {
			name: "Account Deleted!",
		});
		this.accountDeletedMessage = page
			.locator(".container")
			.filter({ hasText: "Your account has been permanently deleted!" });
		this.continueButton = page.getByTestId("continue-button");
	}

	async waitForRoot() {
		await this.deletedAccountRoot.waitFor({ state: "visible" });
	}

	async clickContinue() {
		await this.continueButton.click();
	}
}
