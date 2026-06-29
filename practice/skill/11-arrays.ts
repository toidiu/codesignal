// Skill 11 — Array methods (map / filter / reduce / find / some / every / slice).
// Implement, then run:  make skill11
import { test, run, assert } from '../_harness';

// sumPositive: total of only the positive numbers (filter then reduce).
//   sumPositive([1, -2, 3]) -> 4
export function sumPositive(nums: number[]): number {
  return nums
    .filter((a) => a > 0)
    .reduce((acc, x) => acc + x, 0);
}

// pluckIds: the `id` of each item (map).
//   pluckIds([{id:1,name:'a'},{id:2,name:'b'}]) -> [1, 2]
export function pluckIds(items: { id: number; name: string }[]): number[] {
  return items.map(({id, name}) => id);
}

// firstOver: first number strictly greater than `limit`, or undefined (find).
//   firstOver([1, 5, 9], 4) -> 5
export function firstOver(nums: number[], limit: number): number | undefined {
  let ret = nums.find((a) => a > limit);

  return ret;
}

// nLargest: the n largest numbers, descending — WITHOUT mutating the input.
//   nLargest([3, 1, 2, 5], 2) -> [5, 3]
export function nLargest(nums: number[], n: number): number[] {
  // no mutataion
  let ret = [...nums]
    // desc
    .sort((a, b) => b - a)
    // n numbers
    .slice(0, n);

  return ret;
}

test('sumPositive folds only positives', () => {
  assert.strictEqual(sumPositive([1, -2, 3, -4]), 4);
  assert.strictEqual(sumPositive([]), 0);
});

test('pluckIds maps to ids', () => {
  assert.deepStrictEqual(pluckIds([{ id: 1, name: 'a' }, { id: 2, name: 'b' }]), [1, 2]);
});

test('firstOver finds first match or undefined', () => {
  assert.strictEqual(firstOver([1, 5, 9], 4), 5);
  assert.strictEqual(firstOver([1, 2], 9), undefined);
});

test('nLargest sorts desc, slices, no mutation', () => {
  const input = [3, 1, 2, 5];
  assert.deepStrictEqual(nLargest(input, 2), [5, 3]);
  assert.deepStrictEqual(input, [3, 1, 2, 5]); // unchanged
});

run();
