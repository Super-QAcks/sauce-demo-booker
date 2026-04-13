import { Page, Locator } from "@playwright/test";
import { PageFactory } from "./pageFactory";
import { SignupForm } from "../data/interfaces";

export class SignUpPage extends PageFactory {
	public readonly signUpFormRoot: Locator;
	public readonly titleMr: Locator;
	public readonly titleMrs: Locator;
	public readonly password: Locator;
	public readonly dayOfBirth: Locator;
	public readonly monthOfBirth: Locator;
	public readonly yearOfBirth: Locator;
	public readonly firstName: Locator;
	public readonly lastName: Locator;
	public readonly company: Locator;
	public readonly address: Locator;
	public readonly address2: Locator;
	public readonly country: Locator;
	public readonly state: Locator;
	public readonly city: Locator;
	public readonly zipcode: Locator;
	public readonly mobileNumber: Locator;
	public readonly submitButton: Locator;
	public readonly signUpForNews: Locator;
	public readonly receiveSpecialOffers: Locator;

	constructor(page: Page) {
		super(page);
		this.signUpFormRoot = page.locator("#form");
		this.titleMr = page.locator("#id_gender1");
		this.titleMrs = page.locator("#id_gender2");
		this.password = page.getByTestId("password");
		this.dayOfBirth = page.getByTestId("days");
		this.monthOfBirth = page.getByTestId("months");
		this.yearOfBirth = page.getByTestId("years");
		this.firstName = page.getByTestId("first_name");
		this.lastName = page.getByTestId("last_name");
		this.company = page.getByTestId("company");
		this.address = page.getByTestId("address");
		this.address2 = page.getByTestId("address2");
		this.country = page.getByTestId("country");
		this.state = page.getByTestId("state");
		this.city = page.getByTestId("city");
		this.zipcode = page.getByTestId("zipcode");
		this.mobileNumber = page.getByTestId("mobile_number");
		this.submitButton = page.getByTestId("create-account");
		this.signUpForNews = page.locator("#newsletter");
		this.receiveSpecialOffers = page.locator("#optin");
	}

	private async fillField(locator: Locator, value?: string) {
		if (!value) {
			return;
		}

		await locator.fill(value);
	}

	private async selectField(locator: Locator, value?: string) {
		if (!value) {
			return;
		}

		await locator.selectOption(value);
	}

	private async selectTitle(title?: SignupForm["title"]) {
		if (!title) {
			return;
		}

		const titleLocator = title === "mr" ? this.titleMr : this.titleMrs;
		await titleLocator.click();
	}

	async waitForRoot() {
		await this.signUpFormRoot.waitFor({ state: "visible" });
	}

	async fillForm(data: SignupForm) {
		await this.selectTitle(data.title);
		await this.fillField(this.password, data.password);
		await this.selectField(this.dayOfBirth, data.dayOfBirth);
		await this.selectField(this.monthOfBirth, data.monthOfBirth);
		await this.selectField(this.yearOfBirth, data.yearOfBirth);
		await this.fillField(this.firstName, data.firstName);
		await this.fillField(this.lastName, data.lastName);
		await this.fillField(this.company, data.company);
		await this.fillField(this.address, data.address);
		await this.selectField(this.country, data.country);
		await this.fillField(this.state, data.state);
		await this.fillField(this.city, data.city);
		await this.fillField(this.zipcode, data.zipcode);
		await this.fillField(this.mobileNumber, data.mobileNumber);
		await this.submitButton.click();
	}
}
