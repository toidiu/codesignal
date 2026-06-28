// Skill 14 — Date & epoch millis.
// Note: the sims use plain integer timestamps, not Date — this drill is general TS.
// `Temporal` (the modern date API) is a Stage-3 proposal, NOT in Node yet (needs a
// polyfill), so it's intentionally not exercised here.
// Implement, then run:  make skill14
import { test, run, assert } from '../_harness';

// epochMillis: parse an ISO date-time string to milliseconds since the Unix epoch.
//   epochMillis('1970-01-01T00:00:01Z') -> 1000
export function epochMillis(iso: string): number {
  throw new Error('TODO: epochMillis');
}

// addSeconds: ISO string `secs` seconds later, back as an ISO string (UTC, ...Z).
//   addSeconds('1970-01-01T00:00:00Z', 90) -> '1970-01-01T00:01:30.000Z'
export function addSeconds(iso: string, secs: number): string {
  throw new Error('TODO: addSeconds');
}

// isExpired: true iff `now` (millis) is at or past setAt + ttlSecs*1000.
//   isExpired(0, 10, 9000) -> false ; isExpired(0, 10, 10000) -> true
export function isExpired(setAtMs: number, ttlSecs: number, nowMs: number): boolean {
  throw new Error('TODO: isExpired');
}

test('epochMillis parses ISO to millis', () => {
  assert.strictEqual(epochMillis('1970-01-01T00:00:01Z'), 1000);
});

test('addSeconds shifts and re-serializes', () => {
  assert.strictEqual(addSeconds('1970-01-01T00:00:00Z', 90), '1970-01-01T00:01:30.000Z');
});

test('isExpired checks the ttl boundary', () => {
  assert.strictEqual(isExpired(0, 10, 9000), false);
  assert.strictEqual(isExpired(0, 10, 10000), true); // at the boundary = expired
});

run();
