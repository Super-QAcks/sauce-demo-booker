import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";

export class TestCases extends PageFactory {
	private readonly testCasesHeading: Locator;

	constructor(page: Page) {
		super(page);
		this.testCasesHeading = page.getByRole("heading", { name: "Test Cases" });
	}

	async validateTestCasesPage() {
		await this.testCasesHeading.isVisible();
	}
}
