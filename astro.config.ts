import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import simpleFeatureFlags from "astro-simple-feature-flags";
import typesafeRoutes from "astro-typesafe-routes";
import { defineConfig, svgoOptimizer } from "astro/config";
import Icons from "unplugin-icons/vite";

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
  integrations: [simpleFeatureFlags(), typesafeRoutes()],
  vite: {
    build: {
      minify: import.meta.env.PROD && "oxc",
    },
    plugins: [tailwindcss(), Icons({ compiler: "astro" })],
  },
});
