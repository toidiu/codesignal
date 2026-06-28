// Skill 13 — Regex (test / match / replace / capture groups).
// Implement, then run:  make skill13
import { test, run, assert } from '../_harness';

// isWord: true iff the whole string is one or more ASCII letters/digits/underscore.
//   isWord('abc_1') -> true ; isWord('a b') -> false
export function isWord(s: string): boolean {
  throw new Error('TODO: isWord');
}

// firstNumber: the first run of digits as a number, or undefined if none.
//   firstNumber('order 42 of 99') -> 42
export function firstNumber(s: string): number | undefined {
  throw new Error('TODO: firstNumber');
}

// maskDigits: replace every digit with '#'.
//   maskDigits('a1b2') -> 'a#b#'
export function maskDigits(s: string): string {
  throw new Error('TODO: maskDigits');
}

// parseKV: split "key=value" into a tuple via a capture group; undefined if no match.
//   parseKV('host=localhost') -> ['host', 'localhost']
export function parseKV(s: string): [string, string] | undefined {
  throw new Error('TODO: parseKV');
}

test('isWord matches the whole string', () => {
  assert.strictEqual(isWord('abc_1'), true);
  assert.strictEqual(isWord('a b'), false);
  assert.strictEqual(isWord(''), false);
});

test('firstNumber extracts leading digit run', () => {
  assert.strictEqual(firstNumber('order 42 of 99'), 42);
  assert.strictEqual(firstNumber('none here'), undefined);
});

test('maskDigits replaces all digits', () => {
  assert.strictEqual(maskDigits('a1b2'), 'a#b#');
});

test('parseKV uses capture groups', () => {
  assert.deepStrictEqual(parseKV('host=localhost'), ['host', 'localhost']);
  assert.strictEqual(parseKV('nope'), undefined);
});

run();
