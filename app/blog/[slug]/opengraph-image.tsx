import { allBlogs } from "contentlayer/generated";
import { ImageResponse } from "next/og";
import siteMetadata from "@/data/siteMetadata";

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export function generateStaticParams() {
	return allBlogs.map((post) => ({
		slug: decodeURI(post.slug),
	}));
}

export default async function Image({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const resolvedParams = await params;
	const slug = decodeURI(resolvedParams.slug);
	const post = allBlogs.find((p) => p.slug === slug);

	const title = post?.title || siteMetadata.title;
	const summary = post?.summary || siteMetadata.description;
	const tags = (post?.tags || []).slice(0, 3);
	const date = post?.date
		? new Date(post.date).toLocaleDateString("en-US", {
				month: "short",
				year: "numeric",
			})
		: "";

	const isLongTitle = title.length > 55;
	const isVeryLongTitle = title.length > 80;
	const titleFontSize = isVeryLongTitle ? 42 : isLongTitle ? 50 : 58;

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				backgroundColor: "#0c0c0d",
				backgroundImage:
					"radial-gradient(circle at 90% 15%, rgba(16, 185, 129, 0.16), transparent 45%), radial-gradient(circle at 10% 85%, rgba(14, 165, 233, 0.1), transparent 45%)",
				padding: "48px",
			}}
		>
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					borderRadius: "24px",
					border: "1px solid rgba(255, 255, 255, 0.12)",
					backgroundColor: "rgba(18, 18, 20, 0.75)",
					padding: "48px 56px",
				}}
			>
				{/* Header bar */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						width: "100%",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "12px",
						}}
					>
						<div
							style={{
								width: "12px",
								height: "12px",
								borderRadius: "6px",
								backgroundColor: "#10b981",
							}}
						/>
						<span
							style={{
								color: "#f4f4f5",
								fontSize: "20px",
								fontWeight: 700,
								letterSpacing: "-0.02em",
							}}
						>
							kjaniec.dev
						</span>
						<span
							style={{
								color: "#52525b",
								fontSize: "20px",
							}}
						>
							/
						</span>
						<span
							style={{
								color: "#a1a1aa",
								fontSize: "14px",
								fontFamily: "monospace",
								fontWeight: 600,
								letterSpacing: "0.1em",
								textTransform: "uppercase",
							}}
						>
							BLOG
						</span>
					</div>

					{/* Tags */}
					<div
						style={{
							display: "flex",
							gap: "8px",
						}}
					>
						{tags.map((tag) => (
							<div
								key={tag}
								style={{
									display: "flex",
									alignItems: "center",
									padding: "6px 14px",
									borderRadius: "9999px",
									backgroundColor: "rgba(16, 185, 129, 0.12)",
									border: "1px solid rgba(16, 185, 129, 0.25)",
									color: "#34d399",
									fontSize: "14px",
									fontWeight: 600,
								}}
							>
								#{tag}
							</div>
						))}
					</div>
				</div>

				{/* Middle: Title & Summary */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "16px",
						margin: "auto 0",
					}}
				>
					<h1
						style={{
							color: "#ffffff",
							fontSize: `${titleFontSize}px`,
							fontWeight: 700,
							lineHeight: 1.15,
							letterSpacing: "-0.035em",
							margin: 0,
							padding: 0,
						}}
					>
						{title}
					</h1>

					{!isVeryLongTitle && summary ? (
						<p
							style={{
								color: "#a1a1aa",
								fontSize: "20px",
								lineHeight: 1.45,
								margin: 0,
								padding: 0,
								maxWidth: "960px",
							}}
						>
							{summary.length > 140 ? `${summary.slice(0, 140)}…` : summary}
						</p>
					) : null}
				</div>

				{/* Footer bar */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						width: "100%",
						borderTop: "1px solid rgba(255, 255, 255, 0.08)",
						paddingTop: "24px",
					}}
				>
					{/* Author info */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "14px",
						}}
					>
						<div
							style={{
								width: "44px",
								height: "44px",
								borderRadius: "22px",
								background: "linear-gradient(135deg, #10b981, #059669)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "#ffffff",
								fontSize: "18px",
								fontWeight: 700,
							}}
						>
							KJ
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "2px",
							}}
						>
							<span
								style={{
									color: "#f4f4f5",
									fontSize: "17px",
									fontWeight: 600,
								}}
							>
								{siteMetadata.author}
							</span>
							<span
								style={{
									color: "#71717a",
									fontSize: "13px",
								}}
							>
								Senior Software Engineer
							</span>
						</div>
					</div>

					{/* Published date */}
					{date ? (
						<span
							style={{
								color: "#71717a",
								fontSize: "15px",
								fontFamily: "monospace",
							}}
						>
							{date}
						</span>
					) : null}
				</div>
			</div>
		</div>,
		{
			...size,
		},
	);
}
