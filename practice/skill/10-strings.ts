// Skill 10 — Strings (split, prefix, includes, template output, localeCompare).
// Implement, then run:  make skill10
import { test, run, assert } from '../_harness';

// formatPairs: "key(value)" for each entry, sorted by key ASC, joined with ", ".
//   formatPairs(Map{b:2, a:1}) -> "a(1), b(2)"
export function formatPairs(m: Map<string, number>): string {
  const ret = [...m.entries()]
    .sort((a, b) => (
      a[0].localeCompare(b[0])
    ))
    .map(([k, v]) => `${k}(${v})`)
    .join(", ");

  return ret;
}

// pathHead: first segment of a '/'-delimited path.
//   pathHead('app/db/x') -> 'app'
export function pathHead(path: string): string {
  let split = path.split('/');
  return split[0];
}

// keysWithPrefix: keys that start with `prefix`, sorted ASC.
//   keysWithPrefix(Map{'app/x':1,'db/y':1,'app/z':1}, 'app/') -> ['app/x','app/z']
export function keysWithPrefix(m: Map<string, number>, prefix: string): string[] {
  const keys = m.keys();
  // console.log(keys);

  let ret = [...keys]
  .filter((a) =>
    a.startsWith(prefix)
  );
  // console.log(ret);

  ret = ret.sort((a, b) =>
    a.localeCompare(b)
  );

  return ret;
}

test('formatPairs builds sorted "k(v)" string', () => {
  assert.strictEqual(formatPairs(new Map([['b', 2], ['a', 1]])), 'a(1), b(2)');
});

test('pathHead returns first segment', () => {
  assert.strictEqual(pathHead('app/db/x'), 'app');
  assert.strictEqual(pathHead('solo'), 'solo');
  assert.strictEqual(pathHead(''), '');
});

test('keysWithPrefix filters and sorts', () => {
  const m = new Map([['app/x', 1], ['db/y', 1], ['app/z', 1]]);
  assert.deepStrictEqual(keysWithPrefix(m, 'app/'), ['app/x', 'app/z']);
});

run();
