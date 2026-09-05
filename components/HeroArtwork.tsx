import { useId } from "react";

export default function HeroArtwork() {
	const id = useId();

	return (
		<svg
			aria-hidden="true"
			focusable="false"
			viewBox="0 0 460 460"
			fill="none"
			className="h-auto w-full overflow-visible"
		>
			<defs>
				<linearGradient
					id={`${id}-face`}
					x1="70"
					y1="90"
					x2="310"
					y2="260"
					gradientUnits="userSpaceOnUse"
				>
					<stop className="[stop-color:var(--color-subtle)]" />
					<stop offset="1" className="[stop-color:var(--color-surface)]" />
				</linearGradient>
				<linearGradient
					id={`${id}-edge`}
					x1="40"
					y1="156"
					x2="380"
					y2="246"
					gradientUnits="userSpaceOnUse"
				>
					<stop className="[stop-color:var(--color-border)]" />
					<stop offset="0.5" className="[stop-color:var(--color-primary)]" />
					<stop offset="1" className="[stop-color:var(--color-border)]" />
				</linearGradient>
				<linearGradient
					id={`${id}-core`}
					x1="40"
					y1="228"
					x2="380"
					y2="320"
					gradientUnits="userSpaceOnUse"
				>
					<stop
						className="[stop-color:var(--color-primary)]"
						stopOpacity="0.04"
					/>
					<stop
						offset="0.5"
						className="[stop-color:var(--color-primary)]"
						stopOpacity="0.25"
					/>
					<stop
						offset="1"
						className="[stop-color:var(--color-primary)]"
						stopOpacity="0.06"
					/>
				</linearGradient>
				<radialGradient id={`${id}-light`}>
					<stop
						className="[stop-color:var(--color-primary)]"
						stopOpacity="0.12"
					/>
					<stop
						offset="1"
						className="[stop-color:var(--color-primary)]"
						stopOpacity="0"
					/>
				</radialGradient>
			</defs>

			<ellipse cx="230" cy="260" rx="240" ry="210" fill={`url(#${id}-light)`} />
			<g className="stroke-border" strokeWidth="0.75" opacity="0.65">
				<path d="m0 290 230 122 230-122M0 342l230 122 230-122M0 238l230 122 230-122" />
				<path d="m40 200 380 201M140 160l320 170M420 200 40 401M320 160 0 330" />
			</g>

			<g
				className="stroke-muted-foreground"
				strokeDasharray="3 6"
				opacity="0.3"
			>
				<path d="M40 156v144M210 66v144M380 156v144M210 246v144" />
			</g>

			<path
				d="m40 300 170 90 170-90v12l-170 90-170-90Z"
				className="fill-surface stroke-border"
			/>
			<path
				d="m40 300 170-90 170 90-170 90Z"
				fill={`url(#${id}-face)`}
				className="stroke-border"
			/>
			<g className="stroke-muted-foreground" strokeWidth="0.8" opacity="0.4">
				<path d="m82 300 128-68 128 68-128 68ZM125 300l85-45 85 45-85 45Z" />
				<path d="m40 300 170 0 85 45M210 210v90l-85 45M380 300H210v90" />
			</g>
			<g className="fill-primary">
				<circle cx="82" cy="300" r="2.5" />
				<circle cx="210" cy="255" r="2.5" />
				<circle cx="295" cy="345" r="2.5" />
			</g>

			<path
				d="m40 228 170 90 170-90v12l-170 90-170-90Z"
				className="fill-surface"
				stroke={`url(#${id}-edge)`}
			/>
			<path d="m40 228 170-90 170 90-170 90Z" className="fill-background" />
			<path
				d="m40 228 170-90 170 90-170 90Z"
				fill={`url(#${id}-core)`}
				className="stroke-primary/60"
			/>
			<path d="m72 228 138-73 138 73-138 73Z" className="stroke-primary/30" />
			<path d="m40 240 170 90 170-90" className="stroke-primary/70" />
			<path d="M210 318v12" className="stroke-primary" />

			<path
				d="m40 156 170 90 170-90v12l-170 90-170-90Z"
				className="fill-subtle"
				stroke={`url(#${id}-edge)`}
			/>
			<path
				d="m40 156 170-90 170 90-170 90Z"
				fill={`url(#${id}-face)`}
				stroke={`url(#${id}-edge)`}
			/>
			<path
				d="m57 156 153-81 153 81-153 81Z"
				className="stroke-muted-foreground/20"
			/>
			<path
				d="m110 156 100-53 100 53-100 53Z"
				className="fill-background/60 stroke-border"
			/>
			<text
				transform="matrix(1 .53 -1 .53 210 164)"
				textAnchor="middle"
				className="fill-foreground font-sans text-[56px] font-medium tracking-[-0.08em]"
			>
				KJ
			</text>
			<path
				d="m175 208 35 19 35-19"
				className="stroke-primary"
				strokeWidth="2"
			/>
			<g className="stroke-muted-foreground/40" strokeWidth="0.75">
				<path d="m380 156 28-15h32M380 240l28-15h32M380 312l28 15h32" />
			</g>
			<g className="fill-muted-foreground font-mono text-[9px] tracking-[0.12em]">
				<text x="406" y="133">
					01
				</text>
				<text x="406" y="217">
					02
				</text>
				<text x="406" y="319">
					03
				</text>
			</g>
		</svg>
	);
}
