import { getCollection } from "astro:content";

export async function getAllPublicPosts() {
  return await getCollection("post");
}

export async function getRecentPublicPosts(limit: number) {
  const data = (await getAllPublicPosts()).sort((a, b) => {
    const aData = a.data.updatedAt ?? a.data.publishedAt;
    const bData = b.data.updatedAt ?? b.data.publishedAt;

    return Temporal.Instant.compare(bData, aData);
  });

  return data.slice(0, limit);
}
