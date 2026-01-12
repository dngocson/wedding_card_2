import { readdirSync, renameSync, statSync, writeFileSync } from "fs";
import { basename, extname, join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, "../public/images");
const outputFile = join(__dirname, "../src/imageMap.ts");

// Image extensions to include
const imageExtensions = [
	".jpg",
	".jpeg",
	".png",
	".gif",
	".svg",
	".webp",
	".avif",
];

function generateImageMap() {
	try {
		const files = readdirSync(publicDir);

		// Filter only image files and get their sizes
		const imageFiles = files
			.filter((file) => {
				const ext = extname(file).toLowerCase();
				return imageExtensions.includes(ext);
			})
			.map((file) => {
				const filePath = join(publicDir, file);
				const stats = statSync(filePath);
				return {
					name: file,
					size: stats.size,
				};
			});

		// Sort by size (largest first)
		imageFiles.sort((a, b) => b.size - a.size);

		// Rename files to image_0, image_1, etc.
		console.log("🔄 Renaming files...");
		imageFiles.forEach((file, index) => {
			const ext = extname(file.name);
			const newName = `image_${index}${ext}`;
			const oldPath = join(publicDir, file.name);
			const newPath = join(publicDir, newName);

			if (file.name !== newName) {
				renameSync(oldPath, newPath);
				console.log(
					`  ${file.name} → ${newName} (${(file.size / 1024).toFixed(2)} KB)`,
				);
			}

			// Update the file name in our array
			file.name = newName;
		});

		// Generate TypeScript file content
		let content = "// Auto-generated image map - Do not edit manually\n";
		content += "// Generated at: " + new Date().toISOString() + "\n";
		content += "// Images sorted by size (largest first)\n\n";
		content += "export const imageMap = {\n";

		imageFiles.forEach((file, index) => {
			const key = `image_${index}`;
			const isLast = index === imageFiles.length - 1;
			const sizeKB = (file.size / 1024).toFixed(2);
			content += `  ${key}: '/images/${file.name}', // ${sizeKB} KB${
				isLast ? "" : ","
			}\n`;
		});

		content += "} as const;\n\n";
		content += "export type ImageKey = keyof typeof imageMap;\n";

		// Write to file
		writeFileSync(outputFile, content, "utf-8");

		console.log(`✅ Image map generated successfully!`);
		console.log(`📁 Found ${imageFiles.length} images`);
		console.log(`📝 Output: ${outputFile}`);
	} catch (error) {
		console.error("❌ Error generating image map:", error);
		process.exit(1);
	}
}

generateImageMap();
