// Skill 4 — undefined handling (your `Option` reflex).
// Implement, then run:  make skill4
import { test, run, assert } from '../_harness';

// Value for `k`, or 0 if missing.
export function safeGet(m: Map<string, number>, k: string): number {
  throw new Error('TODO: safeGet');
}

test('safeGet defaults to 0', () => {
  const m = new Map([['x', 5]]);
  assert.strictEqual(safeGet(m, 'x'), 5);
  assert.strictEqual(safeGet(m, 'y'), 0);
});

run();
