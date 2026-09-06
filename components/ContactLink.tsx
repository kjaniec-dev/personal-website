"use client";

import { buttonVariants, cn } from "@kjaniec-dev/ui";
import Link from "@/components/Link";

// The kit's Button renders <button>; use its variants on a semantic email link.
export default function ContactLink({ email }: { email: string }) {
	return (
		<Link
			href={`mailto:${email}`}
			target="_self"
			className={cn(
				buttonVariants({ variant: "primary", size: "lg" }),
				"min-h-12 shrink-0 gap-3 rounded-full text-sm",
			)}
		>
			Let's talk <span aria-hidden="true">↗</span>
		</Link>
	);
}
