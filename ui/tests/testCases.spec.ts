import { URL_BASE } from "../pom/data/urls";
import { test } from "./helpers/loginFixture";
import { TestCases } from "../pom/pages/testCasesPage";

test.describe("Login tests", () => {
	let testCases: TestCases;

	test.beforeEach(async ({ page }) => {
		testCases = new TestCases(page);
		test.step("Navigate to the Home page", async () => {
			await testCases.goto(URL_BASE);
		});
	});

	test("Verify Test Cases page", async () => {
		test.step("Click on Test cases page Link", async () => {
			await testCases.clickTestCasesLink();
		});

		test.step("Validate the Test Cases page", async () => {
			await testCases.validateTestCasesPage();
		});
	});
});
