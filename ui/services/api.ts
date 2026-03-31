import { Page } from "@playwright/test";
import { DELETE_ACCOUNT, CREATE_ACCOUNT } from "../data/urls";
import { SignupForm } from "../../ui/data/Interfaces";

export interface ApiResponse {
	responseCode: number;
	message: string;
}

export class API {
	constructor(readonly page: Page) {
		this.page = page;
	}

	async createAccount(data: SignupForm) {
		const response = await this.page.request.post(CREATE_ACCOUNT, {
			form: {
				name: data.name,
				email: data.email,
				password: data.password,
				firstname: data.firstName,
				lastname: data.lastName,
				country: data.country,
				state: data.state,
				city: data.city,
				zipcode: data.zipcode,
				mobile_number: data.mobileNumber,
				address1: data.address,
			},
		});
		if (!response.ok()) {
			throw new Error(
				`Create account request failed with status ${response.status()} and message ${await response.text()}`
			);
		}
		return (await response.json()) as ApiResponse;
	}

	async deleteAccount(email: string, password: string) {
		const response = await this.page.request.delete(DELETE_ACCOUNT, {
			form: {
				email: email,
				password: password,
			},
		});
		if (!response.ok()) {
			throw new Error(
				`Delete account request failed with status ${response.status()} and message ${await response.text()}`
			);
		}
		return (await response.json()) as ApiResponse;
	}
}
