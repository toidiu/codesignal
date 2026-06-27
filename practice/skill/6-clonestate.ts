// Skill 6 — Deep clone of nested state (the heart of Level 4 backup/restore).
// Implement, then run:  make skill6
import { test, run, assert } from '../_harness';

// Deep-clone a nested map so edits to the copy don't affect the original.
export function cloneState(
  state: Map<string, Map<string, string>>,
): Map<string, Map<string, string>> {
  throw new Error('TODO: cloneState');
}

test('cloneState is a deep copy', () => {
  const s = new Map([['rec', new Map([['f', '1']])]]);
  const c = cloneState(s);
  c.get('rec')!.set('f', '999');
  assert.strictEqual(s.get('rec')!.get('f'), '1'); // original untouched
});

run();
