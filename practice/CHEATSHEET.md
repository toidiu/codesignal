# TS Cheatsheet (Rust-dev edition)

Living doc. Add to it as you hit things. Core model: **structural typing** — matching shape means assignable. All numbers are floats. Use `===` only. `map.get(missing)` is `undefined`, not a panic.

## References

- **MDN** — runtime API (`Map`/`Set`/`Array`/`String`), your `std` docs. <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects>
  - Deep-links per method; search via `mdn array reduce`, `mdn map.get`, etc.
- **TS cheatsheets** — official one-page visuals (types, generics). <https://www.typescriptlang.org/cheatsheets>
- **TS Playground** — paste code, hover for inferred types, see errors live ("does this typecheck?"). <https://www.typescriptlang.org/play>

## Map — your HashMap

```ts
const m = new Map<string, number>();
m.set('a', 1);
// 1  | undefined if absent
m.get('a');
// boolean
m.has('a');
// boolean (true if existed)
m.delete('a');
m.size;
// entries; [k,v] order
for (const [k, v] of m) { }
// CAREFUL: value FIRST, key second
m.forEach((v, k) => { });
[...m.keys()]; [...m.values()]; [...m.entries()];
// default when missing
const n = m.get('x') ?? 0;
```

`get-or-create` — insert a default when absent, then mutate it (the `entry().or_insert_with()` move):

```ts
// inline, for a counter: bump count for k
m.set(k, (m.get(k) ?? 0) + 1);

// helper, when the value is a container you then mutate:
function getOrCreate<K, V>(m: Map<K, V>, k: K, make: () => V): V {
  let v = m.get(k);
  if (v === undefined) { v = make(); m.set(k, v); }
  return v;
}
// append into per-key array
getOrCreate(buckets, k, () => [] as string[]).push(item);
// NOTE: make() must RETURN the value — `() => 0`, not `() => {0}` (a block returns void).
```

## Set

```ts
const s = new Set<string>();
s.add('x'); s.has('x'); s.delete('x'); s.size;
// to array
[...s];
```

## Spread `[...]` — iterator/iterable → array (your `.collect::<Vec<_>>()`)

`.entries()` / `.keys()` / `.values()` give a **lazy iterator**, not an array. It has no `.sort`/`.map`/`.slice`/`.length`. Spread it into an array first (or use `Array.from`).

```ts
// MapIterator — only .next(); .sort is NOT a function
counts.entries();
// [[k,v], …]  real array → .sort/.map/.slice work
[...counts.entries()];
// SAME (a Map iterates as entries)
[...counts];
// just keys
[...counts.keys()];
// just values
[...counts.values()];
// identical, non-spread spelling
Array.from(counts.entries());
// ['h','i']  any iterable: string/Set/Map/generator
[...'hi'];
// concat arrays
const merged = [...a, ...b];
// merge objects
const obj = { ...o1, ...o2 };
// spread as call arguments
fn(...args);
```

## Arrays / sorting (the #1 trap)

```ts
// ['10','2','3']  ← stringifies! almost never what you want
[3,10,2].sort();
// [2,3,10]  numeric asc
[3,10,2].sort((a,b) => a - b);
// desc
arr.sort((a,b) => b - a);
// multi-key: by count desc, then name asc
entries.sort((a,b) => b.count - a.count || a.name.localeCompare(b.name));
arr.map(x => x*2); arr.filter(x => x>0); arr.reduce((acc,x) => acc+x, 0);
arr.find(x => x.id===3); arr.some(...); arr.every(...);
// first n (non-mutating)
arr.slice(0, n);
```

## Mutating vs copying (does it change the original?)

**Array — return a new array (original untouched):**

- `map`
- `filter`
- `slice`
- `concat`
- `flat`
- `flatMap`
- `reduce` / `find` / `some` / `every` — return a value, not an array

**Array — MUTATE in place:**

- `sort`
- `reverse`
- `splice`
- `push` / `pop`
- `shift` / `unshift`
- `fill`

**Map — MUTATE in place:**

- `set`
- `delete`
- `clear`
- everything else (`get` / `has` / `keys` / `values` / `entries` / `forEach`) only reads

```ts
// ⚠️ sort & reverse MUTATE — copy first to keep the original
const top = [...arr].sort((a, b) => b - a).slice(0, n);

// Map has NO map/filter/reduce — spread to entries, transform, rebuild
// filter a Map -> new Map
const big = new Map([...m].filter(([k, v]) => v > 10));
// map values -> new Map
const doubled = new Map([...m].map(([k, v]) => [k, v * 2]));
// reduce a Map -> one value
const total = [...m.values()].reduce((acc, v) => acc + v, 0);

// only way to copy a Map (SHALLOW — inner objects/Maps shared)
const copy = new Map(m);
```

## `for...of` vs `for...in` (Rust `for` trap)

```ts
// VALUES → 10, 20          ← use this
for (const x of [10, 20]) { }
// string INDICES → "0","1"  ← almost never what you want
for (const k in [10, 20]) { }
// chars: "h","i"
for (const c of "hi") { }
// entries
for (const [k, v] of map) { }
// when you need index + value
for (const [i, x] of arr.entries()) { }
```
- `of` = values of any iterable (array/string/Map/Set). Your default.
- `in` = **keys as strings**, plus inherited ones. On arrays you get `"0"`,`"1"`…, so `i + 1` becomes `"01"`. Use it only on plain objects — prefer `Object.keys()`.

## Strings

```ts
s.split('/'); s.startsWith('pre'); s.includes('x'); s.slice(1); s.toUpperCase();
// template literal — common output format
`${key}(${value})`;
// >0 ; use for sort tiebreakers
'b'.localeCompare('a');
```

## null / undefined (your Option)

```ts
// optional chaining
x?.y?.z
// b only if a is null/undefined (0 and '' pass through)
a ?? b
if (v === undefined) { }
const got = m.get(k); if (got === undefined) return null;
```

## `switch` + discriminated unions (your `match` on enums)

No pattern matching. `switch` compares a **value** with `===`, not a shape. Switch on the discriminant tag (`o.kind`), not the object.

```ts
type Option<T> = { kind: 'some'; value: T } | { kind: 'none' };

function unwrapOr<T>(o: Option<T>, fallback: T): T {
  switch (o.kind) {
    // TS narrows o to { kind: 'some'; value: T } here
    case 'some':
      return o.value;
    case 'none':
      return fallback;
  }
}
```

- Switch on a single value (`o.kind`), never a destructured shape — `case { ... } =>` is Rust, not TS.
- Inside a `case`, TS **narrows** the union to that variant, so `o.value` is typed.
- `return` exits; without `return`/`break` cases **fall through** to the next.
- Each variant returning makes TS see the function as exhaustive.
- For two variants an `if` is often clearer: `if (o.kind === 'some') return o.value; return fallback;`

Exhaustiveness check — make TS error when a new variant is added:

```ts
default: {
  const _exhaustive: never = o;
  return _exhaustive;
}
```

## Composite keys — no struct equality

Objects compare by identity, not value. To key a Map by a pair, serialize it:

```ts
// or JSON.stringify([x,y])
const key = `${x},${y}`;
```

## Class holding state (sim skeleton)

```ts
class Service {
  private data = new Map<string, Map<string, string>>();
  set(id: string, field: string, val: string): void {
    let rec = this.data.get(id);
    if (rec === undefined) { rec = new Map(); this.data.set(id, rec); }
    rec.set(field, val);
  }
}
```

## Snapshots / history (Level 4 patterns)

```ts
// deep clone (Node 17+); works on Maps/arrays/objects
structuredClone(obj);
// SHALLOW copy of a map
new Map(oldMap);
// deep clone nested map manually:
const copy = new Map([...m].map(([k, inner]) => [k, new Map(inner)]));
```

## TTL / timestamps (Level 3 pattern)

```ts
// record alive at `now` iff  setAt <= now < setAt + ttl   (no ttl => forever)
const alive = ttl === undefined ? now >= setAt : now >= setAt && now < setAt + ttl;
```

## Asserts (`node:assert`, what the harness re-exports)

```ts
// === : PRIMITIVES (number/string/boolean/null/undefined)
assert.strictEqual(a, b);
// recursive === : OBJECTS / arrays / Maps / Sets / nested
assert.deepStrictEqual(a, b);
// truthy condition, e.g. assert.ok(m.has('a'))
assert.ok(x);
// f must throw
assert.throws(() => f());
```
- Rule: **primitive → `strictEqual`, object/array/Map → `deepStrictEqual`.** Under `===` two equal-shaped objects differ, so they fail `strictEqual`.
- Skip the non-strict `equal` / `deepEqual`. They use coercing `==` (`1 == '1'`). Always go strict.
- `deepStrictEqual` also checks type (array ≠ object) and treats `NaN === NaN` as equal.

## Gotchas list

- `sort()` without comparator stringifies.
- `forEach((value, key))` — value is first.
- `typeof null === 'object'`, `typeof [] === 'object'` — use `Array.isArray`.
- Integer math: `Math.floor(a / b)`; no auto truncation.
- `Map` vs object: `m.get(k)` vs `obj[k]` — don't mix.
- `for...in` yields string keys/indices, not values — use `for...of`; on arrays `in` gives "0","1"…
```
