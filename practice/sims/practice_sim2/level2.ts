// Practice Sim 2 — Page Views · LEVEL 2 (ranking)
//
// Extends Level 1.
//
// ── Level 2 spec ──────────────────────────────────────────────────────────
// topPages(n): string[]
//   The `n` most-viewed pages, formatted `${page}(${views})`, sorted by views
//   DESC, ties by page name ASC. Fewer than `n` is fine.
// ───────────────────────────────────────────────────────────────────────────

import { PageViews as Base } from './level1';

export class PageViews extends Base {
  topPages(n: number): string[] {
    throw new Error('TODO L2: topPages');
  }
}
