// Skill 7 — Stateful class + ranking (the sim skeleton in miniature).
// Implement, then run:  make skill7
import { test, run, assert } from '../_harness';

// Counter: inc(key) adds 1; get(key) returns the count (0 if unseen);
// top(n) returns the top n keys by count DESC, then key ASC.
export class Counter {
  inc(key: string): void {
    throw new Error('TODO: Counter.inc');
  }
  get(key: string): number {
    throw new Error('TODO: Counter.get');
  }
  top(n: number): string[] {
    throw new Error('TODO: Counter.top');
  }
}

test('Counter inc/get/top', () => {
  const c = new Counter();
  c.inc('a');
  c.inc('a');
  c.inc('b');
  assert.strictEqual(c.get('a'), 2);
  assert.strictEqual(c.get('z'), 0);
  assert.deepStrictEqual(c.top(2), ['a', 'b']);
});

run();
