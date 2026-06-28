import { defineFeatureFlagCollection } from "astro-simple-feature-flags/content-layer";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";
// Required to save collections using Temporal into .astro/data-store.json
import "temporal-polyfill-lite/global";

const postCollection = defineCollection({
  loader: glob({ base: "./content/post", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce
      .date()
      .transform((date) =>
        Temporal.Instant.fromEpochMilliseconds(date.getTime()).toZonedDateTimeISO("Asia/Tokyo"),
      ),

    // Optional Fields
    updatedAt: z.coerce
      .date()
      .transform((date) =>
        Temporal.Instant.fromEpochMilliseconds(date.getTime()).toZonedDateTimeISO("Asia/Tokyo"),
      )
      .optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  post: postCollection,
  ...defineFeatureFlagCollection(),
};
