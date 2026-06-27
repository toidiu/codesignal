// Skill 2 — Ranking: sort by count DESC, then name ASC (the tiebreak idiom).
// Implement, then run:  make skill2
import { test, run, assert } from '../_harness';

// Names of the top `n` entries, by count desc, then name asc.
//   topN(Map{banana:2, apple:2, cherry:5}, 2) -> ['cherry', 'apple']
export function topN(counts: Map<string, number>, n: number): string[] {
  throw new Error('TODO: topN');
}

test('topN: count desc, then name asc', () => {
  const c = new Map([
    ['banana', 2],
    ['apple', 2],
    ['cherry', 5],
  ]);
  assert.deepStrictEqual(topN(c, 2), ['cherry', 'apple']);
  assert.deepStrictEqual(topN(c, 5), ['cherry', 'apple', 'banana']);
});

run();
