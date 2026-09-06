import PostLayout, { type PostLayoutProps } from "./PostLayout";

export default function PostSimple(props: PostLayoutProps) {
	return <PostLayout {...props} showSourceLinks={false} />;
}
