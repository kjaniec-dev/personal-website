import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

const postPath = path.join(process.cwd(), "data/blog/docker-sandboxes.mdx");

describe("Docker Sandboxes blog post", () => {
	test("contains the repository link and future development note", () => {
		expect(existsSync(postPath)).toBe(true);

		if (!existsSync(postPath)) return;

		const post = readFileSync(postPath, "utf8");

		expect(post).toContain(
			"title: 'Docker Sandboxes for Claude Code and Codex'",
		);
		expect(post).toContain("https://github.com/kjaniec-dev/docker-sandboxes");
		expect(post).toContain("## Repository and documentation");
		expect(post).toContain(
			"https://github.com/kjaniec-dev/docker-sandboxes/blob/main/docs/usage.md",
		);
		expect(post).toContain("I plan to keep expanding this repository");
	});
});
