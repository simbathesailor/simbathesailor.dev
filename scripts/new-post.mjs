#!/usr/bin/env node
// Usage:
//   npm run new -- "Title"            full post (AI infrastructure)
//   npm run new -- --note "Title"     short note
//   add --engineering for non-AI posts
import { mkdirSync, writeFileSync, existsSync } from "node:fs";

const args = process.argv.slice(2);
const title = args.find((a) => !a.startsWith("--"));
if (!title) {
  console.error('Give the post a title: npm run new -- "How continuous batching works"');
  process.exit(1);
}
const track = args.includes("--engineering") ? "engineering" : "ai-infra";
const kind = args.includes("--note") ? "note" : "post";
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const dir = `src/content/blog/${slug}`;
if (existsSync(dir)) {
  console.error(`${dir} already exists. Pick another title.`);
  process.exit(1);
}
mkdirSync(dir, { recursive: true });
writeFileSync(
  `${dir}/index.mdx`,
  `---
title: ${JSON.stringify(title)}
date: ${new Date().toISOString().slice(0, 10)}
description: One or two sentences shown under the title and in link previews.
track: ${track}
kind: ${kind}
tags: []
draft: true
---

Start writing here. Put images next to this file and reference them as ![alt](./image.png).
`,
);
console.log(`Created ${kind} ${dir}/index.mdx (draft). Run npm run dev and open http://localhost:4321/${slug}/`);
