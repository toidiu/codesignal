// Sim 2 — Banking System · LEVEL 2 (rankings)
//
// Extends Level 1.
//
// ── Level 2 spec ──────────────────────────────────────────────────────────
// topSpenders(n): string[]
//   The `n` accounts with the highest total OUTGOING transferred amount,
//   formatted `${accountId}(${totalOut})`, sorted by total out DESC,
//   ties by accountId ASC.
// ───────────────────────────────────────────────────────────────────────────

import { Bank as Base } from './level1';

export class Bank extends Base {
  topSpenders(n: number): string[] {
    throw new Error('TODO L2: topSpenders');
  }
}
