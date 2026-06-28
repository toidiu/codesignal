# TS Assessment Prep — Checklist

Track everything here. Check items off as you go: `[ ]` → `[x]`.
Reference docs live in `practice/` (`CHEATSHEET.md`, `FORMAT.md`, `SKILL.md`).

---

## A. Concepts to drill (the "must-know" TS for this screen)

Graded on passing tests fast, not code quality — so favor plain, correct, fast code.

### `Map` (≈ Rust `HashMap`)

- [ ] set / overwrite a value  
  `m.set(k, v)`
- [ ] get a value — `undefined` if absent  
  `m.get(k)`
- [ ] check membership  
  `m.has(k)`
- [ ] remove — returns `boolean`  
  `m.delete(k)`
- [ ] number of entries  
  `m.size`
- [ ] iterate entries  
  `for (const [k, v] of m) { }`
- [ ] all keys  
  `[...m.keys()]`
- [ ] all values  
  `[...m.values()]`
- [ ] all entries  
  `[...m.entries()]`
- [ ] default when missing  
  `m.get(k) ?? fallback`

### `Set` (≈ Rust `HashSet`)

- [ ] add  
  `s.add(x)`
- [ ] check membership  
  `s.has(x)`
- [ ] remove  
  `s.delete(x)`
- [ ] size  
  `s.size`
- [ ] to array  
  `[...s]`

### Objects / nested maps as records

- [ ] model: "Map of entities, each a Map of fields"
- [ ] create-if-missing, then set (the `computeIfAbsent` pattern)

### Array methods

- [ ] transform each element  
  `arr.map(x => ...)`
- [ ] keep matching elements  
  `arr.filter(x => ...)`
- [ ] fold to one value  
  `arr.reduce((acc, x) => ..., init)`
- [ ] search for one element  
  `arr.find(x => ...)`
- [ ] any / all match  
  `arr.some(...)` · `arr.every(...)`
- [ ] first n, non-mutating  
  `arr.slice(0, n)`

### Sorting

- [ ] numeric ascending (never bare `sort()`)  
  `arr.sort((a, b) => a - b)`
- [ ] descending  
  `arr.sort((a, b) => b - a)`
- [ ] with tiebreaker  
  `(a, b) => b.n - a.n || a.name.localeCompare(b.name)`

### Top-N rankings

- [ ] sort, then take the first n  
  `sorted.slice(0, n)`

### Strings

- [ ] split into parts  
  `s.split('/')`
- [ ] prefix match  
  `s.startsWith('pre')`
- [ ] contains  
  `s.includes('x')`
- [ ] build an output string  
  `` `${k}(${v})` ``
- [ ] compare for sort tiebreaks  
  `a.localeCompare(b)`

### null / undefined handling

- [ ] optional chaining  
  `a?.b?.c`
- [ ] nullish coalescing  
  `value ?? fallback`
- [ ] treat every `.get` as `T | undefined`

### Timestamps / TTL math

- [ ] alive iff `setAt <= now < setAt + ttl`

### Deep clone for snapshots

- [ ] deep clone one value  
  `structuredClone(x)`
- [ ] clone a nested map  
  `new Map([...m].map(([k, v]) => [k, new Map(v)]))`

### Class holding state

- [ ] central state object, one method per operation

### Generics

- [ ] generic function with one type param  
  `function id<T>(x: T): T`
- [ ] second type param + callback  
  `function groupBy<T, K>(xs: T[], key: (x: T) => K): Map<K, T[]>`
- [ ] generic returning `T | undefined`  
  `function maxBy<T>(xs: T[], score: (x: T) => number): T | undefined`

### Option / Result (Rust-style tagged unions)

- [ ] model with a discriminated union  
  `type Option<T> = { kind: 'some'; value: T } | { kind: 'none' }`  
  `type Result<T, E> = { kind: 'ok'; value: T } | { kind: 'err'; error: E }`
- [ ] narrow on the `kind` tag, e.g. `unwrapOr`

### async (only if the spec is async)

- [ ] `async` / `await` with `Promise<T>`

## B. TS traps to internalize (Rust-dev edition)

- [ ] bare `sort()` sorts numbers as strings — always pass a comparator  
  `arr.sort((a, b) => a - b)`
- [ ] `forEach` passes **value first**, then key  
  `m.forEach((value, key) => ...)`
- [ ] `typeof null` and `typeof []` are both `'object'` — use `Array.isArray`
- [ ] use `===` only; objects compare by **identity**, not value
- [ ] composite keys: serialize to a string  
  `` `${x},${y}` ``
- [ ] integer math needs `Math.floor` (all numbers are floats)
- [ ] don't mix `Map.get(k)` with object `obj[k]`

## C. Strategy reminders

- [ ] Keep **one central state class**; later levels extend, not rewrite
- [ ] **L1 fast**, don't gold-plate — move on when green
- [ ] Design L1/L2 anticipating **time** (L3); delegate old methods to timestamped ones
- [ ] **Partial credit counts** — easy cases first, edge cases after
- [ ] Don't over-engineer for the level you can't see yet

---

## D. Skill drills (do FIRST) — `practice/skill/`

Run all: `make skill`  ·  one at a time: `make skill1` … `make skill9`

- [x] 1. `1-wordcount.ts` — count into a Map
- [x] 2. `2-topn.ts` — rank by count desc, name asc
- [ ] 3. `3-prefixkeys.ts` — prefix filter + sort
- [ ] 4. `4-safeget.ts` — undefined → default
- [ ] 5. `5-isalive.ts` — TTL window
- [ ] 6. `6-clonestate.ts` — deep clone nested Map
- [ ] 7. `7-counter.ts` — stateful class + ranking
- [ ] 8. `8-generics.ts` — generics: `<T>`, `<K>`, generic over `Map`
- [ ] 9. `9-optresult.ts` — `Option<T>` / `Result<T,E>` tagged unions
- [ ] **`make skill` reports all 9 green**

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
