# Skill Drills (do these FIRST)

Build TS muscle memory for the exact primitives the sims use. Each skill is its **own file** under
`skill/` — implement the stub, then run it. The file's tests tell you when it's green.

```bash
make skill        # run ALL skills, reports passing/failing per skill
make skill1       # run just skill 1   (skill2, skill3, ... likewise)

# or directly:
npx ts-node --project practice/tsconfig.json practice/skill/1-wordcount.ts
```

Work top to bottom — they escalate and mirror the real-test mechanics.

| # | File | Skill | Shows up in |
| --- | --- | --- | --- |
| 1 | `1-wordcount.ts` | count into a Map (`get ?? 0`) | every level 1 |
| 2 | `2-topn.ts` | sort by count desc, name asc (tiebreak) | every level 2 |
| 3 | `3-prefixkeys.ts` | prefix filter + sort | sim1/sim3 level 2 |
| 4 | `4-safeget.ts` | `undefined` → default (your `Option`) | every level 1 |
| 5 | `5-isalive.ts` | TTL window math | every level 3 |
| 6 | `6-clonestate.ts` | deep clone nested Map | every level 4 |
| 7 | `7-counter.ts` | stateful class + ranking | the sim skeleton |
| 8 | `8-generics.ts` | generics: `<T>`, `<K>`, generic over `Map` | aggregation helpers |
| 9 | `9-optresult.ts` | `Option<T>` / `Result<T,E>` tagged unions (Rust-style) | error/optional handling |
| 10 | `10-strings.ts` | split / prefix / `localeCompare` / `"k(v)"` output | every level 2 |
| 11 | `11-arrays.ts` | map/filter/reduce/find + non-mutating sort | every level |
| 12 | `12-records.ts` | nested-map records, create-if-missing | the sim skeleton |
| 13 | `13-regex.ts` | regex: test / match / replace / capture groups | parsing inputs |
| 14 | `14-dates.ts` | `Date` + epoch millis, ttl boundary | every level 3 |
| 15 | `15-json.ts` | `JSON` stringify/parse, clone, composite keys | level 4 / keys |
| 16 | `16-controlflow.ts` | try / catch / throw + custom `Error` | error handling |
| 17 | `17-classextends.ts` | `extends` / `super` / override | modeling entities |
| 18 | `18-linkedlist.ts` | linked list: build / reverse / fast-slow middle | pointer problems |
| 19 | `19-heap.ts` | binary min-heap: push / pop / peek, top-K | top-K, scheduling |
| 20 | `20-queue.ts` | FIFO queue (head index) + BFS traversal | graph/tree BFS |
| 21 | `21-interfaces.ts` | `interface`, `implements`, structural typing | modeling contracts |
| 22 | `22-binarysearch.ts` | binary search: array / lower-bound / on the answer | sorted data, "minimize max" |
| 23 | `23-backtracking.ts` | DFS+undo: subsets / permutations / combinations | exhaustive search |
| 24 | `24-twopointer.ts` | converging ends + slow/fast on sorted data | sorted arrays, strings |

When `make skill` reports all 24 passing, you've touched every core mechanic. Then start `sims/sim1`.

## Stretch (optional)

- Re-implement `topN` with a single `reduce`.
- Write `isAlive` as a one-liner.
- Confirm `Counter.top` breaks ties alphabetically with your own asserts.
