import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
	},
	resolve: {
		alias: {
			"@/components": path.resolve(__dirname, "./components"),
			"@/data": path.resolve(__dirname, "./data"),
			"@/layouts": path.resolve(__dirname, "./layouts"),
			"@/css": path.resolve(__dirname, "./css"),
		},
	},
});
