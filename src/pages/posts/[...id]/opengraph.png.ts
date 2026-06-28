import type { APIRoute } from "astro";
import { createRoute } from "astro-typesafe-routes/create-route";
import type { CollectionEntry } from "astro:content";
import { createElement } from "react";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";

import { PostOgImage } from "../../../components/OgImage";
import { getAllPublicPosts } from "../../../lib/content/query";
import { invariant } from "../../../utils/invariant";

type Props = {
  post: CollectionEntry<"post">;
};

export const Route = createRoute({
  routeId: "/posts/[...id]/opengraph.png",
});

export const getStaticPaths = Route.createGetStaticPaths<Props>(async () => {
  const posts = await getAllPublicPosts();
  return posts.map((post) => ({
    params: { id: post.id },
    props: { post },
  }));
});

export const GET: APIRoute<Props, ReturnType<(typeof Route)["getParams"]>> = async ({
  site,
  props: { post },
}) => {
  invariant(site, "Astro.site must be specified in astro.config.ts");

  return new ImageResponse(
    createElement(PostOgImage, {
      title: post.data.title,
      site: site.hostname,
    }),
    {
      width: 1200,
      height: 630,
      fonts: await googleFonts({
        families: ["Manrope", "Noto Sans JP"],
      }),
    },
  );
};
