import type { AxiosResponse } from "axios";
import { StatusCodes as HTTP_STATUS } from "http-status-codes";
import axiosInstance from "./axios";

// Generic API response type
export interface ApiResponse<T = unknown> {
	data: T;
	message?: string;
	status: number;
}

// API service functions
export const api = {
	// GET request
	get: async <T = unknown>(url: string, params?: Record<string, unknown>) => {
		const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.get(
			url,
			{ params },
		);
		return response.data;
	},

	// POST request
	post: async <T = unknown>(url: string, data?: unknown) => {
		const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.post(
			url,
			data,
		);
		return response.data;
	},

	// PUT request
	put: async <T = unknown>(url: string, data?: unknown) => {
		const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.put(
			url,
			data,
		);
		return response.data;
	},

	// PATCH request
	patch: async <T = unknown>(url: string, data?: unknown) => {
		const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.patch(
			url,
			data,
		);
		return response.data;
	},

	// DELETE request
	delete: async <T = unknown>(url: string) => {
		const response: AxiosResponse<ApiResponse<T>> =
			await axiosInstance.delete(url);
		return response.data;
	},
};

export { HTTP_STATUS };
