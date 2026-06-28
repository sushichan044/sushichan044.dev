import type { APIRoute, GetStaticPaths, GetStaticPathsItem } from "astro";

/**
 * @example
 *   type Props = {
 *     post: CollectionEntry<"blog">;
 *   };
 *
 *   type Params = {
 *     id: string;
 *   };
 *
 *   export const { getStaticPaths, GET } = define<Params, Props>({
 *     paths: async () => {
 *       const posts = await getCollection("blog");
 *       return posts.map((post) => ({
 *         params: { id: post.id },
 *         props: { post },
 *       }));
 *     },
 *     render: async ({ site, props: { post } }) => {
 *       // post is CollectionEntry<"blog">
 *     },
 *   });
 */
export function defineDynamicFileEndpoint<
  Params extends GetStaticPathsItem["params"] = GetStaticPathsItem["params"],
  Props extends NonNullable<GetStaticPathsItem["props"]> = NonNullable<GetStaticPathsItem["props"]>,
>(config: {
  paths: () =>
    | Promise<Array<{ params: Params; props?: Props }>>
    | Array<{ params: Params; props?: Props }>;
  render: APIRoute<Props, Params>;
}): {
  getStaticPaths: GetStaticPaths;
  GET: APIRoute<Props, Params>;
} {
  return {
    getStaticPaths: config.paths satisfies GetStaticPaths,
    GET: config.render,
  };
}
