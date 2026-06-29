// Practice Sim 1 — Inventory · LEVEL 3 (timestamps)
//
// Extends Level 2. Stock now arrives at points in time.
//
// ── Level 3 spec ──────────────────────────────────────────────────────────
// addAt(item, qty, timestamp): void
//   Record `qty` of an item arriving at `timestamp`.
// countAt(item, timestamp): number
//   Total quantity of an item that has arrived at a time <= `timestamp`
//   (0 if none).
//
// Refactor hint: make L1 `add(item, qty)` delegate to `addAt(item, qty, 0)`, so
// the live `count`/`remove` and the timeline share one source of truth.
// ───────────────────────────────────────────────────────────────────────────

import { Inventory as Base } from './level2';

export class Inventory extends Base {
  addAt(item: string, qty: number, timestamp: number): void {
    throw new Error('TODO L3: addAt');
  }
  countAt(item: string, timestamp: number): number {
    throw new Error('TODO L3: countAt');
  }
}
