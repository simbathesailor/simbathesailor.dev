import type { APIRoute } from "astro";
import { shareImage } from "../../og";
import { site } from "../../site";

export const GET: APIRoute = async () => {
  const png = await shareImage({ title: site.headline, kicker: "Notes and writing on AI infrastructure" });
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
