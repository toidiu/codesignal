// Skill 8 — Generics (type params <T>, a second param <K>, generic over Map).
// Implement, then run:  make skill8
import { test, run, assert } from '../_harness';

// groupBy: bucket items by a derived key. <T> = item type, <K> = key type.
//   groupBy([1,2,3,4], x => x % 2) -> Map { 1 => [1,3], 0 => [2,4] }
export function groupBy<T, K>(items: T[], key: (x: T) => K): Map<K, T[]> {
  throw new Error('TODO: groupBy');
}

// maxBy: the item with the highest score, or undefined if empty.
//   <T> flows in and back out unchanged; the callback scores each item.
export function maxBy<T>(items: T[], score: (x: T) => number): T | undefined {
  throw new Error('TODO: maxBy');
}

test('groupBy buckets by key', () => {
  const g = groupBy([1, 2, 3, 4], (x) => x % 2);
  assert.deepStrictEqual(g.get(1), [1, 3]);
  assert.deepStrictEqual(g.get(0), [2, 4]);
});

test('maxBy picks highest score', () => {
  assert.strictEqual(maxBy(['a', 'bbb', 'cc'], (s) => s.length), 'bbb');
  assert.strictEqual(maxBy<string>([], (s) => s.length), undefined);
});

run();
