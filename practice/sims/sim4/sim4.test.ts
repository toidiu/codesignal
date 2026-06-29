import { test, run, assert } from '../../_harness';
// Imports the full level chain (level4 extends … extends level1).
// Implement level1.ts first; L1 tests pass while later levels throw TODO.
// Work one level file at a time.
import { Database } from './level4';

// ---------------- Level 1 ----------------
test('L1: set / get / deleteField', () => {
  const db = new Database();
  db.set('u1', 'name', 'ada');
  assert.strictEqual(db.get('u1', 'name'), 'ada');
  assert.strictEqual(db.get('u1', 'missing'), null);
  assert.strictEqual(db.get('nobody', 'name'), null);
  db.set('u1', 'name', 'ADA'); // overwrite
  assert.strictEqual(db.get('u1', 'name'), 'ADA');
  assert.strictEqual(db.deleteField('u1', 'name'), true);
  assert.strictEqual(db.deleteField('u1', 'name'), false);
  assert.strictEqual(db.get('u1', 'name'), null);
});

// ---------------- Level 2 ----------------
test('L2: scanField sorted; scanByValue across records', () => {
  const db = new Database();
  db.set('u1', 'name', 'ada');
  db.set('u1', 'city', 'london');
  db.set('u2', 'name', 'ada');

  assert.deepStrictEqual(db.scanField('u1'), ['city(london)', 'name(ada)']);
  assert.deepStrictEqual(db.scanField('nobody'), []);
  assert.deepStrictEqual(db.scanByValue('ada'), ['u1.name', 'u2.name']);
});

// ---------------- Level 3 ----------------
test('L3: ttl window on a field', () => {
  const db = new Database();
  db.setAt('k', 'f', 'v', 10, 5); // alive [10, 15)
  assert.strictEqual(db.getAt('k', 'f', 10), 'v');
  assert.strictEqual(db.getAt('k', 'f', 14), 'v');
  assert.strictEqual(db.getAt('k', 'f', 15), null); // expired
  assert.strictEqual(db.getAt('k', 'f', 9), null); // not set yet

  db.setAt('k', 'g', 'w', 0); // forever
  assert.deepStrictEqual(db.scanFieldAt('k', 12), ['f(v)', 'g(w)']);
  assert.deepStrictEqual(db.scanFieldAt('k', 20), ['g(w)']); // f expired
});

// ---------------- Level 4 ----------------
test('L4: getAtVersion reads the value as of a timestamp', () => {
  const db = new Database();
  db.setAt('k', 'f', 'v1', 10); // forever from t=10
  db.setAt('k', 'f', 'v2', 20); // new version from t=20

  assert.strictEqual(db.getAtVersion('k', 'f', 5), null); // nothing set yet
  assert.strictEqual(db.getAtVersion('k', 'f', 15), 'v1'); // latest set <= 15
  assert.strictEqual(db.getAtVersion('k', 'f', 25), 'v2'); // latest set <= 25
});

test('L4: revertField copies a past version into the present', () => {
  const db = new Database();
  db.setAt('k', 'f', 'v1', 10);
  db.setAt('k', 'f', 'v2', 20);

  db.revertField('k', 'f', 30, 15); // present(30) := value as of 15 = 'v1'
  assert.strictEqual(db.getAtVersion('k', 'f', 30), 'v1');

  db.revertField('k', 'f', 40, 5); // value as of 5 is null -> no-op
  assert.strictEqual(db.getAtVersion('k', 'f', 40), 'v1'); // unchanged
});

run();
