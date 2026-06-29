// Sim 4 — In-Memory Record Database · LEVEL 3 (field TTL)
//
// Extends Level 2. Operations gain a `timestamp`; fields can expire.
//
// ── Level 3 spec ──────────────────────────────────────────────────────────
// setAt(key, field, value, timestamp, ttl?): void
//   Field is alive while  timestamp <= now < timestamp + ttl  (no ttl = forever).
// getAt(key, field, timestamp): string | null
//   Value if alive at `timestamp`, else null.
// scanFieldAt(key, timestamp): string[]
//   Like scanField, but only fields alive at `timestamp`.
//
// Refactor hint: make L1 set/get delegate to the timestamped versions
// (timestamp 0, no ttl).
// ───────────────────────────────────────────────────────────────────────────

import { Database as Base } from './level2';

export class Database extends Base {
  setAt(key: string, field: string, value: string, timestamp: number, ttl?: number): void {
    throw new Error('TODO L3: setAt');
  }
  getAt(key: string, field: string, timestamp: number): string | null {
    throw new Error('TODO L3: getAt');
  }
  scanFieldAt(key: string, timestamp: number): string[] {
    throw new Error('TODO L3: scanFieldAt');
  }
}
