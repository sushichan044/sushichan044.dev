import { getCollection } from "astro:content";

export async function getAllPublicPosts() {
  return await getCollection("post");
}

export async function getRecentPublicPosts(limit: number) {
  const data = (await getAllPublicPosts()).sort((a, b) => {
    return Temporal.Instant.compare(b.data.publishedAt, a.data.publishedAt);
  });

  return data.slice(0, limit);
}
