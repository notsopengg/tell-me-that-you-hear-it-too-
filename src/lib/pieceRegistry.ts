// Auto-discovers every piece component under src/pieces/<slug>/index.astro
// so adding a new piece never requires editing this file or any route.

const modules = import.meta.glob("/src/pieces/*/index.astro", { eager: true }) as Record<
  string,
  { default: any }
>;

const bySlug = new Map<string, any>();
for (const [path, mod] of Object.entries(modules)) {
  const match = path.match(/\/src\/pieces\/([^/]+)\/index\.astro$/);
  if (match) bySlug.set(match[1], mod.default);
}

export function getPieceComponent(slug: string) {
  const component = bySlug.get(slug);
  if (!component) {
    throw new Error(`No piece component found for slug "${slug}" at src/pieces/${slug}/index.astro`);
  }
  return component;
}
