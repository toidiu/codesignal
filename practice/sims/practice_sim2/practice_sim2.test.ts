import { test, run, assert } from '../../_harness';
// Warm-up sim. Imports the full chain (level4 extends … extends level1).
// Implement level1.ts first; later levels throw TODO until you reach them.
import { PageViews } from './level4';

// ---------------- Level 1 ----------------
test('L1: view / views', () => {
  const pv = new PageViews();
  pv.view('home');
  pv.view('home');
  pv.view('about');
  assert.strictEqual(pv.views('home'), 2);
  assert.strictEqual(pv.views('about'), 1);
  assert.strictEqual(pv.views('missing'), 0);
});

// ---------------- Level 2 ----------------
test('L2: topPages by views desc, ties by name asc', () => {
  const pv = new PageViews();
  pv.view('home');
  pv.view('home');
  pv.view('about');
  pv.view('blog'); // ties about at 1 -> about first by name

  assert.deepStrictEqual(pv.topPages(2), ['home(2)', 'about(1)']);
  assert.deepStrictEqual(pv.topPages(3), ['home(2)', 'about(1)', 'blog(1)']);
});

// ---------------- Level 3 ----------------
test('L3: viewAt / viewsSince on a timeline', () => {
  const pv = new PageViews();
  pv.viewAt('home', 10);
  pv.viewAt('home', 20);
  pv.viewAt('home', 30);

  assert.strictEqual(pv.views('home'), 3); // L1 total still works over the timeline
  assert.strictEqual(pv.viewsSince('home', 20), 2); // timestamps 20, 30
  assert.strictEqual(pv.viewsSince('home', 31), 0);
  assert.strictEqual(pv.viewsSince('missing', 0), 0);
});

test('L3: L1 view() delegates onto the timeline at t=0', () => {
  const pv = new PageViews();
  pv.view('about'); // recorded at t=0
  assert.strictEqual(pv.viewsSince('about', 0), 1);
  assert.strictEqual(pv.views('about'), 1);
});

// ---------------- Level 4 ----------------
test('L4: topPagesSince ranks views in a time window', () => {
  const pv = new PageViews();
  pv.viewAt('home', 5); // before the window
  pv.viewAt('home', 15);
  pv.viewAt('about', 15);
  pv.viewAt('about', 25);
  pv.viewAt('blog', 25);

  // since=10 -> home:1 (15), about:2 (15,25), blog:1 (25)
  // about(2), then blog(1) & home(1) tie -> name asc
  assert.deepStrictEqual(pv.topPagesSince(10, 2), ['about(2)', 'blog(1)']);
  assert.deepStrictEqual(pv.topPagesSince(10, 10), ['about(2)', 'blog(1)', 'home(1)']);
  assert.deepStrictEqual(pv.topPagesSince(100, 5), []); // nothing in window
});

run();
