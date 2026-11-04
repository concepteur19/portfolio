import { describe, expect, it } from "vitest";
import { getProjects, validateProjects } from "@/content/projects/load";
import { normalizeTechnology } from "@/content/technologies";

const image = { src: "/x.png", width: 1280, height: 800 };
const logo = { src: "/logo.png", width: 64, height: 64 };

const base = {
  title: "Projet test",
  summary: "Un projet de test.",
  context: "personal",
  period: { start: "2026-01" },
  role: "Développement",
  technologies: ["React"],
};

const entry = (id: string, data: Record<string, unknown> = {}) => ({
  file: `${id}/index.ts`,
  data: { ...base, id, ...data },
});

const expectError = (entries: ReturnType<typeof entry>[], message: RegExp) =>
  expect(() => validateProjects(entries)).toThrow(message);

describe("project views (US1 cases)", () => {
  it("uses the first image as cover when links and images exist", () => {
    const [view] = validateProjects([
      entry("full", {
        links: [{ type: "demo", url: "https://example.com" }],
        images: [{ image, alt: "Accueil", format: "desktop" }],
      }),
    ]);
    expect(view.cover).toEqual({ kind: "image", image, alt: "Accueil" });
    expect(view.visibility).toBe("public");
    expect(view.links[0].label).toBe("Voir le site");
  });

  it("keeps a project with images only public, without links", () => {
    const [view] = validateProjects([
      entry("images-only", { images: [{ image, alt: "Accueil", format: "mobile" }] }),
    ]);
    expect(view.links).toEqual([]);
    expect(view.visibility).toBe("public");
  });

  it("falls back to the logo when there is no image", () => {
    const [view] = validateProjects([
      entry("links-only", { logo, links: [{ type: "code", url: "https://github.com/x/y" }] }),
    ]);
    expect(view.cover).toEqual({ kind: "logo", logo });
  });

  it("falls back to initials and marks the project not public", () => {
    const [view] = validateProjects([entry("nothing", { title: "Passeport de mariage" })]);
    expect(view.cover).toEqual({ kind: "initials", initials: "PD" });
    expect(view.visibility).toBe("not-public");
  });

  it("honours coverIndex", () => {
    const second = { src: "/y.png", width: 400, height: 800 };
    const [view] = validateProjects([
      entry("cover", {
        coverIndex: 1,
        images: [
          { image, alt: "Un", format: "desktop" },
          { image: second, alt: "Deux", format: "mobile" },
        ],
      }),
    ]);
    expect(view.cover).toEqual({ kind: "image", image: second, alt: "Deux" });
  });

  it("hides archived links marked hide and labels archived ones", () => {
    const [view] = validateProjects([
      entry("archived", {
        links: [
          { type: "demo", url: "https://old.example.com", archived: true },
          { type: "code", url: "https://github.com/x/y", archived: "hide" },
        ],
      }),
    ]);
    expect(view.links).toEqual([
      { type: "demo", url: "https://old.example.com", label: "Voir le site", archived: true },
    ]);
  });

  it("produces serializable views without undefined values", () => {
    const views = validateProjects([entry("plain")]);
    expect(JSON.stringify(views)).not.toContain("undefined");
    expect(Object.values(views[0])).not.toContain(undefined);
  });
});

describe("validation errors name the fiche and the field", () => {
  it.each([
    ["missing title", entry("a", { title: "" }), /projects\/a\/index\.ts › title/],
    ["http URL", entry("b", { links: [{ type: "demo", url: "http://x.com" }] }), /links\[0\]\.url : URL https: attendue/],
    ["empty alt", entry("c", { images: [{ image, alt: " ", format: "desktop" }] }), /images\[0\]\.alt : valeur vide/],
    ["unknown technology", entry("d", { technologies: ["React", "Nest"] }), /technologies\[1\] : technologie inconnue « Nest »/],
    ["duplicate technology", entry("e", { technologies: ["Nextjs", "Next.js"] }), /technologie en double/],
    ["link on a confidential project", entry("f", { confidential: true, links: [{ type: "demo", url: "https://x.com" }] }), /links : un projet confidentiel ne publie aucun lien/],
    ["unapproved confidential capture", entry("g", { confidential: true, images: [{ image, alt: "x", format: "desktop" }] }), /images\[0\]\.approved/],
    ["hidden and featured", entry("h", { hidden: true, featured: { order: 1 } }), /featured : un projet masqué/],
    ["coverIndex out of range", entry("i", { coverIndex: 2 }), /coverIndex/],
    ["missing organization for a client", entry("j", { context: "client" }), /organization/],
  ])("%s", (_, fiche, message) => {
    expectError([fiche], message);
  });

  it("rejects a duplicate id", () => {
    expectError([entry("same"), { ...entry("same"), file: "other/index.ts" }], /identifiant en double/);
  });

  it("rejects more than 4 featured projects", () => {
    const featured = [1, 2, 3, 4, 5].map((order) => entry(`p${order}`, { featured: { order } }));
    expectError(featured, /5 projets mis en avant, 4 au maximum/);
  });

  it("rejects two identical featured orders", () => {
    expectError(
      [entry("x", { featured: { order: 1 } }), entry("y", { featured: { order: 1 } })],
      /ordre 1 déjà utilisé/,
    );
  });

  it("accepts a confidential project with approved captures", () => {
    expect(() =>
      validateProjects([
        entry("ok", { confidential: true, images: [{ image, alt: "x", format: "desktop", approved: true }] }),
      ]),
    ).not.toThrow();
  });
});

describe("technologies", () => {
  it.each(["Nextjs", "Next js", "Next.js", "next.js"])("normalizes %s to nextjs", (raw) => {
    expect(normalizeTechnology(raw)?.slug).toBe("nextjs");
  });
});

describe("sorting", () => {
  it("lists featured first, then recent first, challenges last, hidden excluded", () => {
    const projects = getProjects([
      entry("old", { period: { start: "2023-01" } }),
      entry("recent", { period: { start: "2026-05" } }),
      entry("star", { period: { start: "2022-01" }, featured: { order: 1 } }),
      entry("lab", { context: "challenge", period: { start: "2026-09" } }),
      entry("secret", { hidden: true }),
    ]);
    expect(projects.map((project) => project.id)).toEqual(["star", "recent", "old", "lab"]);
  });
});
