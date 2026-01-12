import { Link, useRouter } from "@tanstack/react-router";
import { motion } from "motion/react";

interface ErrorComponentProps {
	error: Error;
	reset?: () => void;
}

export function ErrorComponent({ error, reset }: ErrorComponentProps) {
	const router = useRouter();

	return (
		<div className="min-h-screen bg-linear-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12"
			>
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
					className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
				>
					<svg
						className="w-12 h-12 text-red-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-label="Error Icon"
					>
						<title>Error</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4"
				>
					Oops! Something Went Wrong
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className="text-lg text-gray-600 text-center mb-6"
				>
					We encountered an error while loading this page.
				</motion.p>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
					className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8"
				>
					<p className="text-sm font-semibold text-red-800 mb-2">
						Error Details:
					</p>
					<p className="text-sm text-red-700 font-mono break-words">
						{error.message || "Unknown error occurred"}
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className="flex flex-col sm:flex-row gap-4 justify-center"
				>
					{reset && (
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={reset}
							className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
						>
							Try Again
						</motion.button>
					)}

					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => router.history.back()}
						className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
					>
						Go Back
					</motion.button>

					<Link to="/">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg w-full sm:w-auto"
						>
							Home
						</motion.button>
					</Link>
				</motion.div>
			</motion.div>
		</div>
	);
}
