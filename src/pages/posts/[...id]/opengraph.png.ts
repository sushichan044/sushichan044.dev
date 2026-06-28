import { getCollection, type CollectionEntry } from "astro:content";
import { createElement } from "react";
import { ImageResponse } from "takumi-js/response";

import { defineDynamicFileEndpoint } from "../../../utils/astro/endpoint";
import { PostOgImage } from "./_PostOgImage";

type Props = {
  post: CollectionEntry<"post">;
};

type Params = {
  id: CollectionEntry<"post">["id"];
};

export const { GET, getStaticPaths } = defineDynamicFileEndpoint<Params, Props>({
  paths: async () => {
    const posts = await getCollection("post");
    return posts.map((post) => ({
      params: { id: post.id },
      props: { post },
    }));
  },

  render: async ({ site, props: { post } }) => {
    return new ImageResponse(
      createElement(PostOgImage, {
        title: post.data.title,
        site: site?.hostname ?? "sushichan044.dev",
      }),
      {
        width: 1200,
        height: 630,
      },
    );
  },
});
