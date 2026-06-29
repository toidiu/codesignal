// Sim 1 — In-Memory Key/Value Store · LEVEL 4 (backup / restore)
//
// Extends Level 3. This is the full class the tests import.
//
// ── Level 4 spec ──────────────────────────────────────────────────────────
// backup(timestamp): number
//   Snapshot every key alive at `timestamp` (store each key's REMAINING ttl
//   = expiry - timestamp; forever-keys stay forever). Return the count saved.
//   Multiple backups may exist, identified by their `timestamp`.
//
// restore(restoreTimestamp, backupTimestamp): void
//   Replace current state with the backup taken at `backupTimestamp`. Each
//   restored key is re-anchored: set at `restoreTimestamp` with its saved
//   remaining ttl (a key with 90 remaining, restored at t=200, is alive
//   [200, 290)). Forever-keys remain forever.
// ───────────────────────────────────────────────────────────────────────────

import { KVStore as Base } from './level3';

export class KVStore extends Base {
  backup(timestamp: number): number {
    throw new Error('TODO L4: backup');
  }
  restore(restoreTimestamp: number, backupTimestamp: number): void {
    throw new Error('TODO L4: restore');
  }
}
