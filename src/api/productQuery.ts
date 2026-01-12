import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "@/lib/api";

const productSchema = z.object({
	id: z.number().int(),
	title: z.string(),
	price: z.number(),
	description: z.string(),
	category: z.string(),
	image: z.string(),
});

const productsSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;

export const getAllProductsQueryOptions = queryOptions({
	queryKey: ["products"],
	queryFn: async () => {
		const response = await api.get("https://fakestoreapi.com/products");
		return productsSchema.parse(response);
	},
});

export const getProductByIdQueryOptions = (productId: number) =>
	queryOptions({
		queryKey: ["products", productId],
		queryFn: async () => {
			const response = await api.get(
				`https://fakestoreapi.com/products/${productId}`,
			);
			return productSchema.parse(response);
		},
	});
