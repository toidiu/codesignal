# TS Assessment Prep — Checklist

Track everything here. Check items off as you go: `[ ]` → `[x]`.
Reference docs live in `practice/` (`CHEATSHEET.md`, `FORMAT.md`, `RAMP.md`).

---

## A. Concepts to drill (the "must-know" TS for this screen)

Graded on passing tests fast, not code quality — so favor plain, correct, fast code.

- [ ] **`Map` / `Set`** — `get/set/has/delete/entries`, `get(k) ?? default`. (≈ Rust `HashMap`/`HashSet`)
- [ ] **Objects / nested maps as records** — "Map of entities, each a Map of fields"
- [ ] **Array methods** — `map`, `filter`, `reduce`, `find`, `slice`, `some/every`
- [ ] **Sorting with comparators + tiebreakers** — `b.n - a.n || a.name.localeCompare(b.name)`
- [ ] **Top-N rankings** — sort then `slice(0, n)`
- [ ] **Strings** — `split`, `startsWith`, `includes`, template literals, prefix matching
- [ ] **null / undefined handling** — `?.`, `??`, treat every `.get` as `T | undefined`
- [ ] **Timestamps / TTL math** — alive iff `setAt <= now < setAt + ttl`
- [ ] **Deep clone for snapshots** — `structuredClone`, or `new Map([...].map(...))`
- [ ] **Class holding state** — central state object, methods per operation
- [ ] **`async`/`await` + `Promise<T>`** (in case the spec is async)

## B. TS traps to internalize (Rust-dev edition)

- [ ] `sort()` without a comparator **stringifies** numbers
- [ ] `map.forEach((value, key))` — **value is first**
- [ ] `typeof null === 'object'`, `typeof [] === 'object'` → use `Array.isArray`
- [ ] `===` only (no `==`); objects compare by **identity**, not value
- [ ] Composite keys → serialize to a string (`` `${x},${y}` ``)
- [ ] Integer math needs `Math.floor`; all numbers are floats
- [ ] `Map.get(k)` vs object `obj[k]` — don't mix them

## C. Strategy reminders

- [ ] Keep **one central state class**; later levels extend, not rewrite
- [ ] **L1 fast**, don't gold-plate — move on when green
- [ ] Design L1/L2 anticipating **time** (L3); delegate old methods to timestamped ones
- [ ] **Partial credit counts** — easy cases first, edge cases after
- [ ] Don't over-engineer for the level you can't see yet

---

## D. Skill drills (do FIRST) — `practice/skill/`

Run all: `make skill`  ·  one at a time: `make skill1` … `make skill7`

- [ ] 1. `1-wordcount.ts` — count into a Map
- [ ] 2. `2-topn.ts` — rank by count desc, name asc
- [ ] 3. `3-prefixkeys.ts` — prefix filter + sort
- [ ] 4. `4-safeget.ts` — undefined → default
- [ ] 5. `5-isalive.ts` — TTL window
- [ ] 6. `6-clonestate.ts` — deep clone nested Map
- [ ] 7. `7-counter.ts` — stateful class + ranking
- [ ] **`make skill` reports all 7 green**

## E. Simulations (do AFTER skills) — `practice/sims/`

Run: `make sim1` (sim2..4 once their tests are wired)

### Sim 1 — KV store (tests ready)
- [ ] L1 set/get/delete
- [ ] L2 scanPrefix
- [ ] L3 timestamps + TTL
- [ ] L4 backup/restore

### Sim 2 — Banking (spec ready; ask me to wire up tests)
- [ ] L1 accounts/deposit/transfer
- [ ] L2 topSpenders
- [ ] L3 scheduled payments + cashback
- [ ] L4 merge + balance history

### Sim 3 — Cloud file storage (spec ready; ask me to wire up tests)
- [ ] L1 add/get/delete file
- [ ] L2 nLargest by prefix
- [ ] L3 users + capacity
- [ ] L4 backup/restore per user

### Sim 4 — Record database (spec ready; ask me to wire up tests)
- [ ] L1 set/get/delete field
- [ ] L2 scan field / by value
- [ ] L3 field TTL
- [ ] L4 point-in-time history

---

## F. Timed dry runs (do near the end)

- [ ] One full sim in **90 min**, no notes mid-run
- [ ] A second full sim timed
- [ ] Review which mechanic slowed you down → add to `CHEATSHEET.md`
