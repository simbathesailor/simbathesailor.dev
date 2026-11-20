# simbathesailor.dev

Personal site of Anil Chaudhary. Built with [Astro](https://astro.build), deployed as static files.

## Run it

```sh
npm install
npm run dev        # http://localhost:4321 (drafts are visible in dev)
npm run build      # outputs dist/
```

## Write a post

```sh
npm run new -- "How continuous batching works"
```

For a short thought or a problem you hit, write a note instead:

```sh
npm run new -- --note "Why our p99 jumped after enabling prefix caching"
```

Both create `src/content/blog/<slug>/index.mdx` as a draft. Notes and posts appear together,
newest first, on the home page; notes are marked "Note". Every page links to the previous and next one.
The folder name is the URL: `/how-continuous-batching-works/`.

Frontmatter:

| Field         | Notes                                                                  |
| ------------- | ---------------------------------------------------------------------- |
| `title`       | Required.                                                              |
| `date`        | Required, `YYYY-MM-DD`.                                                |
| `description` | Shown under the title, in lists and in link previews.                  |
| `kind`        | `post` (default) or `note`.                                            |
| `track`       | `ai-infra` (shown first on the home page) or `engineering` (archive).  |
| `tags`        | `[gpu, inference]`                                                     |
| `draft`       | `true` hides it from production builds. Delete the line to publish.   |
| `cover`       | Optional image URL.                                                    |

Images: drop them next to `index.mdx` and use `![alt](./diagram.png)`. Astro optimises them.
Use `.mdx` when you want to embed components, `.md` for plain writing.

## Edit the profile

Name, headline, intro, current topics, projects and social links all live in `src/site.ts`.
