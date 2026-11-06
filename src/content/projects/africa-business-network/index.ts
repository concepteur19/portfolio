import type { ProjectInput } from "../schema";
import cover from "./cover.png";
import logo from "./logo.png";

export default {
  id: "africa-business-network",
  title: "Africa Business Network",
  summary:
    "Plateforme de mise en relation d'affaires africaine, dont le premier module livré est une marketplace.",
  context: "employer",
  organization: "Happyness SARL",
  period: { start: "2024-07", end: "2025-01" },
  role: "Conception et intégration des interfaces utilisateur",
  technologies: ["React", "Redux", "Bootstrap"],
  links: [{ type: "demo", url: "https://afri-front.vercel.app/" }],
  images: [
    { image: cover, alt: "Page d'accueil de la marketplace Africa Business Network", format: "desktop" },
  ],
  logo,
  featured: { order: 2 },
} satisfies ProjectInput;
