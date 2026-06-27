# TS Assessment Practice

A self-contained practice kit for the CodeSignal 4-level coding screen. Standard-library
TypeScript only, with a tiny built-in test runner (no jest/vitest).

## Order of work

1. **Skills first** — `SKILL.md`. Implement each file in `skill/` until `make skill` is all green.
2. **Cheatsheet** — keep `CHEATSHEET.md` open while you work; add to it as you learn.
3. **Sims** — `sims/sim1..4`. Implement the stub `solution.ts` to make each level's tests pass.
4. **Track everything** in `../todo.md`.

## Running tests (via make)

```bash
make skill      # run ALL skill drills, report passing/failing per skill
make skill3     # run a single skill drill
make sim1       # run a simulation's tests (sim2..4 once wired)
```

Or directly, without make:

```bash
npx ts-node --project practice/tsconfig.json practice/skill/1-wordcount.ts
npx ts-node --project practice/tsconfig.json practice/sims/sim1/sim1.test.ts
```

A green run prints `N passed, 0 failed`. Stubs throw `TODO`, so everything starts red — that's expected.

## How the real screen works (reminder)

- 4 levels, one evolving spec, 90 min. Pass all tests in a level to advance.
- Judged on passing tests fast, **not** code quality. Don't gold-plate.
- Later levels add a new dimension (timestamps/TTL, history) and make you **refactor** earlier code.
- During the real test: no LLMs/Copilot. This kit is for **practice beforehand**.
