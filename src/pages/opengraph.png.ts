import type { APIRoute } from "astro";
import { createElement } from "react";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";

import { SiteOgImage } from "../components/OgImage";
import { invariant } from "../utils/invariant";

export const GET: APIRoute = async ({ site }) => {
  invariant(site, "Astro.site must be specified in astro.config.ts");

  return new ImageResponse(
    createElement(SiteOgImage, {
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
