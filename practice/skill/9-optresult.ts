// Skill 9 — Option<T> & Result<T,E> (Rust's enums modeled as TS tagged unions).
// TS has no built-in Option/Result — make a discriminated union and narrow on `kind`.
// Implement, then run:  make skill9
import { test, run, assert } from '../_harness';

export type Option<T> = { kind: 'some'; value: T } | { kind: 'none' };
export type Result<T, E> = { kind: 'ok'; value: T } | { kind: 'err'; error: E };

// Constructors
export function some<T>(value: T): Option<T> {
  return { kind: "some", value: value };
}
export function none<T>(): Option<T> {
  return { kind: "none" };
}
export function ok<T, E>(value: T): Result<T, E> {
  return { kind: "ok", value: value };
}
export function err<T, E>(error: E): Result<T, E> {
  return { kind: "err", error: error };
}

// unwrapOr: the inner value if Some, else the fallback. Narrow on o.kind.
export function unwrapOr<T>(o: Option<T>, fallback: T): T {
  switch (o.kind) {
    case "some": return o.value;
    case "none": return fallback;
    default: {
      let a: never = o;
      return a;
    }
  }
}

// parseIntResult: Ok(n) on a valid integer, else Err(message). Result in action.
export function parseIntResult(s: string): Result<number, string> {
  const n = Number(s);
  if (Number.isInteger(n)) {
    return ok(n);
  } else {
    return err("unable to parse int");
  }
}

test('some / none / unwrapOr', () => {
  assert.deepStrictEqual(some(5), { kind: 'some', value: 5 });
  assert.deepStrictEqual(none<number>(), { kind: 'none' });
  assert.strictEqual(unwrapOr(some(5), 0), 5);
  assert.strictEqual(unwrapOr(none<number>(), 0), 0);
});

test('ok / err / parseIntResult', () => {
  assert.deepStrictEqual(ok<number, string>(1), { kind: 'ok', value: 1 });
  assert.deepStrictEqual(err<number, string>('bad'), { kind: 'err', error: 'bad' });
  assert.deepStrictEqual(parseIntResult('42'), { kind: 'ok', value: 42 });
  assert.strictEqual(parseIntResult('nope').kind, 'err');
});

run();
