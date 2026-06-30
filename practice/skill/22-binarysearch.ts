// Skill 22 — Binary search: on a sorted array, the insertion point, and on the answer.
// Implement the stubs, then run:  make skill22
import { test, run, assert } from '../_harness';

// Classic search: index of `target` in a sorted array, or -1 if absent.
//   search([1,3,5,7], 5) -> 2 ; search([1,3,5,7], 4) -> -1
export function search(nums: number[], target: number): number {
  throw new Error('TODO: search');
}

// Leftmost insertion point: first index i where nums[i] >= target
// (i.e. how many elements are strictly less than target). Range [0, length].
//   lowerBound([1,3,3,5], 3) -> 1 ; lowerBound([1,3,3,5], 4) -> 3
export function lowerBound(nums: number[], target: number): number {
  throw new Error('TODO: lowerBound');
}

// Binary search on the ANSWER space: given a monotonic predicate that is
// false...false,true...true over [lo, hi], return the smallest x with pred(x).
// Assumes pred(hi) is true.
//   firstTrue(0, 10, x => x*x >= 17) -> 5   (5*5=25 >= 17, 4*4=16 < 17)
export function firstTrue(lo: number, hi: number, pred: (x: number) => boolean): number {
  throw new Error('TODO: firstTrue');
}

test('search finds an index or -1', () => {
  assert.strictEqual(search([1, 3, 5, 7], 5), 2);
  assert.strictEqual(search([1, 3, 5, 7], 4), -1);
  assert.strictEqual(search([], 1), -1);
});

test('lowerBound returns the leftmost insertion point', () => {
  assert.strictEqual(lowerBound([1, 3, 3, 5], 3), 1);
  assert.strictEqual(lowerBound([1, 3, 3, 5], 4), 3);
  assert.strictEqual(lowerBound([1, 3, 3, 5], 0), 0);
  assert.strictEqual(lowerBound([1, 3, 3, 5], 9), 4);
});

test('firstTrue searches the answer space', () => {
  assert.strictEqual(firstTrue(0, 10, (x) => x * x >= 17), 5);
  assert.strictEqual(firstTrue(0, 10, (x) => x >= 0), 0);
});

run();
