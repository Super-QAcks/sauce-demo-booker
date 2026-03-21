import { test, invalidLoginTest } from "./helpers/loginFixture.ts";

test.describe("seed for logged in user", () => {
	test("seed using loginPage fixture", async ({ loginPage }) => {
		const page = loginPage; // eslint-disable-line
	});

	invalidLoginTest("seed for invalid login", async ({ loginPage }) => {
		const page = loginPage; // eslint-disable-line
	});
});
