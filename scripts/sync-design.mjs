#!/usr/bin/env node
/**
 * Syncs css/kj-design.css from packages/design/theme.css in kjaniec-dev/ui-kit on GitHub.
 * Run: npm run sync-design
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../css/kj-design.css");

const RAW_URL =
	"https://raw.githubusercontent.com/kjaniec-dev/ui-kit/main/packages/design/theme.css";

const res = await fetch(RAW_URL);
if (!res.ok)
	throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);

const css = await res.text();
writeFileSync(OUT, css, "utf8");
console.log(`✓ css/kj-design.css synced from ui-kit/packages/design/theme.css`);
