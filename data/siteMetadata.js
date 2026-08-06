/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
	title: "kjaniec.dev",
	author: "Krzysztof Janiec",
	headerTitle: "kjaniec.dev",
	description: `Software engineer crafting elegant solutions and sharing insights on modern web development, architecture, and best practices.`,
	language: "en-us",
	theme: "dark", // system, dark or light
	siteUrl: "https://kjaniec.dev",
	siteRepo: "https://github.com/kjaniec-dev/personal-website",
	siteLogo: "/static/images/logo.png",
	socialBanner: "/static/images/social-card.png",
	email: "contact@kjaniec.dev",
	github: "https://github.com/kjaniec-dev",
	linkedin: "https://www.linkedin.com/in/kjaniec-dev",
	docker: "https://hub.docker.com/u/kjaniec",
	npm: "https://www.npmjs.com/~kjaniec-dev",
	resume: "/static/files/resume.pdf",
	locale: "en-US",
	// title: 'Next.js Starter Blog',
	// author: 'Tails Azimuth',
	// headerTitle: 'TailwindBlog',
	// description: 'A blog created with Next.js and Tailwind.css',
	// language: 'en-us',
	// theme: 'system', // system, dark or light
	// siteUrl: 'https://tailwind-nextjs-starter-blog.vercel.app',
	// siteRepo: 'https://github.com/timlrx/tailwind-nextjs-starter-blog',
	// siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
	// socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
	// mastodon: 'https://mastodon.social/@mastodonuser',
	// email: 'address@yoursite.com',
	// github: 'https://github.com',
	// x: 'https://twitter.com/x',
	// // twitter: 'https://twitter.com/Twitter',
	// facebook: 'https://facebook.com',
	// youtube: 'https://youtube.com',
	// linkedin: 'https://www.linkedin.com',
	// threads: 'https://www.threads.net',
	// instagram: 'https://www.instagram.com',
	// medium: 'https://medium.com',
	// bluesky: 'https://bsky.app/',
	// locale: 'en-US',
	// set to true if you want a navbar fixed to the top
	stickyNav: false,
	search: {
		provider: "kbar",
		kbarConfig: {
			searchDocumentsPath: `${process.env.BASE_PATH || ""}/search.json`,
		},
	},
};

module.exports = siteMetadata;
