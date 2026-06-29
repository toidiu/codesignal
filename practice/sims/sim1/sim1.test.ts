import { test, run, assert } from '../../_harness';
// Imports the full level chain (level4 extends level3 … extends level1).
// Implement level1.ts first: the L1 tests pass while later levels still throw
// TODO at runtime. Work one level file at a time — you never need to open the
// next level's file to pass the level you're on.
import { KVStore } from './level4';

// ---------------- Level 1 ----------------
test('L1: set / get / delete', () => {
  const s = new KVStore();
  s.set('a', '1');
  assert.strictEqual(s.get('a'), '1');
  assert.strictEqual(s.get('missing'), null);
  s.set('a', '2'); // overwrite
  assert.strictEqual(s.get('a'), '2');
  assert.strictEqual(s.delete('a'), true);
  assert.strictEqual(s.delete('a'), false);
  assert.strictEqual(s.get('a'), null);
});

// ---------------- Level 2 ----------------
test('L2: scanPrefix sorted, formatted', () => {
  const s = new KVStore();
  s.set('car', '1');
  s.set('cat', '2');
  s.set('dog', '3');
  s.set('can', '4');
  assert.deepStrictEqual(s.scanPrefix('ca'), ['can(4)', 'car(1)', 'cat(2)']);
  assert.deepStrictEqual(s.scanPrefix('z'), []);
});

// ---------------- Level 3 ----------------
test('L3: ttl expiry window', () => {
  const s = new KVStore();
  s.setAt('k', 'v', 10, 5); // alive [10, 15)
  assert.strictEqual(s.getAt('k', 10), 'v');
  assert.strictEqual(s.getAt('k', 14), 'v');
  assert.strictEqual(s.getAt('k', 15), null); // expired
  assert.strictEqual(s.getAt('k', 9), null); // not set yet
  s.setAt('forever', 'x', 0); // no ttl
  assert.strictEqual(s.getAt('forever', 9999), 'x');
});

test('L3: scanPrefixAt only returns live keys', () => {
  const s = new KVStore();
  s.setAt('ca', '1', 0, 5); // alive [0, 5)
  s.setAt('cb', '2', 0); // forever
  assert.deepStrictEqual(s.scanPrefixAt('c', 3), ['ca(1)', 'cb(2)']);
  assert.deepStrictEqual(s.scanPrefixAt('c', 6), ['cb(2)']);
});

// ---------------- Level 4 ----------------
test('L4: backup / restore re-bases remaining ttl', () => {
  const s = new KVStore();
  s.setAt('k', 'v', 10, 100); // alive [10, 110); remaining at t=20 is 90
  s.setAt('p', 'w', 0); // forever
  assert.strictEqual(s.backup(20), 2);

  // mutate after the backup was taken
  s.setAt('k', 'CHANGED', 30);
  s.delete('p');

  // restore at t=200 from the backup taken at t=20
  s.restore(200, 20);
  assert.strictEqual(s.getAt('k', 200), 'v'); // re-anchored to [200, 290)
  assert.strictEqual(s.getAt('k', 289), 'v');
  assert.strictEqual(s.getAt('k', 290), null);
  assert.strictEqual(s.getAt('p', 99999), 'w'); // forever survives
});

run();
