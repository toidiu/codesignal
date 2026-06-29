// Sim 2 — Banking System · LEVEL 1 (accounts & money)
//
// Implement these to pass the L1 tests. Later levels live in their own files
// (level2.ts … level4.ts) and extend this class — you only see the level you're on.
//
// ── Level 1 spec ──────────────────────────────────────────────────────────
// createAccount(accountId): boolean
//   true if created, false if it already exists.
// deposit(accountId, amount): number | null
//   new balance, or null if no such account.
// transfer(fromId, toId, amount): number | null
//   move money; return the new balance of `fromId`, or null if either account
//   is missing, `fromId` has insufficient funds, or from === to.
// ───────────────────────────────────────────────────────────────────────────

export class Bank {
  createAccount(accountId: string): boolean {
    throw new Error('TODO L1: createAccount');
  }
  deposit(accountId: string, amount: number): number | null {
    throw new Error('TODO L1: deposit');
  }
  transfer(fromId: string, toId: string, amount: number): number | null {
    throw new Error('TODO L1: transfer');
  }
}
