// Single source of truth for every poetry piece.
// To add a new work: create src/pieces/<slug>/index.astro, then add an entry here.

export interface Piece {
  slug: string;
  title: string;
  description: string;
  /** ISO date string, e.g. "2026-08-24" */
  date: string;
  /** Nav text color to use when this piece is shown full-bleed. Defaults to "light" (dark text). */
  navTheme?: "light" | "dark";
}

export const pieces: Piece[] = [
  {
    slug: "piece-one",
    title: "Static on the Line",
    description: "A poem that only surfaces where the cursor has been.",
    date: "2026-08-24",
    navTheme: "dark",
  },
  {
    slug: "chatbot-poem",
    title: "Status: Still Deciding",
    description: "A chat interface with no generation — only selection. Ten exchanges, then it starts talking to itself.",
    date: "2026-08-28",
  },
];

// The homepage is pinned to this piece. It does NOT change automatically
// when new pieces are added — update this slug by hand when you want the
// homepage to feature something new.
export const HOME_SLUG = "piece-one";

export function getHomePiece(): Piece {
  const piece = pieces.find((p) => p.slug === HOME_SLUG);
  if (!piece) throw new Error(`HOME_SLUG "${HOME_SLUG}" does not match any piece in pieces.ts`);
  return piece;
}

// Used for the site-wide "still warm" freshness badge — reflects the most
// recently dated piece regardless of what's pinned to the homepage.
export function getNewestPiece(): Piece {
  return [...pieces].sort((a, b) => b.date.localeCompare(a.date))[0];
}

export function getSortedPieces(): Piece[] {
  return [...pieces].sort((a, b) => b.date.localeCompare(a.date));
}
