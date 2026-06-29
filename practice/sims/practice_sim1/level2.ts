// Practice Sim 1 — Inventory · LEVEL 2 (ranking)
//
// Extends Level 1.
//
// ── Level 2 spec ──────────────────────────────────────────────────────────
// topItems(n): string[]
//   The `n` items with the highest quantity, formatted `${item}(${qty})`,
//   sorted by qty DESC, ties by item name ASC. Fewer than `n` is fine.
// ───────────────────────────────────────────────────────────────────────────

import { Inventory as Base } from './level1';

export class Inventory extends Base {
  topItems(n: number): string[] {
    throw new Error('TODO L2: topItems');
  }
}
