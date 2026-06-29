// Sim 4 — In-Memory Record Database · LEVEL 4 (point-in-time history)
//
// Extends Level 3. This is the full class the tests import.
//
// ── Level 4 spec ──────────────────────────────────────────────────────────
// Every setAt is now retained as HISTORY rather than overwriting. (You will
// likely override setAt here to append a version instead of replacing.)
//
// getAtVersion(key, field, timestamp): string | null
//   The value of the field AS OF `timestamp`: the most recent set with
//   setTime <= timestamp that is still alive at `timestamp`. null otherwise.
//
// revertField(key, field, timestamp, toTimestamp): void
//   Set the field's current value (at `timestamp`) to whatever
//   getAtVersion(key, field, toTimestamp) would return; no-op if that is null.
// ───────────────────────────────────────────────────────────────────────────

import { Database as Base } from './level3';

export class Database extends Base {
  getAtVersion(key: string, field: string, timestamp: number): string | null {
    throw new Error('TODO L4: getAtVersion');
  }
  revertField(key: string, field: string, timestamp: number, toTimestamp: number): void {
    throw new Error('TODO L4: revertField');
  }
}
