// Skill 7 — Stateful class + ranking (the sim skeleton in miniature).
// Implement, then run:  make skill7
import { test, run, assert } from '../_harness';

// Counter: inc(key) adds 1; get(key) returns the count (0 if unseen);
// top(n) returns the top n keys by count DESC, then key ASC.
export class Counter {
  private data = new Map<string, number>();

  inc(key: string): void {
    let curr = this.data.get(key) ?? 0;

    this.data.set(key, curr + 1);
  }

  get(key: string): number {
    return this.data.get(key) ?? 0;
  }

  top(n: number): string[] {
    let sorted = [...this.data].sort((a, b) => (
      // cnt DESC
        // key asc
      b[1] - a[1]
        || a[0].localeCompare(b[0])
    ));

    return sorted.map((a) => a[0]).slice(0, n);
  }
}

test('Counter inc/get/top', () => {
  const c = new Counter();
  assert.deepStrictEqual(c.top(2), []);
  c.inc('a');
  c.inc('a');
  c.inc('b');
  assert.strictEqual(c.get('a'), 2);
  assert.strictEqual(c.get('z'), 0);
  assert.deepStrictEqual(c.top(2), ['a', 'b']);
});

run();
