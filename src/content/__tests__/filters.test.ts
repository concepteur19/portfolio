import { describe, expect, it } from "vitest";
import { filterProjects, parseFilterQuery, splitLabs } from "@/content/filters";

const known = { contexts: ["client", "freelance", "challenge"], technologies: ["react", "laravel"] };

const projects = [
  { id: "a", context: "client", technologies: [{ slug: "react" }] },
  { id: "b", context: "freelance", technologies: [{ slug: "laravel" }, { slug: "react" }] },
  { id: "c", context: "challenge", technologies: [{ slug: "react" }] },
];

describe("parseFilterQuery", () => {
  it("keeps known values", () => {
    expect(parseFilterQuery({ cadre: "client", tech: "react" }, known)).toEqual({
      cadre: "client",
      tech: "react",
    });
  });

  it("ignores unknown values", () => {
    expect(parseFilterQuery({ cadre: "nasa", tech: "cobol" }, known)).toEqual({});
  });

  it("reads the first value of an array", () => {
    expect(parseFilterQuery({ tech: ["laravel", "react"] }, known)).toEqual({ tech: "laravel" });
  });
});

describe("filterProjects", () => {
  const ids = (list: { id: string }[]) => list.map((project) => project.id);

  it("filters by context", () => {
    expect(ids(filterProjects(projects, { cadre: "client" }))).toEqual(["a"]);
  });

  it("filters by technology", () => {
    expect(ids(filterProjects(projects, { tech: "laravel" }))).toEqual(["b"]);
  });

  it("combines both filters", () => {
    expect(ids(filterProjects(projects, { cadre: "freelance", tech: "react" }))).toEqual(["b"]);
    expect(filterProjects(projects, { cadre: "client", tech: "laravel" })).toEqual([]);
  });

  it("returns everything without filter", () => {
    expect(filterProjects(projects, {})).toHaveLength(3);
  });
});

describe("splitLabs", () => {
  it("separates challenges", () => {
    const { main, labs } = splitLabs(projects);
    expect(main.map((project) => project.id)).toEqual(["a", "b"]);
    expect(labs.map((project) => project.id)).toEqual(["c"]);
  });
});
