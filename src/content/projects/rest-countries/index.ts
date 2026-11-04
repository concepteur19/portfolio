import type { ProjectInput } from "../schema";
import cover from "./cover.png";
import logo from "./logo.png";

export default {
  id: "rest-countries",
  title: "Recherche de pays",
  summary: "Recherche d'informations sur un pays : nom, langues parlées, superficie, etc.",
  context: "challenge",
  period: { start: "2023-06", end: "2023-07" },
  role: "Développement",
  technologies: ["React", "Tailwind CSS"],
  links: [{ type: "demo", url: "https://rest-coutries-api-omega.vercel.app/" }],
  images: [{ image: cover, alt: "Liste de pays avec drapeaux et filtres par région", format: "desktop" }],
  logo,
} satisfies ProjectInput;
