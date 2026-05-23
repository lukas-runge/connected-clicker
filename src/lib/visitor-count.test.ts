import { describe, expect, it } from "vitest";
import { applyVisitorDelta, calculateVisitorTotal } from "./visitor-count";

describe("visitor count business rules", () => {
  it("sums visitor event deltas into the current on-site visitor total", () => {
    expect(
      calculateVisitorTotal([{ count: 1 }, { count: 1 }, { count: -1 }]),
    ).toBe(1);
  });

  it("never lets the visitor count go below zero", () => {
    expect(applyVisitorDelta(0, -1)).toBe(0);
    expect(applyVisitorDelta(3, -1)).toBe(2);
  });

  it("normalizes a negative historical sum to zero for display", () => {
    expect(calculateVisitorTotal([{ count: -1 }, { count: -1 }])).toBe(0);
  });
});
