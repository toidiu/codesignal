// Skill 21 — Interfaces: declare a contract, implement it, program to the type.
// Implement the stubs, then run:  make skill21
import { test, run, assert } from '../_harness';

// A contract: any Shape can report its area and name itself.
export interface Shape {
  readonly kind: string;
  area(): number;
}

// Rect implements Shape.
export class Rect implements Shape {
  readonly kind = 'rect';

  constructor(private w: number, private h: number) {}

  area(): number {
    throw new Error('TODO: Rect.area');
  }
}

// Circle implements Shape.
export class Circle implements Shape {
  readonly kind = 'circle';

  constructor(private r: number) {}

  area(): number {
    throw new Error('TODO: Circle.area');
  }
}

// Program to the interface, not the class: sum the area of any Shape[].
export function totalArea(shapes: Shape[]): number {
  throw new Error('TODO: totalArea');
}

// Structural typing: this accepts ANY object with a numeric `area()`,
// even a plain object literal — no `implements` needed. Return its area
// rounded to the nearest integer.
export function roundedArea(s: { area(): number }): number {
  throw new Error('TODO: roundedArea');
}

test('Rect / Circle implement Shape', () => {
  assert.strictEqual(new Rect(2, 3).area(), 6);
  assert.strictEqual(Math.round(new Circle(1).area()), 3); // ~3.14159
});

test('totalArea programs to the interface', () => {
  const shapes: Shape[] = [new Rect(2, 3), new Rect(1, 1)];
  assert.strictEqual(totalArea(shapes), 7);
});

test('roundedArea accepts a structural match (no implements)', () => {
  assert.strictEqual(roundedArea({ area: () => 9.6 }), 10);
});

run();
