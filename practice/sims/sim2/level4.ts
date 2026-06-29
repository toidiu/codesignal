// Sim 2 — Banking System · LEVEL 4 (merge & history)
//
// Extends Level 3. This is the full class the tests import.
//
// ── Level 4 spec ──────────────────────────────────────────────────────────
// mergeAccounts(idA, idB, timestamp): boolean
//   Fold `idB` into `idA`: balances sum, outgoing totals sum, pending cashbacks
//   carry over (still keyed to their original times); `idB` ceases to exist.
//   false if either account is missing or idA === idB.
//
// balanceAt(accountId, timestamp): number | null
//   Balance of an account (following any merges it was part of) as of `timestamp`,
//   or null if the account never existed.
// ───────────────────────────────────────────────────────────────────────────

import { Bank as Base } from './level3';

export class Bank extends Base {
  mergeAccounts(idA: string, idB: string, timestamp: number): boolean {
    throw new Error('TODO L4: mergeAccounts');
  }
  balanceAt(accountId: string, timestamp: number): number | null {
    throw new Error('TODO L4: balanceAt');
  }
}
