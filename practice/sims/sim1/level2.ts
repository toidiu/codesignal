// Sim 1 — In-Memory Key/Value Store · LEVEL 2 (prefix scan)
//
// Extends Level 1. Implement the L2 method below.
//
// ── Level 2 spec ──────────────────────────────────────────────────────────
// scanPrefix(prefix): string[]
//   For every key starting with `prefix`, return `${key}(${value})`,
//   sorted by key ascending. Empty array if none.
// ───────────────────────────────────────────────────────────────────────────

import { KVStore as Base } from './level1';

export class KVStore extends Base {
  scanPrefix(prefix: string): string[] {
    throw new Error('TODO L2: scanPrefix');
  }
}
