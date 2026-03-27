import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";

export class TestCases extends PageFactory {
	private readonly testCasesHeading: Locator;
	private readonly testCasesLink: Locator;

	constructor(page: Page) {
		super(page);
		this.testCasesHeading = page.getByRole("heading", { name: "Test Cases" });
		this.testCasesLink = page.getByRole("link", { name: " Test Cases" });
	}

	async clickTestCasesLink() {
		await this.testCasesLink.click({ force: true });
	}

	async validateTestCasesPage() {
		await this.testCasesHeading.isVisible();
	}
}
