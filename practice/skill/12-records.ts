// Skill 12 — Nested maps as records ("Map of entities, each a Map of fields").
// This is the sim skeleton: the create-if-missing (computeIfAbsent) pattern.
// Implement, then run:  make skill12
import { test, run, assert } from '../_harness';

export class Records {
  private data = new Map<string, Map<string, string>>();

  // set(id, field, value): upsert. Create the inner Map for `id` if absent, then set the field.
  set(id: string, field: string, value: string): void {
    // check if exists
    let inner = this.data.get(id);

    if (inner === undefined) {
      // insert default
      this.data.set(id, new Map());
    }

    // insert value
    this.data.get(id)!.set(field, value);
  }

  // get(id, field): the value, or undefined if the entity or field is missing.
  get(id: string, field: string): string | undefined {
    return this.data.get(id)?.get(field);
  }

  // fields(id): an entity's field names, sorted ASC; [] if the entity is unknown.
  fields(id: string): string[] {
    let inner = this.data.get(id);

    if (inner === undefined) {
      return [];
    }

    let keys: string[] = [...inner.keys()];
    keys = keys.sort((a, b) => a.localeCompare(b));

    return keys;
  }
}

test('set/get upserts across two ids', () => {
  const r = new Records();
  r.set('u1', 'name', 'ada');
  r.set('u1', 'city', 'london');
  r.set('u2', 'name', 'alan');
  assert.strictEqual(r.get('u1', 'name'), 'ada');
  assert.strictEqual(r.get('u2', 'name'), 'alan');
  assert.strictEqual(r.get('u1', 'missing'), undefined);
  assert.strictEqual(r.get('nobody', 'name'), undefined);
});

test('set overwrites; fields lists sorted names', () => {
  const r = new Records();
  r.set('u1', 'name', 'ada');
  r.set('u1', 'name', 'ADA'); // overwrite
  r.set('u1', 'city', 'london');
  assert.strictEqual(r.get('u1', 'name'), 'ADA');
  assert.deepStrictEqual(r.fields('u1'), ['city', 'name']);
  assert.deepStrictEqual(r.fields('nobody'), []);
});

run();
