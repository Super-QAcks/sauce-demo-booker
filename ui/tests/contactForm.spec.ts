import { test, expect } from "@playwright/test";
import { ContactUsPage } from "../pom/pages/contactUs";
import { HeaderComponent } from "../pom/components/header.component";
import { URL_BASE } from "../pom/data/urls";

test.describe("Contact Us form tests", () => {
	let contactUsPage: ContactUsPage;
	let headerComponent: HeaderComponent;

	test.beforeEach(async ({ page }) => {
		contactUsPage = new ContactUsPage(page);
		headerComponent = new HeaderComponent(page);
		await page.goto(URL_BASE);
		await headerComponent.clickContactUs();
		await contactUsPage.waitForRoot();
	});

	test("should submit the contact form successfully", async ({ page }) => {
		const formData = {
			name: "John Doe",
			email: "john.doe@example.com",
			subject: "Test Subject",
			message: "This is a test message.",
		};
		await contactUsPage.fillContactForm(formData);

		page.on("dialog", async (dialog) => {
			expect(dialog.message()).toContain("Press OK to proceed!");
			await dialog.accept();
		});
		await contactUsPage.submitForm();

		await contactUsPage.waitForRoot();
		await expect(contactUsPage.successMessage).toBeVisible();
		await contactUsPage.clickHome();
		await expect(page).toHaveURL(URL_BASE);
	});
});
