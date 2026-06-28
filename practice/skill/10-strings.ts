// Skill 10 — Strings (split, prefix, includes, template output, localeCompare).
// Implement, then run:  make skill10
import { test, run, assert } from '../_harness';

// formatPairs: "key(value)" for each entry, sorted by key ASC, joined with ", ".
//   formatPairs(Map{b:2, a:1}) -> "a(1), b(2)"
export function formatPairs(m: Map<string, number>): string {
  throw new Error('TODO: formatPairs');
}

// pathHead: first segment of a '/'-delimited path.
//   pathHead('app/db/x') -> 'app'
export function pathHead(path: string): string {
  throw new Error('TODO: pathHead');
}

// keysWithPrefix: keys that start with `prefix`, sorted ASC.
//   keysWithPrefix(Map{'app/x':1,'db/y':1,'app/z':1}, 'app/') -> ['app/x','app/z']
export function keysWithPrefix(m: Map<string, number>, prefix: string): string[] {
  throw new Error('TODO: keysWithPrefix');
}

test('formatPairs builds sorted "k(v)" string', () => {
  assert.strictEqual(formatPairs(new Map([['b', 2], ['a', 1]])), 'a(1), b(2)');
});

test('pathHead returns first segment', () => {
  assert.strictEqual(pathHead('app/db/x'), 'app');
  assert.strictEqual(pathHead('solo'), 'solo');
});

test('keysWithPrefix filters and sorts', () => {
  const m = new Map([['app/x', 1], ['db/y', 1], ['app/z', 1]]);
  assert.deepStrictEqual(keysWithPrefix(m, 'app/'), ['app/x', 'app/z']);
});

run();
