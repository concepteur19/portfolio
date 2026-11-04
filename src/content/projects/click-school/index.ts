import type { ProjectInput } from "../schema";
import logo from "./logo.png";

export default {
  id: "click-school",
  title: "Click School",
  summary:
    "Plateforme de gestion scolaire : rôles, notes et bulletins, suivi des élèves par les parents à distance.",
  context: "employer",
  organization: "PhiBrain Inc SARL",
  period: { start: "2024-01", end: "2025-06" },
  role: "Analyse, conception UML / Merise et développement",
  technologies: ["Next.js", "Tailwind CSS", "Laravel"],
  links: [{ type: "demo", url: "https://lcdrv2.n0c.world" }],
  logo,
} satisfies ProjectInput;
