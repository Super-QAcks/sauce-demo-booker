import { SignupForm, CardDetails } from "../data/interfaces";

export const LOGIN_CREDENTIALS = {
	STANDARD_USER: process.env.STANDARD_USER || "default user",
	PASSWORD: process.env.PASSWORD || "default password",
	INVALID_USER: "juan@aom.com",
	INVALID_PASSWORD: "password123",
	NAME_USER: "Juan",
};

export const USER_SIGNUP: SignupForm = {
	name: "Test dummy",
	email: "420test69@gmail.com",
	password: LOGIN_CREDENTIALS.PASSWORD,
	dayOfBirth: "1",
	monthOfBirth: "1",
	yearOfBirth: "2000",
	firstName: "test",
	lastName: "dummy",
	address: "some place, some place",
	country: "Singapore",
	state: "Singaporean state",
	city: "Singaporean city",
	zipcode: "102912",
	mobileNumber: "0009289323",
};

export const CARD_DETAILS: CardDetails = {
	nameOnCard: USER_SIGNUP.name,
	cardNumber: "4111111111111111",
	cvc: "123",
	expirationMonth: "12",
	expirationYear: "2025",
};
