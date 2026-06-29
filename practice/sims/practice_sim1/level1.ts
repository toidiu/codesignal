// Practice Sim 1 — Inventory · LEVEL 1 (basic ops)
//
// A WARM-UP sim: simpler than sim1..4, here to get the feel of levels building
// on each other. Each level lives in its own file and extends the previous one.
//
// ── Level 1 spec ──────────────────────────────────────────────────────────
// add(item, qty): void       — add qty to an item (create it if new, else increase).
// count(item): number         — current quantity (0 if the item is unknown).
// remove(item, qty): boolean   — remove qty; true if there was enough stock and it
//                                was removed, false otherwise (stock unchanged on false).
// ───────────────────────────────────────────────────────────────────────────

export class Inventory {
  add(item: string, qty: number): void {
    throw new Error('TODO L1: add');
  }
  count(item: string): number {
    throw new Error('TODO L1: count');
  }
  remove(item: string, qty: number): boolean {
    throw new Error('TODO L1: remove');
  }
}
