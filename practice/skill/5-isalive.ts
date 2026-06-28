// Skill 5 — TTL window logic (the heart of Level 3).
// Implement, then run:  make skill5
import { test, run, assert } from '../_harness';

// A record set at `setAt` with `ttl` is alive at `now` iff: setAt <= now < setAt + ttl.
// If ttl is undefined, it never expires.
export function isAlive(setAt: number, now: number, ttl?: number): boolean {
  if (ttl === undefined) {
    // never expire
    return true;
  }

  const end = setAt + ttl;
  // setAt <= now <= setAt + ttl
  if ((setAt <= now) && (now < end)) {
    return true;
  } else {
    return false;
  }
}

test('isAlive respects the ttl window', () => {
  assert.strictEqual(isAlive(10, 12, 5), true); // 10 <= 12 < 15
  assert.strictEqual(isAlive(10, 10, 5), true); // inclusive start
  assert.strictEqual(isAlive(10, 15, 5), false); // exclusive end
  assert.strictEqual(isAlive(10, 9, 5), false); // before set
  assert.strictEqual(isAlive(10, 9999, undefined), true); // no ttl => forever
});

run();
