import { test } from "./helpers/loginFixture";

test.describe("Login tests", () => {
	test("should log out successfully", async ({ loginPage }) => {
		test.step("Click on Logout link", async () => {
			await loginPage.logout();
		});

		test.step("Validate successful logout", async () => {
			await loginPage.waitForRoot();
		});
	});
});
