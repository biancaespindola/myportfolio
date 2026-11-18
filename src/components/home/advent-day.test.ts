import { describe, expect, it } from "vitest";
import { openableDay } from "./advent-day";

describe("openableDay", () => {
  it.each([
    ["2026-11-30", 0],
    ["2026-12-01", 1],
    ["2026-12-10", 10],
    ["2026-12-24", 24],
    ["2026-12-31", 24],
    ["2027-01-02", 0],
  ])("%s → %i", (date, day) => {
    expect(openableDay(new Date(`${date}T12:00:00`))).toBe(day);
  });
});
