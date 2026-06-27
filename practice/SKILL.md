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

When `make skill` reports all 7 passing, you've touched every core mechanic. Then start `sims/sim1`.

## Stretch (optional)

- Re-implement `topN` with a single `reduce`.
- Write `isAlive` as a one-liner.
- Confirm `Counter.top` breaks ties alphabetically with your own asserts.
