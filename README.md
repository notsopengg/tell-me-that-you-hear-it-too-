# Tell Me That You Hear It Too

A computational poetry project by Emily Peng. Built with [Astro](https://astro.build).

## Commands

| Command           | Action                                    |
| :----------------- | :---------------------------------------- |
| `npm install`       | Install dependencies                      |
| `npm run dev`       | Start local dev server at `localhost:4321` |
| `npm run build`     | Build the production site to `./dist/`     |
| `npm run preview`   | Preview the production build locally       |

## Structure

- `src/pieces/<slug>/index.astro` — each standalone poetry piece, fully self-contained (own markup, styles, script). No shared design system.
- `src/pages/index.astro` — homepage; automatically renders whichever piece in `pieces.ts` has the latest `date`, full-bleed, with the nav and "newest" badge overlaid.
- `src/pages/pieces/[slug].astro` — the dynamic route every piece is also reachable at directly (`/pieces/<slug>/`).
- `src/pages/projects.astro`, `src/pages/about.astro` — the shared minimal design system pages.
- `src/content/pieces.ts` — the single source of truth for piece metadata (title, slug, date, description).
- `src/components/`, `src/layouts/`, `src/styles/global.css` — shared site chrome (Nav, banner, layouts, design system). Pieces never import from here.

## Adding a new piece

1. Create `src/pieces/<slug>/index.astro` and build the piece however you want — it's a totally blank canvas (canvas, SVG, generative text, whatever the poem needs).
2. Add one entry to `src/content/pieces.ts` with its `title`, `slug`, `date`, and `description`.

That's it — no other file needs to change. The piece is automatically:

- reachable at `/pieces/<slug>/`
- listed on `/projects`
- shown full-bleed on the homepage if its `date` is the newest

The homepage and `/pieces/<slug>/` route discover piece components automatically via `import.meta.glob`, keyed off the folder name — see `src/lib/pieceRegistry.ts`.
