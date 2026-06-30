// Skill 23 — Backtracking: subsets / permutations / combinations (the DFS+undo pattern).
// Implement the stubs, then run:  make skill23
import { test, run, assert } from '../_harness';

// All subsets (the power set), in include-order.
//   subsets([1,2]) -> [[], [1], [1,2], [2]]
export function subsets(nums: number[]): number[][] {
  throw new Error('TODO: subsets');
}

// All permutations of the input.
//   permutations([1,2]) -> [[1,2], [2,1]]
export function permutations(nums: number[]): number[][] {
  throw new Error('TODO: permutations');
}

// All k-length increasing combinations chosen from 1..n.
//   combinations(4, 2) -> [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
export function combinations(n: number, k: number): number[][] {
  throw new Error('TODO: combinations');
}

test('subsets: power set in include-order', () => {
  assert.deepStrictEqual(subsets([1, 2]), [[], [1], [1, 2], [2]]);
  assert.deepStrictEqual(subsets([]), [[]]);
});

test('permutations', () => {
  assert.deepStrictEqual(permutations([1, 2]), [[1, 2], [2, 1]]);
  assert.deepStrictEqual(permutations([1, 2, 3]), [
    [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1],
  ]);
});

test('combinations: k from 1..n, increasing', () => {
  assert.deepStrictEqual(combinations(4, 2), [
    [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4],
  ]);
});

run();
