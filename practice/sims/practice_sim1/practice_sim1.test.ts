import { test, run, assert } from '../../_harness';
// Warm-up sim. Imports the full chain (level4 extends … extends level1).
// Implement level1.ts first; later levels throw TODO until you reach them.
import { Inventory } from './level4';

// ---------------- Level 1 ----------------
test('L1: add / count / remove', () => {
  const inv = new Inventory();
  inv.add('apple', 3);
  assert.strictEqual(inv.count('apple'), 3);
  inv.add('apple', 2); // increases
  assert.strictEqual(inv.count('apple'), 5);
  assert.strictEqual(inv.count('missing'), 0);

  assert.strictEqual(inv.remove('apple', 4), true);
  assert.strictEqual(inv.count('apple'), 1);
  assert.strictEqual(inv.remove('apple', 5), false); // not enough stock
  assert.strictEqual(inv.count('apple'), 1); // unchanged after a failed remove
  assert.strictEqual(inv.remove('missing', 1), false);
});

// ---------------- Level 2 ----------------
test('L2: topItems by qty desc, ties by name asc', () => {
  const inv = new Inventory();
  inv.add('apple', 5);
  inv.add('banana', 3);
  inv.add('cherry', 5); // ties apple at 5 -> apple first by name

  assert.deepStrictEqual(inv.topItems(2), ['apple(5)', 'cherry(5)']);
  assert.deepStrictEqual(inv.topItems(10), ['apple(5)', 'cherry(5)', 'banana(3)']);
});

// ---------------- Level 3 ----------------
test('L3: addAt / countAt on a timeline', () => {
  const inv = new Inventory();
  inv.addAt('apple', 5, 10);
  inv.addAt('apple', 3, 20);
  assert.strictEqual(inv.countAt('apple', 9), 0); // before any arrival
  assert.strictEqual(inv.countAt('apple', 10), 5); // first batch
  assert.strictEqual(inv.countAt('apple', 25), 8); // both batches
  assert.strictEqual(inv.countAt('missing', 99), 0);
});

test('L3: L1 add() delegates onto the timeline at t=0', () => {
  const inv = new Inventory();
  inv.add('apple', 4); // arrives at t=0
  inv.addAt('apple', 6, 100);
  assert.strictEqual(inv.countAt('apple', 0), 4);
  assert.strictEqual(inv.countAt('apple', 100), 10);
  assert.strictEqual(inv.count('apple'), 10); // live total reflects both
});

// ---------------- Level 4 ----------------
test('L4: backup snapshots, restore rolls back', () => {
  const inv = new Inventory();
  inv.add('apple', 5);
  inv.add('banana', 2);
  assert.strictEqual(inv.backup(), 2); // two distinct items saved

  inv.add('apple', 100); // mutate after the backup
  inv.add('cherry', 1);
  inv.remove('banana', 2);

  assert.strictEqual(inv.restore(), true);
  assert.strictEqual(inv.count('apple'), 5); // rolled back
  assert.strictEqual(inv.count('banana'), 2);
  assert.strictEqual(inv.count('cherry'), 0); // added after backup -> gone
  assert.strictEqual(inv.restore(), true); // backup retained, repeatable
});

test('L4: restore with no backup returns false', () => {
  const inv = new Inventory();
  assert.strictEqual(inv.restore(), false);
});

run();
