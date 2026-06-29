// Sim 4 — In-Memory Record Database · LEVEL 1 (fields)
//
// Records are identified by a string key and hold named string fields.
// Later levels live in their own files (level2.ts … level4.ts) and extend this
// class — you only see the level you're on.
//
// ── Level 1 spec ──────────────────────────────────────────────────────────
// set(key, field, value): void        — set/overwrite a field (creating the record if needed).
// get(key, field): string | null       — field value, or null if record/field absent.
// deleteField(key, field): boolean      — true if the field existed and was removed.
// ───────────────────────────────────────────────────────────────────────────

export class Database {
  set(key: string, field: string, value: string): void {
    throw new Error('TODO L1: set');
  }
  get(key: string, field: string): string | null {
    throw new Error('TODO L1: get');
  }
  deleteField(key: string, field: string): boolean {
    throw new Error('TODO L1: deleteField');
  }
}
