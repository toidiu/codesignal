// Skill 3 — Prefix filter + sort.
// Implement, then run:  make skill3
import { test, run, assert } from '../_harness';

// All keys starting with `prefix`, sorted ascending.
//   prefixKeys(['cat','car','dog','can'], 'ca') -> ['can','car','cat']
export function prefixKeys(keys: string[], prefix: string): string[] {
  throw new Error('TODO: prefixKeys');
}

test('prefixKeys filters and sorts', () => {
  assert.deepStrictEqual(prefixKeys(['cat', 'car', 'dog', 'can'], 'ca'), ['can', 'car', 'cat']);
  assert.deepStrictEqual(prefixKeys(['cat', 'car'], 'z'), []);
});

run();
