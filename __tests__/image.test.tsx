import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Image from "@/components/Image";

afterEach(() => {
	cleanup();
	vi.unstubAllEnvs();
});

describe("static image variants", () => {
	it("serves responsive WebP screenshots without the Next.js image API", () => {
		render(
			<Image
				src="/static/images/cyberpunk-resume.png"
				alt="Cyberpunk preview"
				fill
				sizes="(min-width: 768px) 440px, 90vw"
			/>,
		);
		const image = screen.getByRole("img");
		const source = image.closest("picture")?.querySelector("source");
		expect(source?.getAttribute("srcset")).toBe(
			"/static/images/optimized/cyberpunk-resume-480.webp 480w, /static/images/optimized/cyberpunk-resume-768.webp 768w, /static/images/optimized/cyberpunk-resume-1280.webp 1280w, /static/images/optimized/cyberpunk-resume-1920.webp 1920w",
		);
		expect(source?.getAttribute("sizes")).toBe(
			"(min-width: 768px) 440px, 90vw",
		);
		expect(image.getAttribute("src")).toBe(
			"/static/images/optimized/cyberpunk-resume-1920.webp",
		);
		expect(image.getAttribute("srcset")).toBeNull();
		expect(image.getAttribute("loading")).toBe("lazy");
		expect(image.style.position).toBe("absolute");
	});

	it("loads priority previews eagerly without preloading a competing fallback", () => {
		const { container } = render(
			<Image
				src="/static/images/protokolator.png"
				alt="Preview"
				width={600}
				height={518}
				priority
			/>,
		);
		const image = screen.getByRole("img");
		expect(image.getAttribute("loading")).toBe("eager");
		expect(image.getAttribute("fetchpriority")).toBe("high");
		expect(container.querySelector('link[rel="preload"]')).toBeNull();
	});

	it("preserves a deployment base path for every responsive candidate", () => {
		vi.stubEnv("BASE_PATH", "/portfolio");
		render(
			<Image
				src="/static/images/protokolator.png"
				alt="Preview"
				width={600}
				height={518}
			/>,
		);
		const image = screen.getByRole("img");
		expect(image.getAttribute("src")).toBe(
			"/portfolio/static/images/optimized/protokolator-1256.webp",
		);
		const candidates = image
			.closest("picture")
			?.querySelector("source")
			?.getAttribute("srcset")
			?.split(", ");
		expect(candidates).toHaveLength(3);
		for (const candidate of candidates ?? []) {
			expect(candidate).toMatch(/^\/portfolio\/static\/images\/optimized\//);
		}
	});

	it("keeps images outside the variant list on their existing path", () => {
		render(
			<Image
				src="/static/images/avatar.jpg"
				alt="Portrait"
				width={220}
				height={220}
				unoptimized
			/>,
		);
		const image = screen.getByRole("img");
		expect(image.getAttribute("src")).toBe("/static/images/avatar.jpg");
		expect(image.closest("picture")).toBeNull();
	});
});
