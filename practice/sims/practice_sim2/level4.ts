// Practice Sim 2 — Page Views · LEVEL 4 (ranking over the timeline)
//
// Extends Level 3. This is the full class the test imports. The capstone:
// combine L2 ranking with the L3 timeline.
//
// ── Level 4 spec ──────────────────────────────────────────────────────────
// topPagesSince(since, n): string[]
//   The `n` most-viewed pages counting ONLY views with timestamp >= `since`,
//   formatted `${page}(${count})`, sorted by count DESC, ties by page name ASC.
//   Pages with zero qualifying views are excluded. Fewer than `n` is fine.
// ───────────────────────────────────────────────────────────────────────────

import { PageViews as Base } from './level3';

export class PageViews extends Base {
  topPagesSince(since: number, n: number): string[] {
    throw new Error('TODO L4: topPagesSince');
  }
}
