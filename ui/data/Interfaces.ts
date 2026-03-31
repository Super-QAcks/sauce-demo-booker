export interface ContactForm {
	name?: string;
	email: string;
	subject?: string;
	message?: string;
}

export interface SignupForm {
	title?: "mr" | "mrs";
	name: string;
	email: string;
	password: string;
	dayOfBirth: string;
	monthOfBirth: string;
	yearOfBirth: string;
	firstName: string;
	lastName: string;
	company?: string;
	address: string;
	address2?: string;
	country: string;
	state: string;
	city: string;
	zipcode: string;
	mobileNumber: string;
}
