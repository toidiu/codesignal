# Skill solutions (9–24)

Reference answers for the skills still open. Copy each function body into the
matching `practice/skill/N-*.ts` file.

These are written to pass the tests in each file. Not a substitute for doing the
drill — read the answer only after you've taken a real swing.

---

## 9 — `9-optresult.ts`

Two fixes from the audit: `unwrapOr` is already correct; `parseIntResult` had the
wrong variable in `Number.isInteger`.

```ts
export function parseIntResult(s: string): Result<number, string> {
  // Number() is strict (NaN on junk); parseInt is lenient ('42abc' -> 42)
  const n = Number(s);
  // check the parsed NUMBER n, not the string s
  if (Number.isInteger(n)) {
    return ok(n);
  } else {
    return err('not an integer');
  }
}
```

Then uncomment the `'err'` assertion (the last line of the second test).

---

## 10 — `10-strings.ts`

`formatPairs` and `pathHead` are already correct. Fix `keysWithPrefix`: the filter
callback used a block body with no `return`, so it kept nothing.

```ts
export function keysWithPrefix(m: Map<string, number>, prefix: string): string[] {
  // concise body -> the expression IS the return (no braces)
  return [...m.keys()]
    .filter((k) => k.startsWith(prefix))
    .sort((a, b) => a.localeCompare(b));
}
```

Drop the `console.log` lines too.

---

## 11 — `11-arrays.ts`

```ts
export function sumPositive(nums: number[]): number {
  return nums.filter((n) => n > 0).reduce((acc, n) => acc + n, 0);
}

export function pluckIds(items: { id: number; name: string }[]): number[] {
  return items.map((item) => item.id);
}

export function firstOver(nums: number[], limit: number): number | undefined {
  // find returns undefined when nothing matches
  return nums.find((n) => n > limit);
}

export function nLargest(nums: number[], n: number): number[] {
  // copy first — sort mutates in place
  return [...nums].sort((a, b) => b - a).slice(0, n);
}
```

---

## 12 — `12-records.ts`

```ts
set(id: string, field: string, value: string): void {
  // create-if-missing, then set the field
  let rec = this.data.get(id);
  if (rec === undefined) {
    rec = new Map();
    this.data.set(id, rec);
  }
  rec.set(field, value);
}

get(id: string, field: string): string | undefined {
  // optional chaining short-circuits to undefined if the id is unknown
  return this.data.get(id)?.get(field);
}

fields(id: string): string[] {
  const rec = this.data.get(id);
  if (rec === undefined) return [];
  return [...rec.keys()].sort();
}
```

---

## 13 — `13-regex.ts`

```ts
export function isWord(s: string): boolean {
  // \w is [A-Za-z0-9_]; anchors force the WHOLE string; + rejects ''
  return /^\w+$/.test(s);
}

export function firstNumber(s: string): number | undefined {
  const m = s.match(/\d+/);
  return m ? Number(m[0]) : undefined;
}

export function maskDigits(s: string): string {
  // g flag = replace every digit, not just the first
  return s.replace(/\d/g, '#');
}

export function parseKV(s: string): [string, string] | undefined {
  // two capture groups; m[1] and m[2] are the key and value
  const m = s.match(/^([^=]+)=(.*)$/);
  return m ? [m[1], m[2]] : undefined;
}
```

---

## 14 — `14-dates.ts`

```ts
export function epochMillis(iso: string): number {
  // Date.parse returns millis since the Unix epoch (NaN on bad input)
  return Date.parse(iso);
}

export function addSeconds(iso: string, secs: number): string {
  // toISOString always renders UTC with millis + trailing Z
  return new Date(Date.parse(iso) + secs * 1000).toISOString();
}

export function isExpired(setAtMs: number, ttlSecs: number, nowMs: number): boolean {
  // boundary counts as expired -> >=
  return nowMs >= setAtMs + ttlSecs * 1000;
}
```

---

## 15 — `15-json.ts`

```ts
export function clone<T>(value: T): T {
  // deep clone for JSON-safe values; loses Maps/undefined/functions
  return JSON.parse(JSON.stringify(value));
}

export function pairKey(x: number, y: number): string {
  // '[1,2]' — stable string key for a pair
  return JSON.stringify([x, y]);
}

export function tryParse(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return undefined;
  }
}
```

---

## 16 — `16-controlflow.ts`

```ts
export class NotFoundError extends Error {
  constructor(key: string) {
    super(`key not found: ${key}`);
    // set name so instanceof checks and .name read correctly
    this.name = 'NotFoundError';
  }
}

export function requireKey(m: Map<string, number>, k: string): number {
  const v = m.get(k);
  if (v === undefined) throw new NotFoundError(k);
  return v;
}

export function safeRequire(m: Map<string, number>, k: string, fallback: number): number {
  try {
    return requireKey(m, k);
  } catch (e) {
    // only swallow NotFoundError; re-throw anything else
    if (e instanceof NotFoundError) return fallback;
    throw e;
  }
}
```

---

## 17 — `17-classextends.ts`

```ts
export class Account {
  protected balance: number;

  constructor(initial: number) {
    this.balance = initial;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  describe(): string {
    return `balance=${this.balance}`;
  }
}

export class Savings extends Account {
  private rate: number;

  constructor(initial: number, rate: number) {
    // super() must come before any use of `this`
    super(initial);
    this.rate = rate;
  }

  addInterest(): void {
    // reuse the inherited deposit()
    this.deposit(this.balance * this.rate);
  }

  describe(): string {
    // extend the base output, don't replace it
    return `${super.describe()} rate=${this.rate}`;
  }
}
```

---

## 18 — `18-linkedlist.ts`

```ts
export function fromArray(nums: number[]): ListNode | null {
  let head: ListNode | null = null;
  // build back-to-front so each node points at the one already built
  for (let i = nums.length - 1; i >= 0; i--) {
    head = new ListNode(nums[i], head);
  }
  return head;
}

export function toArray(head: ListNode | null): number[] {
  const out: number[] = [];
  for (let cur = head; cur !== null; cur = cur.next) {
    out.push(cur.val);
  }
  return out;
}

export function reverse(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let cur = head;
  while (cur !== null) {
    // save next, flip the link, advance both pointers
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}

export function middle(head: ListNode | null): ListNode | null {
  // fast moves 2x; when it falls off, slow is at the (second) middle
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  return slow;
}
```

---

## 19 — `19-heap.ts`

```ts
export class MinHeap {
  private data: number[] = [];

  size(): number {
    return this.data.length;
  }

  peek(): number | undefined {
    return this.data[0];
  }

  push(x: number): void {
    this.data.push(x);
    // sift up: swap with parent while smaller
    let i = this.data.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.data[parent] <= this.data[i]) break;
      [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
      i = parent;
    }
  }

  pop(): number | undefined {
    const n = this.data.length;
    if (n === 0) return undefined;
    const top = this.data[0];
    const last = this.data.pop()!;
    if (n > 1) {
      // move last to root, then sift down to the smaller child
      this.data[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        let smallest = i;
        if (l < this.data.length && this.data[l] < this.data[smallest]) smallest = l;
        if (r < this.data.length && this.data[r] < this.data[smallest]) smallest = r;
        if (smallest === i) break;
        [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
        i = smallest;
      }
    }
    return top;
  }
}

export function kLargest(nums: number[], k: number): number[] {
  const h = new MinHeap();
  for (const x of nums) {
    h.push(x);
    // keep only the k largest: drop the smallest when over k
    if (h.size() > k) h.pop();
  }
  const out: number[] = [];
  while (h.size() > 0) out.push(h.pop()!);
  return out; // drained from a min-heap -> ascending
}
```

---

## 20 — `20-queue.ts`

```ts
export class Queue<T> {
  private data: T[] = [];
  private head = 0;

  size(): number {
    return this.data.length - this.head;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  enqueue(x: T): void {
    this.data.push(x);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    // advance head instead of Array.shift() (which is O(n))
    const x = this.data[this.head];
    this.head++;
    return x;
  }

  peek(): T | undefined {
    return this.isEmpty() ? undefined : this.data[this.head];
  }
}

export function bfsOrder(graph: Record<string, string[]>, start: string): string[] {
  const seen = new Set<string>([start]);
  const order: string[] = [];
  const q = new Queue<string>();
  q.enqueue(start);
  while (!q.isEmpty()) {
    const node = q.dequeue()!;
    order.push(node);
    // enqueue unseen neighbors in list order; mark seen on ENQUEUE
    for (const next of graph[node] ?? []) {
      if (!seen.has(next)) {
        seen.add(next);
        q.enqueue(next);
      }
    }
  }
  return order;
}
```

---

## 21 — `21-interfaces.ts`

```ts
export class Rect implements Shape {
  readonly kind = 'rect';
  constructor(private w: number, private h: number) {}
  area(): number {
    return this.w * this.h;
  }
}

export class Circle implements Shape {
  readonly kind = 'circle';
  constructor(private r: number) {}
  area(): number {
    return Math.PI * this.r * this.r;
  }
}

export function totalArea(shapes: Shape[]): number {
  // program to the interface: any Shape exposes area()
  return shapes.reduce((sum, s) => sum + s.area(), 0);
}

export function roundedArea(s: { area(): number }): number {
  // structural typing: any object with a numeric area() fits
  return Math.round(s.area());
}
```

---

## 22 — `22-binarysearch.ts`

```ts
export function search(nums: number[], target: number): number {
  // inclusive bounds [lo, hi]; loop while the window is non-empty
  let lo = 0;
  let hi = nums.length - 1;
  while (lo <= hi) {
    // (lo + hi) >> 1 floors the midpoint
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

export function lowerBound(nums: number[], target: number): number {
  // half-open [lo, hi); hi starts at length so the answer can be "past the end"
  let lo = 0;
  let hi = nums.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    // shrink from the left while elements are still too small
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

export function firstTrue(lo: number, hi: number, pred: (x: number) => boolean): number {
  // same shape as lowerBound, but the "is it big enough" test is the predicate
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (pred(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
```

`lowerBound` and `firstTrue` are the **same loop**. Once you see that
"find the leftmost true" is the real skill, every "minimize the max / smallest
feasible X" problem becomes a binary search where `pred(x)` answers "is X feasible?".

---

## 23 — `23-backtracking.ts`

Every backtracker is the same shape: **choose → recurse → undo**. The `path`
array is shared; push before recursing, pop after.

```ts
export function subsets(nums: number[]): number[][] {
  const res: number[][] = [];
  const path: number[] = [];
  function backtrack(start: number): void {
    // every node IS a subset — record it on the way down
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1); // i+1: never reuse an earlier element
      path.pop();       // undo before the next choice
    }
  }
  backtrack(0);
  return res;
}

export function permutations(nums: number[]): number[][] {
  const res: number[][] = [];
  const path: number[] = [];
  const used = new Array(nums.length).fill(false);
  function backtrack(): void {
    // only full-length paths count
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue; // skip what's already in the path
      used[i] = true;
      path.push(nums[i]);
      backtrack();
      path.pop();
      used[i] = false; // undo both the path and the used-flag
    }
  }
  backtrack();
  return res;
}

export function combinations(n: number, k: number): number[][] {
  const res: number[][] = [];
  const path: number[] = [];
  function backtrack(start: number): void {
    if (path.length === k) {
      res.push([...path]);
      return;
    }
    for (let i = start; i <= n; i++) {
      path.push(i);
      backtrack(i + 1); // increasing -> no permutation dupes
      path.pop();
    }
  }
  backtrack(1);
  return res;
}
```

- `res.push([...path])` — copy the path; pushing `path` itself stores a
  reference you'll mutate to `[]`.
- The `start` index (subsets/combinations) is how you avoid revisiting earlier
  elements; the `used[]` flag (permutations) is how you avoid reusing one.

---

## 24 — `24-twopointer.ts`

```ts
export function twoSumSorted(nums: number[], target: number): [number, number] | undefined {
  let i = 0;
  let j = nums.length - 1;
  while (i < j) {
    const sum = nums[i] + nums[j];
    if (sum === target) return [i, j];
    // too small -> need a bigger left; too big -> need a smaller right
    if (sum < target) i++;
    else j--;
  }
  return undefined;
}

export function isPalindrome(s: string): boolean {
  let i = 0;
  let j = s.length - 1;
  while (i < j) {
    if (s[i] !== s[j]) return false;
    i++;
    j--;
  }
  return true;
}

export function dedupeSorted(nums: number[]): number[] {
  if (nums.length === 0) return [];
  // keep the running last-unique in out; only append when it changes
  const out = [nums[0]];
  for (let f = 1; f < nums.length; f++) {
    if (nums[f] !== out[out.length - 1]) out.push(nums[f]);
  }
  return out;
}
```

The shared idea: **two indices that only move toward each other** (converging
ends) or **one chasing the other** (slow/fast). It turns many O(n²) scans into a
single O(n) pass — but only because the data is sorted.
