# Sim 1 — In-Memory Key/Value Store

Implement `class KVStore` in `sim1/solution.ts`. Run:

```bash
npx ts-node --project practice/tsconfig.json practice/sims/sim1/sim1.test.ts
```

## Level 1 — basic ops

- `set(key, value): void` — store/overwrite.
- `get(key): string | null` — value, or `null` if absent.
- `delete(key): boolean` — `true` if a value existed and was removed, else `false`.

## Level 2 — prefix scan

- `scanPrefix(prefix): string[]` — for every key starting with `prefix`, return `` `${key}(${value})` ``,
  sorted by key ascending. Empty array if none.

## Level 3 — timestamps + TTL (refactor time in)

Records now live on a timeline. A record set at `timestamp` with `ttl` is **alive** while
`timestamp <= now < timestamp + ttl`. If `ttl` is omitted, it never expires.

- `setAt(key, value, timestamp, ttl?): void`
- `getAt(key, timestamp): string | null` — value if alive at `timestamp`, else `null`.
- `scanPrefixAt(prefix, timestamp): string[]` — like `scanPrefix` but only keys alive at `timestamp`.

> Refactor hint: implement the timeline once, then make L1 `set`/`get` delegate to `setAt`/`getAt`
> (e.g. `set` = `setAt(key, value, 0)` with no ttl). That's the intended adaptation, not a rewrite.

## Level 4 — backup / restore

- `backup(timestamp): number` — snapshot every key alive at `timestamp` (store each key's **remaining**
  ttl = `expiry - timestamp`; forever-keys stay forever). Return the count of keys saved. Multiple
  backups may exist, identified by their `timestamp`.
- `restore(restoreTimestamp, backupTimestamp): void` — replace current state with the backup taken at
  `backupTimestamp`. Each restored key is re-anchored: it is set at `restoreTimestamp` with its saved
  remaining ttl (so a key with 90 remaining, restored at t=200, is alive `[200, 290)`). Forever-keys
  remain forever.

See `sim1/sim1.test.ts` for exact expected values.
