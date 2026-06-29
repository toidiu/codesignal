// Sim 1 — In-Memory Key/Value Store · LEVEL 3 (timestamps + TTL)
//
// Extends Level 2. Records now live on a timeline.
//
// ── Level 3 spec ──────────────────────────────────────────────────────────
// A record set at `timestamp` with `ttl` is ALIVE while
//   timestamp <= now < timestamp + ttl.
// If `ttl` is omitted, it never expires.
//
// setAt(key, value, timestamp, ttl?): void
// getAt(key, timestamp): string | null      — value if alive at `timestamp`, else null.
// scanPrefixAt(prefix, timestamp): string[]  — like scanPrefix, only keys alive at `timestamp`.
//
// Refactor hint: implement the timeline once here, then OVERRIDE the inherited
// set/get/scanPrefix to delegate (e.g. set = setAt(key, value, 0) with no ttl).
// That's the intended adaptation, not a rewrite.
// ───────────────────────────────────────────────────────────────────────────

import { KVStore as Base } from './level2';

export class KVStore extends Base {
  setAt(key: string, value: string, timestamp: number, ttl?: number): void {
    throw new Error('TODO L3: setAt');
  }
  getAt(key: string, timestamp: number): string | null {
    throw new Error('TODO L3: getAt');
  }
  scanPrefixAt(prefix: string, timestamp: number): string[] {
    throw new Error('TODO L3: scanPrefixAt');
  }
}
