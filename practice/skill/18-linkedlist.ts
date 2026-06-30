// Skill 18 — Singly linked list: build, reverse, fast/slow pointer (middle).
// Implement the stubs, then run:  make skill18
import { test, run, assert } from '../_harness';

// A single node. `next` is the next node or null at the tail.
export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

// Build a list from an array; return the head (or null if empty).
//   fromArray([1,2,3]) -> 1 -> 2 -> 3
export function fromArray(nums: number[]): ListNode | null {
  throw new Error('TODO: fromArray');
}

// Walk the list, collecting vals into an array.
//   toArray(1->2->3) -> [1,2,3]
export function toArray(head: ListNode | null): number[] {
  throw new Error('TODO: toArray');
}

// Reverse the list in place; return the new head.
//   reverse(1->2->3) -> 3->2->1
export function reverse(head: ListNode | null): ListNode | null {
  throw new Error('TODO: reverse');
}

// Middle node via fast/slow pointers. On even length, return the SECOND middle.
//   middle(1->2->3)   -> node(2)
//   middle(1->2->3->4)-> node(3)
export function middle(head: ListNode | null): ListNode | null {
  throw new Error('TODO: middle');
}

test('fromArray + toArray round-trip', () => {
  assert.deepStrictEqual(toArray(fromArray([1, 2, 3])), [1, 2, 3]);
  assert.deepStrictEqual(toArray(fromArray([])), []);
});

test('reverse', () => {
  assert.deepStrictEqual(toArray(reverse(fromArray([1, 2, 3]))), [3, 2, 1]);
  assert.strictEqual(reverse(null), null);
});

test('middle: second middle on even length', () => {
  assert.strictEqual(middle(fromArray([1, 2, 3]))?.val, 2);
  assert.strictEqual(middle(fromArray([1, 2, 3, 4]))?.val, 3);
});

run();
