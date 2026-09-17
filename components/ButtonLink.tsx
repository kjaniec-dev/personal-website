"use client";

import type { ComponentProps } from "react";
import { buttonVariants, cn } from "@/components/ClientUI";
import Link from "@/components/Link";

type ButtonVariantsProps = NonNullable<Parameters<typeof buttonVariants>[0]>;

export interface ButtonLinkProps extends ComponentProps<typeof Link> {
	variant?: ButtonVariantsProps["variant"];
	size?: ButtonVariantsProps["size"];
}

export default function ButtonLink({
	variant,
	size,
	className,
	children,
	...props
}: ButtonLinkProps) {
	return (
		<Link
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		>
			{children}
		</Link>
	);
}
