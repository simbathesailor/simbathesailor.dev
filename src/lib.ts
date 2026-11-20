import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

export async function getPosts(): Promise<Post[]> {
  const all = await getCollection("blog", ({ data }) =>
    import.meta.env.DEV ? true : data.published && !data.draft,
  );
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function readingMinutes(body = ""): number {
  const words = body.replace(/```[\s\S]*?```/g, " ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

export function formatDate(d: Date, opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }) {
  return d.toLocaleDateString("en-GB", opts);
}
