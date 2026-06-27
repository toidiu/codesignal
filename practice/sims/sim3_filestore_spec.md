# Sim 3 — Cloud File Storage

Implement `class FileStore` in `sim3/solution.ts`. (Ask and I'll wire up `sim3/sim3.test.ts`.)

## Level 1 — files

- `addFile(name, size): boolean` — `true` if added, `false` if a file with that name exists.
- `getSize(name): number | null` — size, or `null` if absent.
- `deleteFile(name): number | null` — delete and return its size, or `null` if absent.

## Level 2 — queries by prefix

- `nLargest(prefix, n): string[]` — the `n` largest files whose name starts with `prefix`, formatted
  `` `${name}(${size})` ``, sorted by size **desc**, ties by name **asc**. Fewer than `n` is fine.

## Level 3 — users & capacity

- `addUser(userId, capacity): boolean` — create a user with a byte capacity; `false` if user exists.
- `addFileBy(userId, name, size): number | null` — user adds a file; succeeds only if the user has
  remaining capacity (`capacity - usedSoFar >= size`) and the name is free. Return remaining capacity,
  or `null` on failure. Files added in L1 belong to a built-in "admin" user with infinite capacity.
- `mergeUser(targetId, sourceId): number | null` — move all of `source`'s files and remaining capacity
  to `target` (target capacity grows by source's remaining), delete source; return target's remaining
  capacity, or `null` if either user is missing.

## Level 4 — backups per user

- `backupUser(userId): number | null` — snapshot the user's current files; return how many were saved
  (or `null` if no such user). One backup per user (overwrites previous).
- `restoreUser(userId): number | null` — restore the user's files to their last backup, discarding any
  files added since (capacity recomputed). Files that were deleted by other users stay deleted. Return
  the number of files restored, or `null` if the user/backup is missing.
