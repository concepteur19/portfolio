import { z } from "zod";
import { yearMonth } from "../schema";
import { normalizeTechnology } from "../technologies";

export const projectContextValues = [
  "orange-cameroun",
  "employer",
  "client",
  "freelance",
  "personal",
  "challenge",
] as const;

export type ProjectContext = (typeof projectContextValues)[number];

// White text on each colour reaches at least 4.5:1 (checked by contexts.test.ts).
export const projectContexts: Record<ProjectContext, { label: string; color: string }> = {
  "orange-cameroun": { label: "Orange Cameroun", color: "#9a3412" },
  employer: { label: "Employeur", color: "#1e40af" },
  client: { label: "Client", color: "#155e75" },
  freelance: { label: "Freelance", color: "#5b21b6" },
  personal: { label: "Personnel", color: "#166534" },
  challenge: { label: "Challenge", color: "#9d174d" },
};

export const linkTypes = [
  "demo",
  "code-frontend",
  "code-backend",
  "code",
  "design",
  "article",
  "store",
  "video",
  "other",
] as const;

export type LinkType = (typeof linkTypes)[number];

export const linkLabels: Record<LinkType, string> = {
  demo: "Voir le site",
  "code-frontend": "Code front-end",
  "code-backend": "Code back-end",
  code: "Code source",
  design: "Maquette",
  article: "Article",
  store: "Store mobile",
  video: "Vidéo",
  other: "Lien",
};

const nonEmpty = z.string().trim().min(1, "valeur vide");

const httpsUrl = z.string().refine((value) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}, "URL https: attendue");

// Shape of a static image import (next/image StaticImageData), blur placeholder included.
const staticImage = z.object({
  src: nonEmpty,
  width: z.number().positive(),
  height: z.number().positive(),
  blurDataURL: z.string().optional(),
  blurWidth: z.number().optional(),
  blurHeight: z.number().optional(),
});

const paragraphs = z.union([nonEmpty, z.array(nonEmpty).min(1)]);

export const caseStudySections = [
  "context",
  "problem",
  "role",
  "solution",
  "results",
  "learnings",
] as const;

export const caseStudyTitles: Record<(typeof caseStudySections)[number], string> = {
  context: "Contexte",
  problem: "Problème",
  role: "Mon rôle",
  solution: "Solution",
  results: "Résultats",
  learnings: "Apprentissages",
};

export const projectSchema = z
  .strictObject({
    id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "identifiant kebab-case attendu"),
    title: nonEmpty.max(80),
    summary: nonEmpty.max(160),
    context: z.enum(projectContextValues),
    organization: nonEmpty.optional(),
    period: z.strictObject({ start: yearMonth, end: yearMonth.optional() }),
    role: nonEmpty,
    technologies: z.array(nonEmpty).min(1).max(12),
    links: z
      .array(
        z.strictObject({
          type: z.enum(linkTypes),
          url: httpsUrl,
          label: nonEmpty.optional(),
          archived: z.union([z.literal(true), z.literal("hide")]).optional(),
        }),
      )
      .optional(),
    images: z
      .array(
        z.strictObject({
          image: staticImage,
          alt: nonEmpty.max(200),
          caption: nonEmpty.optional(),
          format: z.enum(["desktop", "mobile", "other"]),
          approved: z.boolean().optional(),
        }),
      )
      .optional(),
    coverIndex: z.number().int().min(0).optional(),
    logo: staticImage.optional(),
    caseStudy: z.strictObject(
      Object.fromEntries(caseStudySections.map((section) => [section, paragraphs.optional()])) as Record<
        (typeof caseStudySections)[number],
        z.ZodOptional<typeof paragraphs>
      >,
    ).optional(),
    subprojects: z
      .array(z.strictObject({ name: nonEmpty.max(80), summary: nonEmpty.max(160) }))
      .optional(),
    featured: z.strictObject({ order: z.number().int().min(1) }).optional(),
    hidden: z.boolean().optional(),
    confidential: z.boolean().optional(),
  })
  .superRefine((project, ctx) => {
    if (!project.organization && !["personal", "challenge"].includes(project.context)) {
      ctx.addIssue({
        code: "custom",
        path: ["organization"],
        message: "structure ou client obligatoire pour ce cadre",
      });
    }

    if (project.period.end && project.period.end < project.period.start) {
      ctx.addIssue({
        code: "custom",
        path: ["period", "end"],
        message: `la fin (${project.period.end}) précède le début (${project.period.start})`,
      });
    }

    const seen = new Set<string>();
    project.technologies.forEach((raw, index) => {
      const technology = normalizeTechnology(raw);
      if (!technology) {
        ctx.addIssue({
          code: "custom",
          path: ["technologies", index],
          message: `technologie inconnue « ${raw} » (à ajouter dans src/content/technologies.ts)`,
        });
      } else if (seen.has(technology.slug)) {
        ctx.addIssue({
          code: "custom",
          path: ["technologies", index],
          message: `technologie en double « ${technology.name} »`,
        });
      } else {
        seen.add(technology.slug);
      }
    });

    const images = project.images ?? [];
    if (project.coverIndex !== undefined) {
      const cover = images[project.coverIndex];
      if (!cover || cover.approved === false) {
        ctx.addIssue({
          code: "custom",
          path: ["coverIndex"],
          message: "doit désigner une capture publiable",
        });
      }
    }

    // Research R2: the repository is public, so a confidential project carries no link
    // and only captures explicitly approved for publication.
    if (project.confidential) {
      if ((project.links ?? []).length > 0) {
        ctx.addIssue({
          code: "custom",
          path: ["links"],
          message: "un projet confidentiel ne publie aucun lien",
        });
      }
      images.forEach((image, index) => {
        if (image.approved !== true) {
          ctx.addIssue({
            code: "custom",
            path: ["images", index, "approved"],
            message: "capture d'un projet confidentiel non validée (approved: true attendu)",
          });
        }
      });
    }

    if (project.hidden && project.featured) {
      ctx.addIssue({
        code: "custom",
        path: ["featured"],
        message: "un projet masqué ne peut pas être mis en avant",
      });
    }
  });

export type ProjectInput = z.input<typeof projectSchema>;
export type Project = z.output<typeof projectSchema>;
