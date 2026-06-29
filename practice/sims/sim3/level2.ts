// Sim 3 — Cloud File Storage · LEVEL 2 (queries by prefix)
//
// Extends Level 1.
//
// ── Level 2 spec ──────────────────────────────────────────────────────────
// nLargest(prefix, n): string[]
//   The `n` largest files whose name starts with `prefix`, formatted
//   `${name}(${size})`, sorted by size DESC, ties by name ASC.
//   Fewer than `n` matches is fine.
// ───────────────────────────────────────────────────────────────────────────

import { FileStore as Base } from './level1';

export class FileStore extends Base {
  nLargest(prefix: string, n: number): string[] {
    throw new Error('TODO L2: nLargest');
  }
}
