export interface Product {
	name: string;
	quantity: number;
	price?: number;
	category?: string;
	availability?: string;
	condition?: string;
	brand?: string;
}
export interface ContactForm {
	name?: string;
	email: string;
	subject?: string;
	message?: string;
}
