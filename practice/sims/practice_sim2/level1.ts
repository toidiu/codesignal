// Practice Sim 2 — Page Views · LEVEL 1 (basic counts)
//
// A WARM-UP sim that adds a time dimension at L3, so you rehearse the
// "refactor time in" move from the real sims. Each level extends the previous.
//
// ── Level 1 spec ──────────────────────────────────────────────────────────
// view(page): void     — record one view of a page.
// views(page): number   — total views of a page (0 if never viewed).
// ───────────────────────────────────────────────────────────────────────────

export class PageViews {
  view(page: string): void {
    throw new Error('TODO L1: view');
  }
  views(page: string): number {
    throw new Error('TODO L1: views');
  }
}
