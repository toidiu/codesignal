# TS Cheatsheet (Rust-dev edition)

Living doc — add to it as you hit things. Mental model: **structural typing** (shape matches = assignable),
all numbers are floats, `===` only, `map.get(missing)` returns `undefined` (not a panic).

## Map — your HashMap

```ts
const m = new Map<string, number>();
m.set('a', 1);
m.get('a');            // 1   | undefined if absent
m.has('a');            // boolean
m.delete('a');         // boolean (true if existed)
m.size;
for (const [k, v] of m) { }          // entries; [k,v] order
m.forEach((v, k) => { });            // CAREFUL: value FIRST, key second
[...m.keys()]; [...m.values()]; [...m.entries()];
const n = m.get('x') ?? 0;           // default when missing
```

`get-or-create` — insert a default when absent, then mutate it (the `entry().or_insert_with()` move):

```ts
// inline, for a counter:  bump count for k
m.set(k, (m.get(k) ?? 0) + 1);

// helper, when the value is a container you then mutate:
function getOrCreate<K, V>(m: Map<K, V>, k: K, make: () => V): V {
  let v = m.get(k);
  if (v === undefined) { v = make(); m.set(k, v); }
  return v;
}
getOrCreate(buckets, k, () => [] as string[]).push(item);   // append into per-key array
// NOTE: make() must RETURN the value — `() => 0`, not `() => {0}` (a block returns void).
```

## Set

```ts
const s = new Set<string>();
s.add('x'); s.has('x'); s.delete('x'); s.size;
[...s];                              // to array
```

## Spread `[...]` — iterator/iterable → array (your `.collect::<Vec<_>>()`)

`map.entries()` / `.keys()` / `.values()` return a **lazy one-shot iterator**, NOT an array — no
`.sort`/`.map`/`.slice`/`.length`. Spread (or `Array.from`) drains it into a real array first.

```ts
counts.entries();              // MapIterator — only .next(); .sort is NOT a function
[...counts.entries()];         // [[k,v], …]  real array → .sort/.map/.slice work
[...counts];                   // SAME (a Map iterates as entries)
[...counts.keys()];            // just keys     [...counts.values()];  // just values
Array.from(counts.entries());  // identical, non-spread spelling
[...'hi'];                     // ['h','i']   any iterable: string/Set/Map/generator
const merged = [...a, ...b];   // concat arrays     { ...o1, ...o2 }  // merge objects
fn(...args);                   // spread as call arguments
```

## Arrays / sorting (the #1 trap)

```ts
[3,10,2].sort();                     // ['10','2','3']  ← stringifies! almost never what you want
[3,10,2].sort((a,b) => a - b);       // [2,3,10]  numeric asc
arr.sort((a,b) => b - a);            // desc
// multi-key: by count desc, then name asc
entries.sort((a,b) => b.count - a.count || a.name.localeCompare(b.name));
arr.map(x => x*2); arr.filter(x => x>0); arr.reduce((acc,x) => acc+x, 0);
arr.find(x => x.id===3); arr.some(...); arr.every(...);
arr.slice(0, n);                     // first n (non-mutating)
```

## `for...of` vs `for...in` (Rust `for` trap)

```ts
for (const x of [10, 20]) { }   // VALUES → 10, 20          ← use this
for (const k in [10, 20]) { }   // string INDICES → "0","1"  ← almost never what you want
for (const c of "hi") { }       // chars: "h","i"
for (const [k, v] of map) { }   // entries
for (const [i, x] of arr.entries()) { }   // when you need index + value
```
- `of` = values of any iterable (array/string/Map/Set). Default choice.
- `in` = enumerable **keys as strings** (+ inherited). On arrays gives `"0"`,`"1"`… → `i + 1` becomes `"01"`. Reserve for plain objects, prefer `Object.keys()`.

## Strings

```ts
s.split('/'); s.startsWith('pre'); s.includes('x'); s.slice(1); s.toUpperCase();
`${key}(${value})`;                  // template literal — common output format
'b'.localeCompare('a');              // >0 ; use for sort tiebreakers
```

## null / undefined (your Option)

```ts
x?.y?.z                              // optional chaining
a ?? b                               // b only if a is null/undefined (0 and '' pass through)
if (v === undefined) { }
const got = m.get(k); if (got === undefined) return null;
```

## Composite keys — no struct equality

Objects compare by identity, not value. To key a Map by a pair, serialize:

```ts
const key = `${x},${y}`;             // or JSON.stringify([x,y])
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
structuredClone(obj);                // deep clone (Node 17+); works on Maps/arrays/objects
new Map(oldMap);                     // SHALLOW copy of a map
// deep clone nested map manually:
const copy = new Map([...m].map(([k, inner]) => [k, new Map(inner)]));
```

## TTL / timestamps (Level 3 pattern)

```ts
// record alive at `now` iff  setAt <= now < setAt + ttl   (no ttl => forever)
const alive = ttl === undefined ? now >= setAt : now >= setAt && now < setAt + ttl;
```

## Gotchas list

- `sort()` without comparator stringifies.
- `forEach((value, key))` — value is first.
- `typeof null === 'object'`, `typeof [] === 'object'` — use `Array.isArray`.
- Integer math: `Math.floor(a / b)`; no auto truncation.
- `Map` vs object: `m.get(k)` vs `obj[k]` — don't mix.
- `for...in` yields string keys/indices, not values — use `for...of`; on arrays `in` gives "0","1"…
