// Skill 15 — JSON (stringify / parse / round-trip / composite keys).
// Implement, then run:  make skill15
import { test, run, assert } from '../_harness';

// clone: deep clone a plain JSON-safe value via stringify→parse.
//   (cheaper-but-limited cousin of structuredClone; loses Maps/undefined/functions)
export function clone<T>(value: T): T {
  throw new Error('TODO: clone');
}

// pairKey: a stable string key for a [x, y] pair via JSON (composite-key pattern).
//   pairKey(1, 2) -> '[1,2]'
export function pairKey(x: number, y: number): string {
  throw new Error('TODO: pairKey');
}

// tryParse: parse JSON, returning undefined instead of throwing on bad input.
//   tryParse('{"a":1}') -> {a:1} ; tryParse('nope') -> undefined
export function tryParse(s: string): unknown {
  throw new Error('TODO: tryParse');
}

test('clone is a deep, independent copy', () => {
  const src = { a: 1, nested: { b: [2, 3] } };
  const copy = clone(src);
  assert.deepStrictEqual(copy, src);
  copy.nested.b.push(4);
  assert.deepStrictEqual(src.nested.b, [2, 3]); // original untouched
});

test('pairKey serializes a composite key', () => {
  assert.strictEqual(pairKey(1, 2), '[1,2]');
});

test('tryParse swallows parse errors', () => {
  assert.deepStrictEqual(tryParse('{"a":1}'), { a: 1 });
  assert.strictEqual(tryParse('nope'), undefined);
});

run();
