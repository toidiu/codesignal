// Sim 3 — Cloud File Storage · LEVEL 4 (backups per user)
//
// Extends Level 3. This is the full class the tests import.
//
// ── Level 4 spec ──────────────────────────────────────────────────────────
// backupUser(userId): number | null
//   Snapshot the user's current files; return how many were saved (or null if
//   no such user). One backup per user (overwrites the previous backup).
//
// restoreUser(userId): number | null
//   Restore the user's files to their last backup, discarding any files added
//   since (capacity recomputed). Files that were deleted by other users stay
//   deleted. Return the number of files restored, or null if the user/backup
//   is missing.
// ───────────────────────────────────────────────────────────────────────────

import { FileStore as Base } from './level3';

export class FileStore extends Base {
  backupUser(userId: string): number | null {
    throw new Error('TODO L4: backupUser');
  }
  restoreUser(userId: string): number | null {
    throw new Error('TODO L4: restoreUser');
  }
}
