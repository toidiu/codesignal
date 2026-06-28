// Skill 8 — Generics (type params <T>, a second param <K>, generic over Map).
// Implement, then run:  make skill8
import { test, run, assert } from '../_harness';

// groupBy: bucket items by a derived key. <T> = item type, <K> = key type.
//   groupBy([1,2,3,4], x => x % 2) -> Map { 1 => [1,3], 0 => [2,4] }
export function groupBy<T, K>(items: T[], key: (x: T) => K): Map<K, T[]> {
  const map = new Map<K, T[]>();

  for (const item of items) {
    const k = key(item);
    const arr = getOrCreate(map, k, () => []);
    arr.push(item);
  }

  return map;
}

function getOrCreate<K, V>(map: Map<K, V>, k: K, def: () => V): V {
  if (!map.has(k)) {
    map.set(k, def());
  }

  return map.get(k)!;
}

// maxBy: the item with the highest score, or undefined if empty.
//   <T> flows in and back out unchanged; the callback scores each item.
export function maxBy<T>(items: T[], score: (x: T) => number): T | undefined {
  if (items.length === 0) {
    return undefined;
  }

  const a = items.reduce((max_val, x_val) => {
    const x_score = score(x_val);
    const max_score = score(max_val);

    return x_score > max_score ? x_val : max_val;
  });

  return a;
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
