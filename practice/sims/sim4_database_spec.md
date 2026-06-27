# Sim 4 — In-Memory Record Database

Implement `class Database` in `sim4/solution.ts`. (Ask and I'll wire up `sim4/sim4.test.ts`.)

Records are identified by a string key and hold a set of named string fields.

## Level 1 — fields

- `set(key, field, value): void` — set/overwrite a field on a record (creating the record if needed).
- `get(key, field): string | null` — field value, or `null` if record/field absent.
- `deleteField(key, field): boolean` — `true` if the field existed and was removed.

## Level 2 — scan

- `scanField(key): string[]` — all fields of a record formatted `` `${field}(${value})` ``, sorted by
  field name **asc**. Empty if record absent.
- `scanByValue(value): string[]` — every `` `${key}.${field}` `` whose field equals `value`, sorted asc.

## Level 3 — field TTL

Operations gain a `timestamp`; fields can expire.

- `setAt(key, field, value, timestamp, ttl?): void` — field alive while `timestamp <= now < timestamp + ttl`
  (no ttl = forever).
- `getAt(key, field, timestamp): string | null` — value if alive at `timestamp`.
- `scanFieldAt(key, timestamp): string[]` — like `scanField` but only fields alive at `timestamp`.

> Refactor hint: make L1 `set`/`get` delegate to the timestamped versions (timestamp 0, no ttl).

## Level 4 — point-in-time history

Every `setAt` is retained as history rather than overwriting.

- `getAtVersion(key, field, timestamp): string | null` — the value of the field **as of** `timestamp`:
  the most recent set with `setTime <= timestamp` that is still alive at `timestamp`. `null` otherwise.
- `revertField(key, field, timestamp, toTimestamp): void` — set the field's current value (at `timestamp`)
  to whatever `getAtVersion(key, field, toTimestamp)` would return; no-op if that is `null`.
