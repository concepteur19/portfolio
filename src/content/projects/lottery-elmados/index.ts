import type { ProjectInput } from "../schema";
import cover from "./cover.png";

export default {
  id: "lottery-elmados",
  title: "Lottery Elmados Consulting",
  summary:
    "Application de gestion des joueurs de la loterie américaine inscrits par un cabinet de conseil.",
  context: "client",
  organization: "Elmados Consulting",
  period: { start: "2023-08", end: "2024-02" },
  role: "Développement de l'application",
  technologies: ["Laravel", "Bootstrap", "JavaScript"],
  // Unreachable on 2026-11-04: shown as « Démo hors ligne ».
  links: [{ type: "demo", url: "https://dvloteriec.com/", archived: true }],
  images: [
    { image: cover, alt: "Écran de gestion des joueurs de Lottery Elmados Consulting", format: "desktop" },
  ],
  featured: { order: 3 },
} satisfies ProjectInput;
