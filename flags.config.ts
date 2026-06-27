import { defineConfig } from "astro-simple-feature-flags/config";
import { z } from "astro/zod";

export default defineConfig({
  schema: z.object({}),
  flag: {
    development: {},
    production: {},
  },
  viteMode: ["development", "production"],
});
