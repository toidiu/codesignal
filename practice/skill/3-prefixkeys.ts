// Skill 3 — Prefix filter + sort.
// Implement, then run:  make skill3
import { test, run, assert } from '../_harness';

// All keys starting with `prefix`, sorted ascending.
//   prefixKeys(['cat','car','dog','can'], 'ca') -> ['can','car','cat']
export function prefixKeys(keys: string[], prefix: string): string[] {
  const sorted = keys
    // filter with prefix
    .filter((a) => a.startsWith(prefix))
    // sort
    .sort((a, b) => (a.localeCompare(b)));

  return sorted;
  // throw new Error('TODO: prefixKeys');
}

test('prefixKeys filters and sorts', () => {
  assert.deepStrictEqual(prefixKeys(['cat', 'car', 'dog', 'can'], 'ca'), ['can', 'car', 'cat']);
  assert.deepStrictEqual(prefixKeys(['cat', 'car'], 'z'), []);
});

run();
