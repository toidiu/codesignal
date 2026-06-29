import { test, run, assert } from '../../_harness';
// Imports the full level chain (level4 extends … extends level1).
// Implement level1.ts first; L1 tests pass while later levels throw TODO.
// Work one level file at a time.
import { FileStore } from './level4';

// ---------------- Level 1 ----------------
test('L1: addFile / getSize / deleteFile', () => {
  const fs = new FileStore();
  assert.strictEqual(fs.addFile('a.txt', 100), true);
  assert.strictEqual(fs.addFile('a.txt', 50), false); // name exists
  assert.strictEqual(fs.getSize('a.txt'), 100);
  assert.strictEqual(fs.getSize('missing'), null);
  assert.strictEqual(fs.deleteFile('a.txt'), 100);
  assert.strictEqual(fs.deleteFile('a.txt'), null); // already gone
  assert.strictEqual(fs.getSize('a.txt'), null);
});

// ---------------- Level 2 ----------------
test('L2: nLargest by size desc, ties by name asc, prefix filtered', () => {
  const fs = new FileStore();
  fs.addFile('dir/a', 300);
  fs.addFile('dir/b', 100);
  fs.addFile('dir/c', 300);
  fs.addFile('other', 999);

  assert.deepStrictEqual(fs.nLargest('dir/', 2), ['dir/a(300)', 'dir/c(300)']);
  assert.deepStrictEqual(fs.nLargest('dir/', 10), ['dir/a(300)', 'dir/c(300)', 'dir/b(100)']);
  assert.deepStrictEqual(fs.nLargest('zzz', 3), []);
});

// ---------------- Level 3 ----------------
// Encoded interpretation of mergeUser's return:
//   target.capacity grows by source.remaining, the moved files occupy space,
//   so remaining_after = (target.cap + source.remaining) - (target.used + source.used).
// Adjust the expected value if your reading differs.
test('L3: users, capacity limits, free-name check', () => {
  const fs = new FileStore();
  assert.strictEqual(fs.addUser('u1', 1000), true);
  assert.strictEqual(fs.addUser('u1', 1), false); // exists

  assert.strictEqual(fs.addFileBy('u1', 'f1', 400), 600); // 1000 - 400
  assert.strictEqual(fs.addFileBy('u1', 'f2', 700), null); // exceeds remaining 600
  assert.strictEqual(fs.addFileBy('u1', 'f1', 100), null); // name taken
  assert.strictEqual(fs.addFileBy('nouser', 'f3', 10), null); // missing user
  assert.strictEqual(fs.addFileBy('u1', 'f3', 600), 0); // exactly fits -> remaining 0
});

test('L3: mergeUser folds files + remaining capacity', () => {
  const fs = new FileStore();
  fs.addUser('u1', 1000);
  fs.addFileBy('u1', 'f1', 200); // u1 remaining 800
  fs.addUser('u2', 500);
  fs.addFileBy('u2', 'g1', 100); // u2 remaining 400

  // (1000 + 400) - (200 + 100) = 1100
  assert.strictEqual(fs.mergeUser('u1', 'u2'), 1100);
  assert.strictEqual(fs.getSize('g1'), 100); // g1 survived the merge
  assert.strictEqual(fs.mergeUser('u1', 'u2'), null); // u2 gone
  assert.strictEqual(fs.mergeUser('nope', 'u1'), null); // missing target
});

// ---------------- Level 4 ----------------
test('L4: backupUser / restoreUser', () => {
  const fs = new FileStore();
  fs.addUser('u1', 1000);
  fs.addFileBy('u1', 'a', 100);
  fs.addFileBy('u1', 'b', 200);
  assert.strictEqual(fs.backupUser('u1'), 2); // a, b saved
  assert.strictEqual(fs.backupUser('nouser'), null);

  fs.addFileBy('u1', 'c', 50); // added after backup
  fs.deleteFile('a'); // removed after backup

  assert.strictEqual(fs.restoreUser('u1'), 2); // restored to { a, b }
  assert.strictEqual(fs.getSize('a'), 100); // back
  assert.strictEqual(fs.getSize('b'), 200);
  assert.strictEqual(fs.getSize('c'), null); // discarded (added since backup)
});

run();
