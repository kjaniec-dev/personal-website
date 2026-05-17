import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = process.cwd();

describe("Learning section removal", () => {
	it("removes the dedicated learning page and course data source", () => {
		expect(existsSync(resolve(projectRoot, "app/learning/page.tsx"))).toBe(
			false,
		);
		expect(existsSync(resolve(projectRoot, "data/coursesData.ts"))).toBe(false);
	});

	it("stops advertising Learning as a homepage quick stat", () => {
		const heroSource = readFileSync(
			resolve(projectRoot, "components/Hero.tsx"),
			"utf8",
		);

		expect(heroSource).not.toContain('label: "Learning"');
	});
});
