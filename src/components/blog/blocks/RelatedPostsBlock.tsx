import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { getRelatedPosts } from "@/sanity/lib/queries";

export async function RelatedPostsBlock({
  title,
  posts,
}: {
  title?: string;
  posts: string[];
}) {
  const relatedPosts = await getRelatedPosts(posts);

  return <RelatedArticles posts={relatedPosts} title={title} />;
}
