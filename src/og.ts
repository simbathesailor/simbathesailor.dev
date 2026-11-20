// Builds the 1200x630 share image (Open Graph / X card) for a page.
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const font = (w: number) =>
  readFileSync(require.resolve(`@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-${w}-normal.woff`));
const fonts = [
  { name: "Schibsted Grotesk", data: font(500), weight: 500 as const, style: "normal" as const },
  { name: "Schibsted Grotesk", data: font(600), weight: 600 as const, style: "normal" as const },
];

const C = {
  bg: "#10151f",
  ink: "#e6e9f0",
  muted: "#9aa3b5",
  note: "#6fd3a8",
  noteBg: "#173a30",
  tokens: ["#8fa2ff", "#5fd0a8", "#f0b54a", "#b592ff"],
};

type El = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown): El => ({
  type,
  props: { style, children },
});

// Same idea as the home-page headline: each word sits on a faint token colour.
function tokenised(text: string, size: number): El {
  const words = text.replace(/\p{Extended_Pictographic}️?/gu, "").trim().split(/\s+/);
  return el(
    "div",
    { display: "flex", flexWrap: "wrap", gap: `${size * 0.14}px ${size * 0.08}px`, fontSize: size, fontWeight: 600, lineHeight: 1.12, letterSpacing: "-0.02em", color: C.ink },
    words.map((w, i) =>
      el("div", { display: "flex", padding: `0 ${size * 0.08}px`, borderRadius: 8, background: `${C.tokens[i % 4]}38` }, w),
    ),
  );
}

export async function shareImage(opts: { title: string; kicker?: string; note?: boolean }): Promise<Buffer> {
  const len = opts.title.length;
  const size = len > 80 ? 52 : len > 50 ? 62 : 74;

  const mark = el(
    "div",
    { display: "flex", alignItems: "flex-end", gap: 5, height: 34 },
    [20, 34, 13, 27].map((h, i) => el("div", { width: 9, height: h, borderRadius: 2, background: C.tokens[i] })),
  );

  const tree = el(
    "div",
    { width: 1200 - 144, height: 630 - 128, display: "flex", flexDirection: "column", justifyContent: "space-between", background: C.bg, padding: "64px 72px", fontFamily: "Schibsted Grotesk" },
    [
      el("div", { display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 600, color: C.ink }, [mark, "Anil Chaudhary"]),
      el("div", { display: "flex", flexDirection: "column", gap: 26 }, [
        opts.note
          ? el("div", { display: "flex" }, [el("div", { display: "flex", fontSize: 24, fontWeight: 600, color: C.note, background: C.noteBg, padding: "6px 18px", borderRadius: 99 }, "Note")])
          : el("div", { display: "flex" }, ""),
        tokenised(opts.title, size),
      ]),
      el("div", { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, fontWeight: 500, color: C.muted }, [
        el("div", { display: "flex" }, opts.kicker ?? "AI infrastructure"),
        el("div", { display: "flex" }, "simbathesailor.dev"),
      ]),
    ],
  );

  const svg = await satori(tree as any, { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
}
