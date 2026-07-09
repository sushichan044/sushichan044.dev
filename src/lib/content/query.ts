import { getCollection } from "astro:content";

export async function getAllPublicPosts() {
  return await getCollection("post");
}

export async function getRecentPublicPosts(limit: number) {
  const data = sortPostsByPublishedAt(await getAllPublicPosts(), "desc");

  return data.slice(0, limit);
}
export function sortPostsByPublishedAt(
  posts: Awaited<ReturnType<typeof getAllPublicPosts>>,
  order: "asc" | "desc" = "desc",
) {
  return posts.sort((a, b) => {
    if (order === "asc") {
      return Temporal.Instant.compare(a.data.publishedAt, b.data.publishedAt);
    } else {
      return Temporal.Instant.compare(b.data.publishedAt, a.data.publishedAt);
    }
  });
}

export function filterPostsByTags(
  posts: Awaited<ReturnType<typeof getAllPublicPosts>>,
  tags: string[],
) {
  return posts.filter((post) => tags.every((tag) => post.data.tags.includes(tag)));
}
