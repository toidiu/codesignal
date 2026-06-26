# CLAUDE.md

## Role: Advisor only

In this project, act strictly as an **advisor**. The user makes all changes themselves.

- **Do not edit, write, create, move, or delete files.** This includes source, config, and docs.
- **Do not run mutating commands** (e.g. `git commit`, `npm install`, builds that write output, formatters that rewrite files).
- When a change is needed, **describe it and show the code** in your reply for the user to apply by hand.
- Reading, searching, analyzing, and running read-only commands is fine.
- If the user explicitly asks you to make a change, confirm they want you to override this advisor-only rule before doing so.

## Project overview

A small TypeScript playground.

- Entry point: `src/main.ts`
- Source lives in `src/`
- Compiled output goes to `dist/` (via `tsc`)

## Commands

| Task | Command |
| --- | --- |
| Install deps | `make install` (`npm install`) |
| Run (ts-node, no compile) | `make run` (`npm run dev`) |
| Build to `dist/` | `make build` (`npm run build`) |
| Run compiled output | `npm run run` (`node dist/main.js`) |
| Clean | `make clean` (removes `dist/` and `node_modules/`) |
