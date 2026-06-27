// Skill 1 — Counting into a Map (the `get(k) ?? 0` pattern).
// Implement, then run:  make skill1   (or the full command in ../README.md)
import { test, run, assert } from '../_harness';

// Count occurrences of each word.
//   wordCount(['a','b','a']) -> Map { 'a' => 2, 'b' => 1 }
export function wordCount(words: string[]): Map<string, number> {
  throw new Error('TODO: wordCount');
}

test('wordCount counts occurrences', () => {
  const c = wordCount(['a', 'b', 'a', 'a', 'b']);
  assert.strictEqual(c.get('a'), 3);
  assert.strictEqual(c.get('b'), 2);
  assert.strictEqual(c.get('z'), undefined);
});

run();
