// Sim 3 — Cloud File Storage · LEVEL 1 (files)
//
// Implement these to pass the L1 tests. Later levels live in their own files
// (level2.ts … level4.ts) and extend this class — you only see the level you're on.
//
// ── Level 1 spec ──────────────────────────────────────────────────────────
// addFile(name, size): boolean       — true if added, false if a file with that name exists.
// getSize(name): number | null        — size, or null if absent.
// deleteFile(name): number | null     — delete and return its size, or null if absent.
// ───────────────────────────────────────────────────────────────────────────

export class FileStore {
  addFile(name: string, size: number): boolean {
    throw new Error('TODO L1: addFile');
  }
  getSize(name: string): number | null {
    throw new Error('TODO L1: getSize');
  }
  deleteFile(name: string): number | null {
    throw new Error('TODO L1: deleteFile');
  }
}
