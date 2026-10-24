import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { education } from "@/content/education";
import { experiences } from "@/content/experience";
import { getExperiences, validateContent, type RawContent } from "@/content/index";
import { profile } from "@/content/profile";
import { navItems } from "@/content/site";
import { skillGroups } from "@/content/skills";

const raw: RawContent = { profile, experiences, education, skillGroups, navItems };
const root = path.resolve(__dirname, "../../..");

describe("content", () => {
  it("accepts the real content", () => {
    expect(() => validateContent(raw)).not.toThrow();
  });

  it("names the file and the field when a date is inconsistent", () => {
    const broken = structuredClone(experiences) as Record<string, unknown>[];
    broken[2] = { ...broken[2], start: "2023-02", end: "2023-01" };
    expect(() => validateContent({ ...raw, experiences: broken })).toThrow(
      /src\/content\/experience\.ts › \[2\]\.end : la fin \(2023-01\) précède le début \(2023-02\)/,
    );
  });

  it("rejects a duplicate id", () => {
    const duplicated = [...experiences, experiences[0]];
    expect(() => validateContent({ ...raw, experiences: duplicated })).toThrow(
      /identifiant en double/,
    );
  });

  it("rejects an unknown profile field such as a phone number", () => {
    expect(() =>
      validateContent({ ...raw, profile: { ...profile, phone: "000" } }),
    ).toThrow(/profile\.ts/);
  });

  it("sorts experiences: ongoing first, then by start date, most recent first", () => {
    const { main, early } = getExperiences();
    expect(main.map((entry) => entry.id)).toEqual([
      "ingsi-orange",
      "phibrain",
      "happyness",
      "teaching",
      "2si",
    ]);
    expect(early.map((entry) => entry.id)).toEqual(["gloom", "lugar"]);
  });

  it("only links the menu to existing pages", () => {
    for (const { href } of navItems) {
      const page = path.join(root, "src/pages", href);
      const exists = fs.existsSync(`${page}/index.tsx`) || fs.existsSync(`${page}.tsx`);
      expect(exists, `${href} has no page`).toBe(true);
    }
  });

  it("contains no phone number", () => {
    const serialized = JSON.stringify(raw);
    expect(serialized).not.toMatch(/\+?237|\b6\d{2}[\s.]?\d{2}[\s.]?\d{2}[\s.]?\d{2}\b/);
  });

  it("ships the public CV", () => {
    expect(fs.existsSync(path.join(root, "public", profile.cv.path))).toBe(true);
  });
});
