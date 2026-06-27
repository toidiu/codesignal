# CodeSignal 4-Level Format — Reference

One evolving spec, 4 levels, 90 min. You implement a small in-memory service. Each level adds
operations and usually a **new dimension** that forces you to refactor earlier code. Pass all
tests in a level to unlock the next. Graded on tests passed, not code quality.

## The typical shape of each level

| Level | What it adds | Typical work | Time |
| --- | --- | --- | --- |
| **1** | Core entities + basic ops | create / set / get / delete on a `Map`. Get it green fast, don't over-build. | short |
| **2** | Querying over existing data | filter / scan-by-prefix / aggregate / **top-N sorted** with tiebreakers. | short–med |
| **3** | A new axis: **time (timestamps + TTL/expiry)** | every op gains a `timestamp` param; records expire; you **refactor L1/L2** to be time-aware (often by delegating old methods to new timestamped ones). | med–long |
| **4** | **History / snapshots**: backup-restore, versioning, rollback, merge | clone state, store/rebase by timestamp, query "state as of time T". | longest |

## Recurring mechanics to expect

- **Ranking**: "return the top N by some count, ties broken alphabetically." (sort with `b.n - a.n || a.name.localeCompare(b.name)`)
- **Prefix / hierarchical keys**: `"dir/sub/file"`, scan by prefix.
- **TTL window**: alive iff `setAt <= now < setAt + ttl`; no ttl = forever.
- **Re-basing time on restore**: a restored record keeps its *remaining* ttl, re-anchored to the restore time.
- **Formatted string outputs**: e.g. `"key(value)"`, comma-joined lists.

## Strategy

1. **Central state object/class.** One place holds all `Map`s so later levels extend, not rewrite.
2. **L1 fast, don't gild it.** Move on the moment tests pass.
3. **Design L1/L2 anticipating time.** When L3 hits, make old methods call the timestamped versions with a default time — that's the intended refactor, not a rewrite.
4. **Partial credit counts.** Get easy test cases in a level passing before chasing edge cases.
5. **Read all of the current level's spec before coding it** — but you can't see the next level, so don't over-engineer for a guess.

## The four archetype problems (in this kit)

- **sim1 — In-memory key/value store** (set/get/delete → prefix scan → TTL → backup/restore)
- **sim2 — Banking system** (accounts → spend rankings → scheduled/timestamped payments → merge & balance history)
- **sim3 — Cloud file storage** (files → largest-by-prefix → users with capacity → merge users)
- **sim4 — Record database** (records/fields → filter → field TTL → query at timestamp)
