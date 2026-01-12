import axios, { type AxiosError, type AxiosResponse } from "axios";
import { StatusCodes } from "http-status-codes";

// Re-export StatusCodes for convenience
export { StatusCodes as HTTP_STATUS };

// Create axios instance
const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		// Add auth token if available
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		// Log request in development
		// if (import.meta.env.DEV) {
		// 	console.log("📤 Request:", {
		// 		method: config.method?.toUpperCase(),
		// 		url: config.url,
		// 		data: config.data,
		// 	});
		// }

		return config;
	},
	(error) => {
		console.error("❌ Request Error:", error);
		return Promise.reject(error);
	},
);

// Response interceptor
axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		// Log response in development
		// if (import.meta.env.DEV) {
		// 	console.log("📥 Response:", {
		// 		status: response.status,
		// 		url: response.config.url,
		// 		data: response.data,
		// 	});
		// }

		return response;
	},
	(error: AxiosError) => {
		// Handle specific status codes
		if (error.response) {
			const status = error.response.status;

			switch (status) {
				case StatusCodes.UNAUTHORIZED:
					// Clear token and redirect to login
					localStorage.removeItem("token");
					window.location.href = "/login";
					break;

				case StatusCodes.FORBIDDEN:
					console.error("🚫 Access Forbidden");
					break;

				case StatusCodes.NOT_FOUND:
					console.error("🔍 Resource Not Found");
					break;

				case StatusCodes.TOO_MANY_REQUESTS:
					console.error("⏱️ Too Many Requests - Please slow down");
					break;

				case StatusCodes.INTERNAL_SERVER_ERROR:
					console.error("💥 Server Error");
					break;

				case StatusCodes.SERVICE_UNAVAILABLE:
					console.error("🔧 Service Unavailable");
					break;

				default:
					console.error(`❌ Error ${status}:`, error.response.data);
			}
		} else if (error.request) {
			console.error("🌐 Network Error - No response received");
		} else {
			console.error("⚠️ Request Error:", error.message);
		}

		return Promise.reject(error);
	},
);

export default axiosInstance;
