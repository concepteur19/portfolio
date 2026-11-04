// Pure helpers used in the browser: no Zod, no content import.

export type ProjectFilter = { cadre?: string; tech?: string };

type FilterableProject = { context: string; technologies: { slug: string }[] };

type Query = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export function parseFilterQuery(
  query: Query,
  known: { contexts: string[]; technologies: string[] },
): ProjectFilter {
  const cadre = first(query.cadre);
  const tech = first(query.tech);
  return {
    ...(cadre && known.contexts.includes(cadre) ? { cadre } : {}),
    ...(tech && known.technologies.includes(tech) ? { tech } : {}),
  };
}

export function filterProjects<T extends FilterableProject>(projects: T[], filter: ProjectFilter): T[] {
  return projects.filter(
    (project) =>
      (!filter.cadre || project.context === filter.cadre) &&
      (!filter.tech || project.technologies.some((technology) => technology.slug === filter.tech)),
  );
}

export function splitLabs<T extends FilterableProject>(projects: T[]): { main: T[]; labs: T[] } {
  return {
    main: projects.filter((project) => project.context !== "challenge"),
    labs: projects.filter((project) => project.context === "challenge"),
  };
}
