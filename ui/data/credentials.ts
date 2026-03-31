import { SignupForm } from "../data/Interfaces";

export const LOGIN_CREDENTIALS = {
	STANDARD_USER: process.env.STANDARD_USER || "default user",
	PASSWORD: process.env.PASSWORD || "Password123!",
	INVALID_USER: "juan@aom.com",
	INVALID_PASSWORD: "password123",
};

export const LOGIN_SIGNUP_INVALID = {
	name: "Test Invalid",
	email: "invalidemail",
};

export const LOGIN_SIGNUP_DUPLICATE = {
	name: "Test Duplicate",
	email: "duplicatetest@gmail.com",
};

export const USER_SIGNUP: SignupForm = {
	name: "Test dummy",
	email: "666test666@gmail.com",
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
