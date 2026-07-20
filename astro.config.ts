import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import og from "astro-og";
import simpleFeatureFlags from "astro-simple-feature-flags";
import typesafeRoutes from "astro-typesafe-routes";
import { defineConfig, svgoOptimizer } from "astro/config";
import Icons from "unplugin-icons/vite";

// @ts-expect-error type mismatch
export default defineConfig({
  adapter: cloudflare({
    imageService: {
      build: "compile",
      runtime: "passthrough", // To save money
    },
  }),
  experimental: {
    chromeDevtoolsWorkspace: true,
    clientPrerender: true,
    contentIntellisense: true,
    svgOptimizer: svgoOptimizer(),
  },
  security: {
    allowedDomains: [
      {
        hostname: "**.sushichan044.dev",
        protocol: "https",
      },
    ],
  },
  site: "https://sushichan044.dev",
  integrations: [simpleFeatureFlags(), typesafeRoutes(), og(), mdx()],
  vite: {
    build: {
      minify: import.meta.env.PROD && "oxc",
    },
    plugins: [
      // @ts-expect-error type mismatch
      tailwindcss(),
      Icons({ compiler: "astro" }),
    ],
  },
});
