// Skill 20 — Queue (FIFO) and its signature use: breadth-first traversal.
// Implement the stubs, then run:  make skill20
import { test, run, assert } from '../_harness';

// FIFO queue. Use a head index instead of Array.shift() to keep dequeue O(1).
export class Queue<T> {
  private data: T[] = [];
  private head = 0;

  size(): number {
    return this.data.length - this.head;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  // Add to the back.
  enqueue(x: T): void {
    throw new Error('TODO: enqueue');
  }

  // Remove and return from the front (undefined if empty).
  dequeue(): T | undefined {
    throw new Error('TODO: dequeue');
  }

  // Front element without removing it (undefined if empty).
  peek(): T | undefined {
    throw new Error('TODO: peek');
  }
}

// BFS visit order over a directed graph given as an adjacency map.
// Start at `start`, visit each node once, neighbors explored in list order.
//   bfsOrder({a:['b','c'], b:['d'], c:['d'], d:[]}, 'a') -> ['a','b','c','d']
export function bfsOrder(graph: Record<string, string[]>, start: string): string[] {
  throw new Error('TODO: bfsOrder');
}

test('Queue: FIFO order', () => {
  const q = new Queue<number>();
  q.enqueue(1);
  q.enqueue(2);
  assert.strictEqual(q.peek(), 1);
  assert.strictEqual(q.dequeue(), 1);
  assert.strictEqual(q.dequeue(), 2);
  assert.strictEqual(q.dequeue(), undefined);
  assert.strictEqual(q.isEmpty(), true);
});

test('bfsOrder: level by level, each node once', () => {
  const g = { a: ['b', 'c'], b: ['d'], c: ['d'], d: [] };
  assert.deepStrictEqual(bfsOrder(g, 'a'), ['a', 'b', 'c', 'd']);
});

run();
