import { describe, expect, it } from "vitest";
import { experienceLabel, formatPeriod, getExperienceSummary } from "@/content/dates";
import { experiences } from "@/content/experience";

const october2026 = new Date(2026, 9, 15);

describe("formatPeriod", () => {
  it("formats a finished period", () => {
    expect(formatPeriod("2024-07", "2025-01")).toBe("07/2024 - 01/2025");
  });

  it("formats an ongoing period", () => {
    expect(formatPeriod("2025-09")).toBe("09/2025 - aujourd'hui");
  });
});

describe("experienceLabel", () => {
  it.each([
    [11, "11 mois"],
    [12, "1 an"],
    [13, "plus d'un an"],
    [36, "3 ans"],
    [45, "plus de 3 ans"],
  ])("labels %i months as %s", (months, label) => {
    expect(experienceLabel(months)).toBe(label);
  });
});

describe("getExperienceSummary", () => {
  it("counts an ongoing entry up to the current month, inclusive", () => {
    expect(getExperienceSummary([{ start: "2026-01" }], october2026).months).toBe(10);
  });

  it("counts overlapping entries once", () => {
    const summary = getExperienceSummary(
      [{ start: "2023-02" }, { start: "2025-09" }],
      october2026,
    );
    expect(summary.months).toBe(45);
  });

  it("merges adjacent entries and adds disjoint ones", () => {
    const summary = getExperienceSummary(
      [
        { start: "2020-01", end: "2020-06" },
        { start: "2020-07", end: "2020-12" },
        { start: "2022-01", end: "2022-03" },
      ],
      october2026,
    );
    expect(summary.months).toBe(15);
  });

  it("ignores early entries", () => {
    const summary = getExperienceSummary(
      [
        { start: "2021-07", end: "2021-08", section: "early" },
        { start: "2026-01", section: "main" },
      ],
      october2026,
    );
    expect(summary.months).toBe(10);
  });

  it("gives « plus de 3 ans » with the real content in October 2026", () => {
    expect(getExperienceSummary(experiences, october2026).label).toBe("plus de 3 ans");
  });
});
