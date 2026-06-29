// Skill 17 — Class inheritance: extends / super / method override.
// Implement, then run:  make skill17
import { test, run, assert } from '../_harness';

// Base account: holds a balance, supports deposit and a describe() string.
export class Account {
  protected balance: number;

  constructor(initial: number) {
    this.balance = initial;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  describe(): string {
    return `balance=${this.balance}`;
  }
}

// Savings extends Account, adds interest, and OVERRIDES describe() to append the rate.
export class Savings extends Account {
  private rate: number;

  constructor(initial: number, rate: number) {
    super(initial);
    this.rate = rate;
  }

  // addInterest: deposit balance * rate (reuse the inherited deposit()).
  addInterest(): void {
    this.balance = this.balance + this.balance * this.rate;
  }

  // override: base describe() plus ` rate=${rate}` (call super.describe()).
  describe(): string {
    let ret = super.describe() + ` rate=${this.rate}`;

    console.log(ret);

    return ret;
  }
}

test('Account: deposit + describe', () => {
  const a = new Account(100);
  a.deposit(50);
  assert.strictEqual(a.describe(), 'balance=150');
});

test('Savings: inherits deposit, adds interest, overrides describe', () => {
  const s = new Savings(100, 0.1);
  s.addInterest(); // +10
  assert.strictEqual(s.describe(), 'balance=110 rate=0.1');
});

run();
