// Sim 4 — In-Memory Record Database · LEVEL 2 (scan)
//
// Extends Level 1.
//
// ── Level 2 spec ──────────────────────────────────────────────────────────
// scanField(key): string[]
//   All fields of a record formatted `${field}(${value})`, sorted by field
//   name ASC. Empty if the record is absent.
//
// scanByValue(value): string[]
//   Every `${key}.${field}` whose field equals `value`, sorted ASC.
// ───────────────────────────────────────────────────────────────────────────

import { Database as Base } from './level1';

export class Database extends Base {
  scanField(key: string): string[] {
    throw new Error('TODO L2: scanField');
  }
  scanByValue(value: string): string[] {
    throw new Error('TODO L2: scanByValue');
  }
}
