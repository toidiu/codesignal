// Practice Sim 1 — Inventory · LEVEL 4 (backup / restore)
//
// Extends Level 3. This is the full class the test imports.
//
// ── Level 4 spec ──────────────────────────────────────────────────────────
// backup(): number
//   Snapshot the current item -> qty state; return the number of DISTINCT items
//   saved. Only one backup is kept — a new backup overwrites the previous one.
// restore(): boolean
//   Replace the current state with the last backup, discarding any changes made
//   since it was taken (items added after the backup disappear). Return true if a
//   backup existed, else false. The backup is retained, so restore can repeat.
// ───────────────────────────────────────────────────────────────────────────

import { Inventory as Base } from './level3';

export class Inventory extends Base {
  backup(): number {
    throw new Error('TODO L4: backup');
  }
  restore(): boolean {
    throw new Error('TODO L4: restore');
  }
}
