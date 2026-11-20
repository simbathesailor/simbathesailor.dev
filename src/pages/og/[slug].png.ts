import type { APIRoute } from "astro";
import { getPosts, type Post } from "../../lib";
import { shareImage } from "../../og";

export async function getStaticPaths() {
  const posts = await getPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: Post };
  const { title, track, kind } = post.data;
  const png = await shareImage({
    title,
    note: kind === "note",
    kicker: track === "ai-infra" ? "AI infrastructure" : `Writing, ${post.data.date.getFullYear()}`,
  });
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
