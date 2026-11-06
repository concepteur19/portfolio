export type TechnologyCategory = "frontend" | "backend" | "data" | "devops" | "mobile" | "tools";

export type Technology = {
  slug: string;
  name: string;
  aliases: string[];
  category: TechnologyCategory;
};

// Canonical names: project fiches may use an alias, filters show the canonical name only.
export const technologies: Technology[] = [
  { slug: "react", name: "React", aliases: ["React.js", "ReactJS"], category: "frontend" },
  { slug: "nextjs", name: "Next.js", aliases: ["Nextjs", "Next js"], category: "frontend" },
  { slug: "typescript", name: "TypeScript", aliases: ["TS"], category: "frontend" },
  { slug: "javascript", name: "JavaScript", aliases: ["JS"], category: "frontend" },
  { slug: "html", name: "HTML", aliases: ["HTML5"], category: "frontend" },
  { slug: "css", name: "CSS", aliases: ["CSS3"], category: "frontend" },
  { slug: "tailwind-css", name: "Tailwind CSS", aliases: ["Tailwind", "TailwindCss"], category: "frontend" },
  { slug: "bootstrap", name: "Bootstrap", aliases: [], category: "frontend" },
  { slug: "redux", name: "Redux", aliases: [], category: "frontend" },
  { slug: "angular", name: "Angular", aliases: [], category: "frontend" },
  { slug: "astro", name: "Astro", aliases: [], category: "frontend" },
  { slug: "preact", name: "Preact", aliases: [], category: "frontend" },
  { slug: "taro", name: "Taro", aliases: ["Taro JS"], category: "mobile" },
  { slug: "mobx", name: "MobX", aliases: [], category: "frontend" },
  { slug: "vite", name: "Vite", aliases: [], category: "tools" },
  { slug: "zod", name: "Zod", aliases: [], category: "tools" },
  { slug: "laravel", name: "Laravel", aliases: [], category: "backend" },
  { slug: "php", name: "PHP", aliases: [], category: "backend" },
  { slug: "csharp", name: "C#", aliases: ["CSharp"], category: "backend" },
  { slug: "aspnet-core", name: "ASP.NET Core", aliases: ["ASP.NET", "AspNetCore"], category: "backend" },
  { slug: "mysql", name: "MySQL", aliases: [], category: "data" },
  { slug: "redis", name: "Redis", aliases: [], category: "data" },
  { slug: "supabase", name: "Supabase", aliases: [], category: "data" },
  { slug: "stripe", name: "Stripe", aliases: [], category: "backend" },
  { slug: "deepl", name: "DeepL", aliases: [], category: "backend" },
  { slug: "docker", name: "Docker", aliases: [], category: "devops" },
  { slug: "kubernetes", name: "Kubernetes", aliases: ["K8s"], category: "devops" },
  { slug: "openshift", name: "OpenShift", aliases: [], category: "devops" },
  { slug: "nginx", name: "nginx", aliases: [], category: "devops" },
  { slug: "grafana", name: "Grafana", aliases: [], category: "devops" },
  { slug: "github-actions", name: "GitHub Actions", aliases: [], category: "devops" },
  { slug: "cloudflare-pages", name: "Cloudflare Pages", aliases: [], category: "devops" },
  { slug: "cloudflare-workers", name: "Cloudflare Workers", aliases: [], category: "devops" },
  { slug: "jest", name: "Jest", aliases: [], category: "tools" },
  { slug: "vitest", name: "Vitest", aliases: [], category: "tools" },
  { slug: "playwright", name: "Playwright", aliases: [], category: "tools" },
];

const key = (value: string) => value.toLowerCase().replace(/[\s.\-_]/g, "");

const byKey = new Map<string, Technology>();
for (const technology of technologies) {
  for (const value of [technology.name, technology.slug, ...technology.aliases]) {
    byKey.set(key(value), technology);
  }
}

export function normalizeTechnology(raw: string): Technology | undefined {
  return byKey.get(key(raw));
}
