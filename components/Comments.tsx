"use client";

import { Comments as CommentsComponent } from "pliny/comments";
import { useState } from "react";
import { Button } from "@/components/ClientUI";
import siteMetadata from "@/data/siteMetadata";

export default function Comments({ slug }: { slug: string }) {
	const [loadComments, setLoadComments] = useState(false);

	if (!siteMetadata.comments?.provider) {
		return null;
	}
	return (
		<div className="flex justify-center py-6">
			{loadComments ? (
				<CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
			) : (
				<Button
					type="button"
					variant="outline"
					onClick={() => setLoadComments(true)}
				>
					Load Comments
				</Button>
			)}
		</div>
	);
}
