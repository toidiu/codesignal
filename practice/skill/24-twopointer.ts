// Skill 24 — Two pointers: converging ends and slow/fast on sorted data.
// Implement the stubs, then run:  make skill24
import { test, run, assert } from '../_harness';

// Two-sum on a SORTED array: 0-based indices [i, j] (i < j) whose values sum to
// target, or undefined. Move a left/right pointer inward based on the sum.
//   twoSumSorted([1,2,4,7], 6) -> [1,2]   (2 + 4)
export function twoSumSorted(nums: number[], target: number): [number, number] | undefined {
  throw new Error('TODO: twoSumSorted');
}

// Palindrome check with pointers from both ends (assume input already normalized).
//   isPalindrome('racecar') -> true ; isPalindrome('abc') -> false
export function isPalindrome(s: string): boolean {
  throw new Error('TODO: isPalindrome');
}

// Remove duplicates from a SORTED array, returning a new compacted array.
// Slow pointer writes the next unique value; fast pointer scans ahead.
//   dedupeSorted([1,1,2,3,3]) -> [1,2,3]
export function dedupeSorted(nums: number[]): number[] {
  throw new Error('TODO: dedupeSorted');
}

test('twoSumSorted: converge from both ends', () => {
  assert.deepStrictEqual(twoSumSorted([1, 2, 4, 7], 6), [1, 2]);
  assert.deepStrictEqual(twoSumSorted([1, 2, 4, 7], 8), [0, 3]);
  assert.strictEqual(twoSumSorted([1, 2, 4, 7], 100), undefined);
});

test('isPalindrome', () => {
  assert.strictEqual(isPalindrome('racecar'), true);
  assert.strictEqual(isPalindrome('abc'), false);
  assert.strictEqual(isPalindrome(''), true);
});

test('dedupeSorted: slow/fast compaction', () => {
  assert.deepStrictEqual(dedupeSorted([1, 1, 2, 3, 3]), [1, 2, 3]);
  assert.deepStrictEqual(dedupeSorted([]), []);
});

run();
