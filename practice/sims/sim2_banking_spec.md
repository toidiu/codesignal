# Sim 2 — Banking System

Implement `class Bank` in `sim2/solution.ts`. (Tests provided on request — ask and I'll wire up
`sim2/sim2.test.ts`.)

## Level 1 — accounts & money

- `createAccount(accountId): boolean` — `true` if created, `false` if it already exists.
- `deposit(accountId, amount): number | null` — new balance, or `null` if no such account.
- `transfer(fromId, toId, amount): number | null` — move money; return the new balance of `fromId`,
  or `null` if either account is missing or `fromId` has insufficient funds (or from === to).

## Level 2 — rankings

- `topSpenders(n): string[]` — the `n` accounts with the highest total **outgoing** transferred amount,
  formatted `` `${accountId}(${totalOut})` ``, sorted by total out **desc**, ties by accountId **asc**.

## Level 3 — scheduled payments + timestamps

Every operation now takes a `timestamp`. Add:

- `pay(accountId, amount, timestamp): string | null` — like a withdrawal; returns a payment id
  `"payment{N}"` (global counter), or `null` if insufficient funds / missing account.
- Payments earn **2% cashback**, credited back to the account 24h (86400s) after the payment timestamp.
  Cashback must be applied lazily — i.e. any operation at/after the cashback time sees the credited funds.
- `getBalance(accountId, timestamp): number | null` — balance as seen at `timestamp` (with due cashback applied).

## Level 4 — merge & history

- `mergeAccounts(idA, idB, timestamp): boolean` — fold `idB` into `idA`: balances sum, outgoing totals
  sum, pending cashbacks carry over (still keyed to their original times), `idB` ceases to exist.
- `balanceAt(accountId, timestamp): number | null` — balance of an account (following any merges it was
  part of) as of `timestamp`.

> Note: this is intentionally close to the real CodeSignal "banking" archetype. Build a central
> `Map<string, Account>` and keep cashback as a list of `{time, amount}` you apply lazily.
