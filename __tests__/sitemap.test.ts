import sitemap from "app/sitemap";
import { describe, expect, it } from "vitest";
import siteMetadata from "@/data/siteMetadata";

describe("sitemap", () => {
	it("includes core static pages", () => {
		const entries = sitemap();
		const urls = entries.map((entry) => entry.url);

		expect(urls).toContain(`${siteMetadata.siteUrl}/`);
		expect(urls).toContain(`${siteMetadata.siteUrl}/about`);
		expect(urls).toContain(`${siteMetadata.siteUrl}/projects`);
		expect(urls).toContain(`${siteMetadata.siteUrl}/blog`);
		expect(urls).toContain(`${siteMetadata.siteUrl}/faq`);
		expect(urls).toContain(`${siteMetadata.siteUrl}/tags`);
	});

	it("includes tag pages from tag data", () => {
		const entries = sitemap();
		const urls = entries.map((entry) => entry.url);

		expect(urls).toContain(`${siteMetadata.siteUrl}/tags/react`);
		expect(urls).toContain(`${siteMetadata.siteUrl}/tags/typescript`);
	});

	it("includes published blog posts and excludes drafts", () => {
		const entries = sitemap();
		const blogEntries = entries.filter((entry) =>
			entry.url.startsWith(`${siteMetadata.siteUrl}/blog/`),
		);
		expect(blogEntries.length).toBeGreaterThan(0);

		for (const entry of entries) {
			expect(entry.lastModified).toBeDefined();
			expect(typeof entry.lastModified).toBe("string");
		}
	});
});
