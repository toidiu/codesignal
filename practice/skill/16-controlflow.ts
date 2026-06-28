// Skill 16 — Control flow: try / catch / throw + custom Error classes.
// Implement, then run:  make skill16
import { test, run, assert } from '../_harness';

// A custom error type. `extends Error`; set `name` so `instanceof` and `.name` work.
export class NotFoundError extends Error {
  constructor(key: string) {
    throw new Error('TODO: NotFoundError constructor'); // super(...) + this.name = 'NotFoundError'
  }
}

// requireKey: return the value or THROW NotFoundError if the key is absent.
export function requireKey(m: Map<string, number>, k: string): number {
  throw new Error('TODO: requireKey');
}

// safeRequire: call requireKey, but CATCH NotFoundError and return `fallback` instead.
//   any other error should propagate (re-throw).
export function safeRequire(m: Map<string, number>, k: string, fallback: number): number {
  throw new Error('TODO: safeRequire');
}

test('requireKey throws NotFoundError when missing', () => {
  const m = new Map([['x', 5]]);
  assert.strictEqual(requireKey(m, 'x'), 5);
  assert.throws(() => requireKey(m, 'y'), NotFoundError);
});

test('safeRequire catches NotFoundError → fallback', () => {
  const m = new Map([['x', 5]]);
  assert.strictEqual(safeRequire(m, 'x', 0), 5);
  assert.strictEqual(safeRequire(m, 'y', -1), -1);
});

run();
