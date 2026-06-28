// Skill 4 — undefined handling (your `Option` reflex).
// Implement, then run:  make skill4
import { test, run, assert } from '../_harness';

type Option<T> = {kind: 'some'; val: T} | {kind: 'none'};

// Value for `k`, or 0 if missing.
export function safeGet(m: Map<string, number>, k: string): number {
  return m.get(k) ?? 0;
}

export function optionGet(m: Map<string, number>, k: string): Option<number> {
  const ret = m.get(k);

  if (ret === undefined) {
    return {kind: 'none'};
  } else {
    return {kind: 'some', val: ret};
  }
}

test('safeGet defaults to 0', () => {
  const m = new Map([['x', 5]]);
  assert.strictEqual(safeGet(m, 'x'), 5);
  assert.strictEqual(safeGet(m, 'y'), 0);

  assert.deepStrictEqual(optionGet(m, 'x'), some(5));
  assert.deepStrictEqual(optionGet(m, 'y'), none());
});

export function some<T>(val: T): Option<T> {
  return {kind: 'some', val: val};
}

export function none<T>(): Option<T> {
  return {kind: 'none'};
}

run();
