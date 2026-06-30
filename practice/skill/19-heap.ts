// Skill 19 — Binary min-heap: push / pop / peek, then top-K via the heap.
// Implement the stubs, then run:  make skill19
import { test, run, assert } from '../_harness';

// Array-backed binary min-heap. Parent at i, children at 2i+1 / 2i+2.
export class MinHeap {
  private data: number[] = [];

  size(): number {
    return this.data.length;
  }

  // Smallest element without removing it (undefined if empty).
  peek(): number | undefined {
    throw new Error('TODO: peek');
  }

  // Insert, then sift up to restore the heap property.
  push(x: number): void {
    throw new Error('TODO: push');
  }

  // Remove and return the smallest: swap root with last, pop, sift down.
  pop(): number | undefined {
    throw new Error('TODO: pop');
  }
}

// The k largest values, ascending. Keep a min-heap of size k:
// push each value, pop when size exceeds k, then drain.
//   kLargest([3,1,5,2,4], 2) -> [4, 5]
export function kLargest(nums: number[], k: number): number[] {
  throw new Error('TODO: kLargest');
}

test('MinHeap: pops in ascending order', () => {
  const h = new MinHeap();
  [5, 1, 4, 2, 3].forEach((x) => h.push(x));
  assert.strictEqual(h.peek(), 1);
  const out: number[] = [];
  while (h.size() > 0) out.push(h.pop()!);
  assert.deepStrictEqual(out, [1, 2, 3, 4, 5]);
});

test('kLargest', () => {
  assert.deepStrictEqual(kLargest([3, 1, 5, 2, 4], 2), [4, 5]);
  assert.deepStrictEqual(kLargest([1], 3), [1]);
});

run();
