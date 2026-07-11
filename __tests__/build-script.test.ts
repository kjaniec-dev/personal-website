import { describe, expect, it } from "vitest";
import packageJson from "../package.json";

describe("production build pipeline", () => {
	it("generates Contentlayer data before compiling Next.js", () => {
		const buildScript = packageJson.scripts.build;
		const contentlayerBuild = buildScript.indexOf("bun x contentlayer2 build");
		const nextBuild = buildScript.indexOf("next build");

		expect(contentlayerBuild).toBeGreaterThanOrEqual(0);
		expect(nextBuild).toBeGreaterThan(contentlayerBuild);
	});
});
