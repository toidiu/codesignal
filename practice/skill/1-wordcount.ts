// Skill 1 — Counting into a Map (the `get(k) ?? 0` pattern).
// Implement, then run:  make skill1   (or the full command in ../README.md)
import { test, run, assert } from '../_harness';

// Count occurrences of each word.
//   wordCount(['a','b','a']) -> Map { 'a' => 2, 'b' => 1 }
export function wordCount(words: string[]): Map<string, number> {
  const map = new Map<string, number>();

  for (const c of words) {
    let v = getOrCreate(map, c, () => 0);
    map.set(c, v + 1);
  }

  return map;
  // throw new Error('TODO: wordCount');
}

function getOrCreate<K, V>(m: Map<K, V>, k: K, def: () => V): V {
  if (m.get(k) === undefined) {
    m.set(k, def());
  }

  return m.get(k)!;
}

test('wordCount counts occurrences', () => {
  const c = wordCount(['a', 'b', 'a', 'a', 'b']);
  assert.strictEqual(c.get('a'), 3);
  assert.strictEqual(c.get('b'), 2);
  assert.strictEqual(c.get('z'), undefined);
});

run();
