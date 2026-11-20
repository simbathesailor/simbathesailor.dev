import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPosts } from "../lib";
import { site } from "../site";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: site.name,
    description: site.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: `/${p.id}/`,
      categories: p.data.tags,
    })),
  });
}
