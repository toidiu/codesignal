// Skill 18 — Singly linked list: build, reverse, fast/slow pointer (middle).
// Implement the stubs, then run:  make skill18
import { test, run, assert } from '../_harness';

// A single node. `next` is the next node or null at the tail.
export class ListNode {
  val: number;
  next: ListNode | undefined;

  constructor(val: number, next: ListNode | undefined = undefined) {
    this.val = val;
    this.next = next;
  }
}

// Build a list from an array; return the head (or null if empty).
//   fromArray([1,2,3]) -> 1 -> 2 -> 3
export function fromArray(nums: number[]): ListNode | undefined {
  let head: ListNode | undefined = undefined;
  let prev: ListNode | undefined = undefined;

  for (const n of nums) {
    let curr: ListNode = new ListNode(n);

    if (prev !== undefined) {
      prev.next = curr;
    }

    if (head === undefined) {
      head = curr;
    }

    prev = curr;
  }

  return head;
}

// Walk the list, collecting vals into an array.
//   toArray(1->2->3) -> [1,2,3]
export function toArray(head: ListNode | undefined): number[] {
  const ret = [];

  let curr = head;

  while (curr !== undefined) {
    ret.push(curr.val);

    curr = curr.next;
  }

  return ret;
}

// Reverse the list in place; return the new head.
//   reverse(1->2->3) -> 3->2->1
export function reverse(head: ListNode | undefined): ListNode | undefined {

  let bef = undefined;
  let curr = head;

  // bef -> curr -> aft
  while (curr !== undefined) {
    // save aft
    const aft = curr.next;

    // update curr pointers
    curr.next = bef;

    // update state
    bef = curr;
    curr = aft;
  }

  return bef;
}

// Middle node via fast/slow pointers. On even length, return the SECOND middle.
//   middle(1->2->3)   -> node(2)
//   middle(1->2->3->4)-> node(3)
export function middle(head: ListNode | undefined): ListNode | undefined {
  let slow = head;
  let fast = head;

  while (fast !== undefined && fast.next !== undefined) {

    // move fast
    fast = fast.next.next;
    // fast = fast.next;
    // if (fast === undefined) {
    //   break;
    // }
    // fast = fast.next;

    // move slow
    slow = slow!.next;
  }

  return slow;
}

test('fromArray + toArray round-trip', () => {
  assert.deepStrictEqual(toArray(fromArray([1, 2, 3])), [1, 2, 3]);
  assert.deepStrictEqual(toArray(fromArray([])), []);
});

test('reverse', () => {
  assert.deepStrictEqual(toArray(reverse(fromArray([1, 2, 3]))), [3, 2, 1]);
  assert.strictEqual(reverse(undefined), undefined);
});

test('middle: second middle on even length', () => {
  assert.strictEqual(middle(fromArray([1, 2, 3]))?.val, 2);
  assert.strictEqual(middle(fromArray([1, 2, 3, 4]))?.val, 3);
});

run();
