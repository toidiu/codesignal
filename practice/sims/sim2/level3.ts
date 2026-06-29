// Sim 2 — Banking System · LEVEL 3 (scheduled payments + timestamps)
//
// Extends Level 2. Every operation now conceptually happens at a `timestamp`.
//
// ── Level 3 spec ──────────────────────────────────────────────────────────
// pay(accountId, amount, timestamp): string | null
//   Like a withdrawal; returns a payment id "payment{N}" (global counter,
//   incremented per successful call), or null if insufficient funds / missing account.
//
// Payments earn 2% cashback, credited back to the account 24h (86400s) AFTER the
// payment timestamp. Cashback is applied LAZILY: any operation at/after the
// cashback time sees the credited funds.
//
// getBalance(accountId, timestamp): number | null
//   Balance as seen at `timestamp` (with all due cashback applied), or null if missing.
// ───────────────────────────────────────────────────────────────────────────

import { Bank as Base } from './level2';

export class Bank extends Base {
  pay(accountId: string, amount: number, timestamp: number): string | null {
    throw new Error('TODO L3: pay');
  }
  getBalance(accountId: string, timestamp: number): number | null {
    throw new Error('TODO L3: getBalance');
  }
}
