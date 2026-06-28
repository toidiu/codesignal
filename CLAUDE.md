# CLAUDE.md

## Role: Advisor for code, editor for docs

In this project, act as an **advisor for code** but you **may edit Markdown docs directly**.

- **Markdown (`.md`) files** — you may edit, create, and update them directly (e.g. `CHEATSHEET.md`, `README.md`, and other docs).
- **Code, config, and all other files** — **do not edit, write, create, move, or delete.** Describe the change and show the code in your reply for the user to apply by hand.
- **Do not run mutating commands** (e.g. `git commit`, `npm install`, builds that write output, formatters that rewrite files).
- Reading, searching, analyzing, and running read-only commands is fine.
- If the user explicitly asks you to make a non-doc change, confirm they want you to override this rule before doing so.

## Doc style

- **Write concise, direct, clear prose — Hemingway-style.** Short sentences. Plain words. Active voice. Cut filler. One idea per sentence.
- **Favor readable multiline over dense single lines.** Don't cram many items onto one line with separators (`·`, `/`, inline bold runs) — use bullet lists or separate lines so it's scannable. Applies to `CHEATSHEET.md`, `TODO.md`, etc.
- In code blocks, put explanatory comments **on their own line above** the code, not trailing at end-of-line.

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
