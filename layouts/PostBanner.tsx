import PostLayout, { type PostLayoutProps } from "./PostLayout";

export default function PostBanner(props: PostLayoutProps) {
	return <PostLayout {...props} showBanner showSourceLinks={false} />;
}
