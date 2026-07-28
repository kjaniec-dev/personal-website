const { withContentlayer } = require("next-contentlayer2");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://static.cloudflareinsights.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  media-src 'self' https://*.s3.amazonaws.com;
  connect-src 'self' https://cloudflareinsights.com;
  font-src 'self' data:;
  frame-src 'none';
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`;

const securityHeaders = [
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
	{
		key: "Content-Security-Policy",
		value: ContentSecurityPolicy.replace(/\n/g, ""),
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
	{
		key: "Referrer-Policy",
		value: "strict-origin-when-cross-origin",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
	{
		key: "X-Frame-Options",
		value: "DENY",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
	{
		key: "X-Content-Type-Options",
		value: "nosniff",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
	{
		key: "X-DNS-Prefetch-Control",
		value: "on",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
	{
		key: "Strict-Transport-Security",
		value: "max-age=63072000; includeSubDomains; preload",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy
	{
		key: "Cross-Origin-Opener-Policy",
		value: "same-origin",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy
	{
		key: "Cross-Origin-Resource-Policy",
		value: "same-origin",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=(), payment=()",
	},
];

const output = process.env.EXPORT ? "export" : undefined;
const basePath = process.env.BASE_PATH || undefined;
const unoptimized = process.env.UNOPTIMIZED ? true : undefined;

/**
 * @type {import('next').NextConfig}
 **/
module.exports = () => {
	const plugins = [withContentlayer, withBundleAnalyzer];
	return plugins.reduce((acc, next) => next(acc), {
		output,
		basePath,
		reactStrictMode: true,
		trailingSlash: false,
		// Enable Turbopack explicitly to avoid Next 16 warning when a legacy webpack
		// config existed previously. An empty config is sufficient.
		turbopack: {},
		pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
		// Performance optimizations
		compress: true,
		poweredByHeader: false,
		images: {
			remotePatterns: [
				{
					protocol: "https",
					hostname: "picsum.photos",
				},
			],
			unoptimized,
			// Add image optimization settings
			formats: ["image/avif", "image/webp"],
			minimumCacheTTL: 60,
		},
		// Experimental features for better performance
		experimental: {
			optimizePackageImports: ["pliny", "react-icons"],
		},
		async headers() {
			return [
				{
					source: "/(.*)",
					headers: securityHeaders,
				},
				// Add caching headers for static assets
				{
					source: "/static/:path*",
					headers: [
						{
							key: "Cache-Control",
							value: "public, max-age=31536000, immutable",
						},
					],
				},
			];
		},
	});
};
