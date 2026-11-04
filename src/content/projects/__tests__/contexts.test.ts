import { describe, expect, it } from "vitest";
import { projectContexts } from "@/content/projects/schema";

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const contrastWithWhite = (hex: string) => (1 + 0.05) / (luminance(hex) + 0.05);

describe("context colours", () => {
  it.each(Object.entries(projectContexts))("%s keeps white text above 4.5:1", (_, { color }) => {
    expect(contrastWithWhite(color)).toBeGreaterThanOrEqual(4.5);
  });
});
