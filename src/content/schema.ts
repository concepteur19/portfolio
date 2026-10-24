import { z } from "zod";

const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "format attendu YYYY-MM");

const url = z.string().refine((value) => {
  try {
    return ["https:", "mailto:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}, "URL absolue https: ou mailto: attendue");

const nonEmpty = z.string().trim().min(1, "valeur vide");

export const socialLinkSchema = z.strictObject({
  network: z.enum(["github", "linkedin", "x", "email"]),
  url,
  handle: nonEmpty,
  label: nonEmpty,
});

// strictObject: an unknown key such as a phone number fails the build (principle VII).
export const profileSchema = z.strictObject({
  displayName: nonEmpty,
  fullName: nonEmpty,
  title: nonEmpty,
  specialties: z.array(nonEmpty).min(1).max(4),
  tagline: nonEmpty,
  bio: z.array(nonEmpty).min(1),
  currentRoleId: nonEmpty,
  location: nonEmpty,
  email: z.email(),
  socials: z
    .array(socialLinkSchema)
    .refine(
      (socials) =>
        ["github", "linkedin"].every((network) =>
          socials.some((social) => social.network === network),
        ),
      "GitHub et LinkedIn sont obligatoires",
    ),
  cv: z.strictObject({
    path: z.string().regex(/^\/cv\/[\w.-]+\.pdf$/, "doit commencer par /cv/ et finir par .pdf"),
    downloadName: z.string().regex(/^[\w.-]+\.pdf$/, "nom de fichier .pdf attendu"),
  }),
});

export const experienceSchema = z
  .strictObject({
    id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "identifiant kebab-case attendu"),
    role: nonEmpty,
    organization: nonEmpty,
    client: nonEmpty.optional(),
    location: nonEmpty,
    start: yearMonth,
    end: yearMonth.optional(),
    achievements: z.array(nonEmpty).max(3),
    section: z.enum(["main", "early"]),
  })
  .superRefine((entry, ctx) => {
    if (entry.end && entry.end < entry.start) {
      ctx.addIssue({
        code: "custom",
        path: ["end"],
        message: `la fin (${entry.end}) précède le début (${entry.start})`,
      });
    }
    if (entry.section === "main" && entry.achievements.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["achievements"],
        message: "au moins 1 réalisation pour un poste principal",
      });
    }
  });

export const educationSchema = z
  .strictObject({
    id: nonEmpty,
    degree: nonEmpty,
    school: nonEmpty,
    startYear: z.number().int().optional(),
    endYear: z.number().int(),
  })
  .superRefine((entry, ctx) => {
    if (entry.startYear !== undefined && entry.endYear < entry.startYear) {
      ctx.addIssue({
        code: "custom",
        path: ["endYear"],
        message: `l'année de fin (${entry.endYear}) précède l'année de début (${entry.startYear})`,
      });
    }
  });

export const skillGroupSchema = z.strictObject({
  id: nonEmpty,
  label: nonEmpty,
  items: z
    .array(nonEmpty)
    .min(1)
    .refine((items) => new Set(items).size === items.length, "compétence en double"),
});

export const navItemSchema = z.strictObject({
  href: z.string().regex(/^\/[\w/-]*$/, "chemin interne attendu"),
  label: nonEmpty,
});

export type SocialLinkInput = z.input<typeof socialLinkSchema>;
export type ProfileInput = z.input<typeof profileSchema>;
export type ExperienceInput = z.input<typeof experienceSchema>;
export type EducationInput = z.input<typeof educationSchema>;
export type SkillGroupInput = z.input<typeof skillGroupSchema>;
export type NavItemInput = z.input<typeof navItemSchema>;

export type Profile = z.output<typeof profileSchema>;
export type Experience = z.output<typeof experienceSchema>;
export type Education = z.output<typeof educationSchema>;
export type SkillGroup = z.output<typeof skillGroupSchema>;
export type NavItem = z.output<typeof navItemSchema>;

function formatPath(path: PropertyKey[]): string {
  return path
    .map((key, index) => {
      if (typeof key === "number") return `[${key}]`;
      return index === 0 ? String(key) : `.${String(key)}`;
    })
    .join("");
}

export function formatContentError(file: string, error: z.ZodError): Error {
  const details = error.issues
    .map((issue) => `${formatPath(issue.path) || "(racine)"} : ${issue.message}`)
    .join(" ; ");
  return new Error(`Contenu invalide dans src/content/${file} › ${details}`);
}
