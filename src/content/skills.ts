import type { SkillGroupInput } from "./schema";

export const skillGroups = [
  {
    id: "backend",
    label: "Développement backend",
    items: ["C#", "ASP.NET Core", "PHP", "Laravel", "API REST", "architecture microservices"],
  },
  {
    id: "frontend",
    label: "Développement frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Angular",
      "Taro (mini programs)",
    ],
  },
  {
    id: "data",
    label: "Bases de données",
    items: ["SQL", "MySQL", "MongoDB", "Redis", "Merise et UML"],
  },
  {
    id: "devops",
    label: "DevOps",
    items: [
      "Git",
      "Docker",
      "Kubernetes",
      "OpenShift",
      "Azure DevOps",
      "GitHub Actions",
      "SonarQube",
      "Grafana",
      "Linux",
    ],
  },
  {
    id: "quality",
    label: "Tests et qualité",
    items: ["Jest", "Vitest", "Playwright", "SonarQube", "audits d'accessibilité et de performance"],
  },
  {
    id: "security",
    label: "Sécurité",
    items: ["JWT", "authentification 2FA", "KYC", "protection des données"],
  },
  {
    id: "ai",
    label: "Intelligence artificielle",
    items: ["DeepL (traduction automatique neuronale)", "Claude Code", "GitHub Copilot", "Spec Kit"],
  },
  {
    id: "methods",
    label: "Méthodes",
    items: ["Agile Scrum", "Spec-Driven Development", "revue de code", "documentation technique"],
  },
] satisfies SkillGroupInput[];
