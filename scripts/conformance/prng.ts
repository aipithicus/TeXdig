/** Deterministic xorshift32 used by every seeded conformance family. */
export class XorShift32 {
  private state: number;

  public constructor(seed: number) {
    if (!Number.isSafeInteger(seed) || seed < 1 || seed > 0xff_ff_ff_ff) {
      throw new RangeError("xorshift32 seed must be a non-zero uint32");
    }
    this.state = seed >>> 0;
  }

  public next(): number {
    let state = this.state;
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    this.state = state >>> 0;
    return this.state;
  }
}
