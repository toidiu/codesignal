// Tiny zero-dependency test runner. No framework needed.
//   import { test, run, assert } from '../_harness';
//   test('name', () => { assert.strictEqual(...) });
//   run();   // call once at the bottom of the file
import assert from 'node:assert';

type TestFn = () => void;
const tests: { name: string; fn: TestFn }[] = [];

export function test(name: string, fn: TestFn): void {
  tests.push({ name, fn });
}

export { assert };

export function run(): void {
  let pass = 0;
  let fail = 0;
  for (const t of tests) {
    try {
      t.fn();
      console.log(`  ✓ ${t.name}`);
      pass++;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log(`  ✗ ${t.name}`);
      console.log(`      ${msg.split('\n')[0]}`);
      fail++;
    }
  }
  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail > 0) process.exit(1);
}
