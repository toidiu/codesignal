// Practice Sim 2 — Page Views · LEVEL 3 (timestamps)
//
// Extends Level 2. Views now happen at a point in time.
//
// ── Level 3 spec ──────────────────────────────────────────────────────────
// viewAt(page, timestamp): void
//   Record a view of a page at the given time.
// viewsSince(page, since): number
//   How many views of a page happened at a time >= `since` (0 if none / unknown page).
//
// Refactor hint: make L1 `view(page)` delegate to `viewAt(page, 0)`, and L1
// `views(page)` count every recorded view. Same data, one timeline.
// ───────────────────────────────────────────────────────────────────────────

import { PageViews as Base } from './level2';

export class PageViews extends Base {
  viewAt(page: string, timestamp: number): void {
    throw new Error('TODO L3: viewAt');
  }
  viewsSince(page: string, since: number): number {
    throw new Error('TODO L3: viewsSince');
  }
}
