import { Product } from "./interfaces";

export const VALID_PRODUCTS = {
	default: {
		name: "Blue Top",
		quantity: 4,
		price: 500,
	} as Product,
	greenTshirt: {
		name: "Pure Cotton Neon Green Tshirt",
		quantity: 2,
		price: 50,
	} as Product,
};

export const PRODUCT_DETAILS = {
	default: {
		name: "Blue Top",
		quantity: 4,
		price: 500,
		category: "Women > Tops",
		availability: "In Stock",
		condition: "New",
		brand: "Polo",
	} as Product,
};
