// Sim 1 — In-Memory Key/Value Store · LEVEL 1 (basic ops)
//
// Implement these to pass the L1 tests. Each later level lives in its own file
// (level2.ts … level4.ts) and extends this class — so you only ever see the
// level you're working on.
//
// ── Level 1 spec ──────────────────────────────────────────────────────────
// set(key, value): void       — store / overwrite.
// get(key): string | null      — value, or null if absent.
// delete(key): boolean         — true if a value existed and was removed, else false.
// ───────────────────────────────────────────────────────────────────────────

export class KVStore {
  set(key: string, value: string): void {
    throw new Error('TODO L1: set');
  }
  get(key: string): string | null {
    throw new Error('TODO L1: get');
  }
  delete(key: string): boolean {
    throw new Error('TODO L1: delete');
  }
}
