import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Each post lives in src/content/blog/<slug>/index.md(x).
// The folder name is the URL: /<slug>/
const blog = defineCollection({
  loader: glob({
    pattern: "**/index.{md,mdx}",
    base: "./src/content/blog",
    generateId: ({ entry }) => entry.split("/")[0],
  }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    description: z.string().optional(),
    // "ai-infra" posts lead the home page; everything else is the archive.
    track: z.enum(["ai-infra", "engineering"]).default("engineering"),
    // "note" = a short thought or problem write-up; "post" = a full article.
    kind: z.enum(["post", "note"]).default("post"),
    // Accepts `tags: a, b` (old posts) or `tags: [a, b]`.
    tags: z
      .union([z.string(), z.array(z.string())])
      .default([])
      .transform((t) =>
        (Array.isArray(t) ? t : t.split(",")).map((s) => s.trim()).filter(Boolean),
      ),
    // Old posts use published: "true"/"false". New posts use draft: true.
    published: z
      .union([z.boolean(), z.string()])
      .default(true)
      .transform((v) => v === true || v === "true"),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    // Optional share image (LinkedIn, X, Slack...). Without it one is generated from the title.
    image: image().optional(),
    imageAlt: z.string().optional(),
  }),
});

export const collections = { blog };
