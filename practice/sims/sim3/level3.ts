// Sim 3 — Cloud File Storage · LEVEL 3 (users & capacity)
//
// Extends Level 2.
//
// ── Level 3 spec ──────────────────────────────────────────────────────────
// addUser(userId, capacity): boolean
//   Create a user with a byte capacity; false if the user exists.
//
// addFileBy(userId, name, size): number | null
//   User adds a file; succeeds only if the user has remaining capacity
//   (capacity - usedSoFar >= size) and the name is free. Return remaining
//   capacity, or null on failure. Files added via L1 addFile belong to a
//   built-in "admin" user with infinite capacity.
//
// mergeUser(targetId, sourceId): number | null
//   Move all of source's files and remaining capacity to target (target
//   capacity grows by source's remaining), delete source; return target's
//   remaining capacity, or null if either user is missing.
// ───────────────────────────────────────────────────────────────────────────

import { FileStore as Base } from './level2';

export class FileStore extends Base {
  addUser(userId: string, capacity: number): boolean {
    throw new Error('TODO L3: addUser');
  }
  addFileBy(userId: string, name: string, size: number): number | null {
    throw new Error('TODO L3: addFileBy');
  }
  mergeUser(targetId: string, sourceId: string): number | null {
    throw new Error('TODO L3: mergeUser');
  }
}
