// Sim 1 — In-Memory Key/Value Store. Implement these to pass sim1.test.ts.
// Spec: ../sim1_kvstore_spec.md
// Replace each `throw` as you progress through the levels.
export class KVStore {
  // ---------- Level 1 ----------
  set(key: string, value: string): void {
    throw new Error('TODO L1: set');
  }
  get(key: string): string | null {
    throw new Error('TODO L1: get');
  }
  delete(key: string): boolean {
    throw new Error('TODO L1: delete');
  }

  // ---------- Level 2 ----------
  scanPrefix(prefix: string): string[] {
    throw new Error('TODO L2: scanPrefix');
  }

  // ---------- Level 3 (timestamps + TTL) ----------
  setAt(key: string, value: string, timestamp: number, ttl?: number): void {
    throw new Error('TODO L3: setAt');
  }
  getAt(key: string, timestamp: number): string | null {
    throw new Error('TODO L3: getAt');
  }
  scanPrefixAt(prefix: string, timestamp: number): string[] {
    throw new Error('TODO L3: scanPrefixAt');
  }

  // ---------- Level 4 (backup / restore) ----------
  backup(timestamp: number): number {
    throw new Error('TODO L4: backup');
  }
  restore(restoreTimestamp: number, backupTimestamp: number): void {
    throw new Error('TODO L4: restore');
  }
}
