import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { projectEntries } from "@/content/projects";
import { getFeaturedProjects, getProjects, validateProjects } from "@/content/projects/load";

const projectsDir = path.resolve(__dirname, "..");

describe("project registry", () => {
  it("validates every real fiche", () => {
    expect(() => validateProjects(projectEntries)).not.toThrow();
  });

  it("uses the folder name as id", () => {
    for (const { file, data } of projectEntries) {
      expect((data as { id: string }).id, file).toBe(file.split("/")[0]);
    }
  });

  it("registers every project folder", () => {
    const folders = fs
      .readdirSync(projectsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name !== "__tests__")
      .map((entry) => entry.name)
      .sort();
    const registered = projectEntries.map(({ file }) => file.split("/")[0]).sort();
    expect(registered).toEqual(folders);
  });

  it("keeps hidden projects out of the list and features at most 4", () => {
    expect(getProjects().some((project) => project.id === "food-animation")).toBe(false);
    expect(getFeaturedProjects().length).toBeLessThanOrEqual(4);
  });
});
