import { test, run, assert } from '../../_harness';
// Imports the full level chain (level4 extends … extends level1).
// Implement level1.ts first; L1 tests pass while later levels throw TODO.
// Work one level file at a time.
import { Bank } from './level4';

// ---------------- Level 1 ----------------
test('L1: createAccount / deposit / transfer', () => {
  const b = new Bank();
  assert.strictEqual(b.createAccount('a'), true);
  assert.strictEqual(b.createAccount('a'), false); // already exists
  assert.strictEqual(b.deposit('a', 100), 100);
  assert.strictEqual(b.deposit('a', 50), 150);
  assert.strictEqual(b.deposit('missing', 10), null);

  assert.strictEqual(b.createAccount('c'), true);
  assert.strictEqual(b.transfer('a', 'c', 30), 120); // a: 150-30
  assert.strictEqual(b.transfer('a', 'c', 9999), null); // insufficient -> no change
  assert.strictEqual(b.transfer('a', 'missing', 10), null); // missing target
  assert.strictEqual(b.transfer('missing', 'c', 10), null); // missing source
  assert.strictEqual(b.transfer('a', 'a', 10), null); // self transfer
  assert.strictEqual(b.deposit('a', 0), 120); // balance still 120 after failed transfers
});

// ---------------- Level 2 ----------------
test('L2: topSpenders by total outgoing, ties by id asc', () => {
  const b = new Bank();
  for (const id of ['a', 'b', 'c', 'd']) {
    b.createAccount(id);
    b.deposit(id, 1000);
  }
  b.transfer('a', 'd', 400); // a out 400
  b.transfer('b', 'd', 300); // b out 300
  b.transfer('c', 'd', 300); // c out 300 (ties with b -> b first by id asc)

  assert.deepStrictEqual(b.topSpenders(2), ['a(400)', 'b(300)']);
  assert.deepStrictEqual(b.topSpenders(10), ['a(400)', 'b(300)', 'c(300)', 'd(0)']);
});

// ---------------- Level 3 ----------------
// Interpretation encoded here: cashback = floor-free 2% of the paid amount,
// credited exactly at paymentTime + 86400, applied lazily on read.
test('L3: pay returns payment ids, cashback credited after 24h', () => {
  const b = new Bank();
  b.createAccount('a');
  b.deposit('a', 1000);

  assert.strictEqual(b.pay('a', 100, 100), 'payment1'); // balance 900
  assert.strictEqual(b.getBalance('a', 100), 900);
  assert.strictEqual(b.getBalance('a', 86499), 900); // cashback not due yet
  assert.strictEqual(b.getBalance('a', 86500), 902); // +2% of 100 at 100+86400

  assert.strictEqual(b.pay('a', 99999, 90000), null); // insufficient
  assert.strictEqual(b.pay('nope', 1, 1), null); // missing account
});

test('L3: payment counter is global across accounts', () => {
  const b = new Bank();
  b.createAccount('a');
  b.deposit('a', 100);
  b.createAccount('z');
  b.deposit('z', 100);
  assert.strictEqual(b.pay('a', 10, 1), 'payment1');
  assert.strictEqual(b.pay('z', 10, 1), 'payment2');
  assert.strictEqual(b.pay('a', 10, 1), 'payment3');
});

// ---------------- Level 4 ----------------
test('L4: mergeAccounts folds balances, outgoing, and pending cashback', () => {
  const b = new Bank();
  b.createAccount('a');
  b.deposit('a', 1000);
  b.createAccount('b');
  b.deposit('b', 500);
  b.pay('a', 100, 100); // a: 900, cashback +2 @ 86500
  b.pay('b', 200, 100); // b: 300, cashback +4 @ 86500

  assert.strictEqual(b.mergeAccounts('a', 'b', 1000), true);
  assert.strictEqual(b.mergeAccounts('a', 'gone', 1000), false); // missing
  assert.strictEqual(b.getBalance('a', 2000), 1200); // 900 + 300, cashbacks not due
  assert.strictEqual(b.getBalance('a', 86500), 1206); // + (2 + 4) carried-over cashback
});

test('L4: balanceAt follows a merged-away account into its target', () => {
  const b = new Bank();
  b.createAccount('a');
  b.deposit('a', 1000);
  b.createAccount('b');
  b.deposit('b', 500);
  b.mergeAccounts('a', 'b', 1000);

  assert.strictEqual(b.balanceAt('a', 2000), 1500);
  assert.strictEqual(b.balanceAt('b', 2000), 1500); // b followed into a
  assert.strictEqual(b.balanceAt('never', 2000), null);
});

run();
