// Server-side only: call these functions from getStaticProps / getStaticPaths,
// never from components, so that Zod stays out of the client bundle.
import { formatPeriod } from "../dates";
import { formatContentError } from "../schema";
import { normalizeTechnology } from "../technologies";
import { projectEntries } from "./index";
import {
  caseStudySections,
  linkLabels,
  projectContexts,
  projectSchema,
  type LinkType,
  type Project,
  type ProjectContext,
} from "./schema";

export type ImageData = {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
};

export type ProjectCover =
  | { kind: "image"; image: ImageData; alt: string }
  | { kind: "logo"; logo: ImageData }
  | { kind: "initials"; initials: string };

export type CaseStudyView = { section: (typeof caseStudySections)[number]; paragraphs: string[] }[];

export type ProjectView = {
  id: string;
  title: string;
  summary: string;
  context: ProjectContext;
  contextLabel: string;
  contextColor: string;
  organization?: string;
  period: { start: string; end?: string };
  periodLabel: string;
  role: string;
  technologies: { slug: string; name: string }[];
  links: { type: LinkType; url: string; label: string; archived: boolean }[];
  images: { image: ImageData; alt: string; caption?: string; format: "desktop" | "mobile" | "other" }[];
  cover: ProjectCover;
  caseStudy: CaseStudyView;
  subprojects: { name: string; summary: string }[];
  featuredOrder?: number;
  hidden: boolean;
  visibility: "public" | "confidential" | "not-public";
};

export type FilterOptions = {
  contexts: { value: ProjectContext; label: string; count: number }[];
  technologies: { slug: string; name: string; count: number }[];
};

// Next.js refuses to serialize undefined values returned by getStaticProps.
function jsonSafe<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function initialsOf(title: string): string {
  const words = title.split(/[\s-]+/).filter((word) => /[\p{L}\p{N}]/u.test(word));
  const letters =
    words.length >= 2 ? words[0][0] + words[1][0] : (words[0] ?? "?").slice(0, 2);
  return letters.toUpperCase();
}

function toView(project: Project): ProjectView {
  const images = (project.images ?? [])
    .map((image, index) => ({ ...image, index }))
    .filter((image) => image.approved !== false);

  const coverImage =
    images.find((image) => image.index === project.coverIndex) ?? images[0];
  let cover: ProjectCover;
  if (coverImage) cover = { kind: "image", image: coverImage.image as ImageData, alt: coverImage.alt };
  else if (project.logo) cover = { kind: "logo", logo: project.logo as ImageData };
  else cover = { kind: "initials", initials: initialsOf(project.title) };

  const links = (project.links ?? [])
    .filter((link) => link.archived !== "hide")
    .map((link) => ({
      type: link.type,
      url: link.url,
      label: link.label ?? linkLabels[link.type],
      archived: link.archived === true,
    }));

  let visibility: ProjectView["visibility"] = "public";
  if (project.confidential) visibility = "confidential";
  else if (links.length === 0 && images.length === 0) visibility = "not-public";

  return {
    id: project.id,
    title: project.title,
    summary: project.summary,
    context: project.context,
    contextLabel: projectContexts[project.context].label,
    contextColor: projectContexts[project.context].color,
    organization: project.organization,
    period: project.period,
    periodLabel: formatPeriod(project.period.start, project.period.end),
    role: project.role,
    technologies: project.technologies.map((raw) => {
      const { slug, name } = normalizeTechnology(raw)!;
      return { slug, name };
    }),
    links,
    images: images.map(({ image, alt, caption, format }) => ({
      image: image as ImageData,
      alt,
      caption,
      format,
    })),
    cover,
    caseStudy: caseStudySections.flatMap((section) => {
      const value = project.caseStudy?.[section];
      if (!value) return [];
      return [{ section, paragraphs: Array.isArray(value) ? value : [value] }];
    }),
    subprojects: project.subprojects ?? [],
    featuredOrder: project.featured?.order,
    hidden: project.hidden ?? false,
    visibility,
  };
}

export function validateProjects(entries: { file: string; data: unknown }[]): ProjectView[] {
  const projects = entries.map(({ file, data }) => {
    const result = projectSchema.safeParse(data);
    if (!result.success) throw formatContentError(`projects/${file}`, result.error);
    return { file, project: result.data };
  });

  const ids = new Map<string, string>();
  const orders = new Map<number, string>();
  for (const { file, project } of projects) {
    const where = `Contenu invalide dans src/content/projects/${file}`;
    if (ids.has(project.id)) {
      throw new Error(`${where} › id : identifiant en double (${project.id}, déjà utilisé par ${ids.get(project.id)})`);
    }
    ids.set(project.id, file);
    if (project.featured) {
      const other = orders.get(project.featured.order);
      if (other) {
        throw new Error(`${where} › featured.order : ordre ${project.featured.order} déjà utilisé par ${other}`);
      }
      orders.set(project.featured.order, file);
    }
  }
  if (orders.size > 4) {
    throw new Error(
      `Contenu invalide dans src/content/projects/index.ts › featured : ${orders.size} projets mis en avant, 4 au maximum`,
    );
  }

  return jsonSafe(projects.map(({ project }) => toView(project)));
}

function sortProjects(projects: ProjectView[]): ProjectView[] {
  const byPriority = (a: ProjectView, b: ProjectView) => {
    const featured = (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity);
    if (featured !== 0 && !Number.isNaN(featured)) return featured;
    return b.period.start.localeCompare(a.period.start);
  };
  const main = projects.filter((project) => project.context !== "challenge").sort(byPriority);
  const labs = projects.filter((project) => project.context === "challenge").sort(byPriority);
  return [...main, ...labs];
}

let cache: ProjectView[] | undefined;
function allProjects(): ProjectView[] {
  cache ??= validateProjects(projectEntries);
  return cache;
}

export function getProjects(entries?: { file: string; data: unknown }[]): ProjectView[] {
  const projects = entries ? validateProjects(entries) : allProjects();
  return sortProjects(projects.filter((project) => !project.hidden));
}

export function getProject(id: string): ProjectView {
  const project = getProjects().find((candidate) => candidate.id === id);
  if (!project) throw new Error(`Projet introuvable ou masqué : ${id}`);
  return project;
}

export function getFeaturedProjects(): ProjectView[] {
  return getProjects()
    .filter((project) => project.featuredOrder !== undefined)
    .sort((a, b) => a.featuredOrder! - b.featuredOrder!)
    .slice(0, 4);
}

export function getProjectIds(): string[] {
  return getProjects().map((project) => project.id);
}

export function getFilterOptions(projects: ProjectView[]): FilterOptions {
  const contexts = new Map<ProjectContext, number>();
  const techs = new Map<string, { slug: string; name: string; count: number }>();
  for (const project of projects) {
    contexts.set(project.context, (contexts.get(project.context) ?? 0) + 1);
    for (const technology of project.technologies) {
      const entry = techs.get(technology.slug) ?? { ...technology, count: 0 };
      entry.count += 1;
      techs.set(technology.slug, entry);
    }
  }
  return {
    contexts: [...contexts].map(([value, count]) => ({
      value,
      label: projectContexts[value].label,
      count,
    })),
    technologies: [...techs.values()].sort(
      (a, b) => b.count - a.count || a.name.localeCompare(b.name),
    ),
  };
}
