import { defineFeatureFlagCollection } from "astro-simple-feature-flags/content-layer";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";
import { Temporal } from "temporal-polyfill-lite";

const blogPostCollection = defineCollection({
  loader: glob({ base: "./content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),

    // Optional Fields
    publishedAt: z.coerce
      .date()
      .transform((date) => Temporal.Instant.fromEpochMilliseconds(date.getTime()))
      .optional(),
    updatedAt: z.coerce
      .date()
      .transform((date) => Temporal.Instant.fromEpochMilliseconds(date.getTime()))
      .optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  blog: blogPostCollection,
  ...defineFeatureFlagCollection(),
};
