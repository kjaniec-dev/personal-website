import NextImage, { type ImageProps } from "next/image";
import imageVariants from "@/data/image-variants.json";

const Image = ({ src, loading, priority, sizes, ...rest }: ImageProps) => {
	const basePath = process.env.BASE_PATH || "";
	const prefix = "/static/images/";
	const filename =
		typeof src === "string" && src.startsWith(prefix)
			? src.slice(prefix.length)
			: "";
	const widths = (imageVariants as Record<string, number[]>)[filename];
	const imageSizes = sizes || "(min-width: 1280px) 1024px, 100vw";

	if (widths) {
		const stem = filename.replace(/\.[^.]+$/, "");
		const variantPath = `${basePath}${prefix}optimized/${stem}`;
		return (
			<picture className={rest.fill ? "absolute inset-0" : "contents"}>
				<source
					type="image/webp"
					srcSet={widths
						.map((width) => `${variantPath}-${width}.webp ${width}w`)
						.join(", ")}
					sizes={imageSizes}
				/>
				<NextImage
					{...rest}
					src={`${variantPath}-${widths.at(-1)}.webp`}
					sizes={imageSizes}
					unoptimized
					loading={priority ? "eager" : loading || "lazy"}
					// Let <picture> select the resource; preloading its fallback would download a second image.
					fetchPriority={priority ? "high" : rest.fetchPriority}
				/>
			</picture>
		);
	}

	return (
		<NextImage
			{...rest}
			src={
				typeof src === "string" && src.startsWith("/")
					? `${basePath}${src}`
					: src
			}
			loading={priority ? undefined : loading || "lazy"}
			priority={priority}
			sizes={imageSizes}
		/>
	);
};

export default Image;
