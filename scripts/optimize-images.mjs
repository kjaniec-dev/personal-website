import { mkdir, readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const imagesDirectory = new URL("../public/static/images/", import.meta.url);
const variants = JSON.parse(
	await readFile(new URL("../data/image-variants.json", import.meta.url), "utf8"),
);
const outputDirectory = new URL("optimized/", imagesDirectory);
await mkdir(outputDirectory, { recursive: true });

let originalBytes = 0;
let largestVariantBytes = 0;
for (const [filename, widths] of Object.entries(variants)) {
	const source = fileURLToPath(new URL(filename, imagesDirectory));
	const metadata = await sharp(source).metadata();
	const stem = filename.replace(/\.[^.]+$/, "");
	originalBytes += (await stat(source)).size;
	for (const width of widths) {
		if (width > metadata.width) {
			throw new Error(`${filename}: ${width}px would enlarge the original`);
		}
		const result = await sharp(source)
			.resize({ width, withoutEnlargement: true })
			.webp({ quality: 82, effort: 5 })
			.toFile(fileURLToPath(new URL(`${stem}-${width}.webp`, outputDirectory)));
		if (width === widths.at(-1)) largestVariantBytes += result.size;
	}
}

console.log(
	`Optimized ${Object.keys(variants).length} screenshots: ${(originalBytes / 1024 / 1024).toFixed(2)} MiB → ${(largestVariantBytes / 1024 / 1024).toFixed(2)} MiB at the largest size (${Math.round((1 - largestVariantBytes / originalBytes) * 100)}% smaller).`,
);
