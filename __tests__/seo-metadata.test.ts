import { allBlogs } from "contentlayer/generated";
import { describe, expect, it } from "vitest";
import { genPageMetadata } from "../app/seo";
import { generateMetadata as generateTagMetadata } from "../app/tags/[tag]/page";
import { generateMetadata as generatePaginatedTagMetadata } from "../app/tags/[tag]/page/[page]/page";
import { metadata as tagsPageMetadata } from "../app/tags/page";
import siteMetadata from "../data/siteMetadata";

describe("SEO metadata & structured data", () => {
	it("genPageMetadata includes twitter description matching page description", () => {
		const meta = genPageMetadata({
			title: "Custom Page",
			description: "A custom test description for SEO.",
		});

		expect(meta.description).toBe("A custom test description for SEO.");
		expect(meta.twitter?.description).toBe(
			"A custom test description for SEO.",
		);
	});

	it("genPageMetadata falls back to siteMetadata description on twitter card", () => {
		const meta = genPageMetadata({
			title: "Fallback Page",
		});

		expect(meta.twitter?.description).toBe(siteMetadata.description);
	});

	it("tag page generateMetadata produces custom formatted description", async () => {
		const meta = await generateTagMetadata({
			params: Promise.resolve({ tag: "typescript" }),
		});

		expect(meta.title).toBe("typescript");
		expect(meta.description).toContain("#typescript");
		expect(meta.description).toContain(siteMetadata.author);
	});

	it("paginated tag page generateMetadata includes page number in title and description", async () => {
		const meta = await generatePaginatedTagMetadata({
			params: Promise.resolve({ tag: "typescript", page: "2" }),
		});

		expect(meta.title).toBe("typescript - Page 2");
		expect(meta.description).toContain("Page 2");
		expect(meta.description).toContain("#typescript");
	});

	it("tags overview page has an informative metadata description", () => {
		expect(tagsPageMetadata.description).toContain("Browse articles");
	});

	it("blog posts contain complete rich snippet schema (publisher, mainEntityOfPage, author url)", () => {
		const post = allBlogs[0];
		expect(post).toBeDefined();

		const schema = post.structuredData;
		expect(schema["@type"]).toBe("BlogPosting");
		expect(schema.url).toBe(
			`${siteMetadata.siteUrl}/${post._raw.flattenedPath}`,
		);

		// mainEntityOfPage
		expect(schema.mainEntityOfPage).toEqual({
			"@type": "WebPage",
			"@id": `${siteMetadata.siteUrl}/${post._raw.flattenedPath}`,
		});

		// author
		expect(schema.author).toBeDefined();
		expect(schema.author.name).toBe(siteMetadata.author);
		expect(schema.author.url).toBe(siteMetadata.siteUrl);

		// publisher
		expect(schema.publisher).toBeDefined();
		expect(schema.publisher["@type"]).toBe("Person");
		expect(schema.publisher.name).toBe(siteMetadata.author);
		expect(schema.publisher.logo).toEqual({
			"@type": "ImageObject",
			url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
		});
	});

	it("blog post metadata allows Next.js opengraph-image when post.images is not specified", async () => {
		const postWithoutImage = allBlogs.find((p) => !p.images);
		expect(postWithoutImage).toBeDefined();

		const { generateMetadata: generateBlogMetadata } = await import(
			"../app/blog/[slug]/page"
		);
		const meta = await generateBlogMetadata({
			params: Promise.resolve({
				slug: postWithoutImage?.slug || "",
			}),
		});

		expect(meta).toBeDefined();
		expect(meta?.title).toBe(postWithoutImage?.title);
		// openGraph.images should not be explicitly set to allow Next.js opengraph-image to take effect
		expect(meta?.openGraph?.images).toBeUndefined();
		expect(meta?.twitter?.images).toBeUndefined();
	});

	it("opengraph-image generateStaticParams covers all published blogs", async () => {
		const { generateStaticParams } = await import(
			"../app/blog/[slug]/opengraph-image"
		);
		const params = generateStaticParams();

		expect(params).toHaveLength(allBlogs.length);
		expect(params[0]).toHaveProperty("slug");
	});
});
