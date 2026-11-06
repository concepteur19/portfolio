import type { ProjectInput } from "../schema";
import cover from "./cover.png";
import logo from "./logo.png";

export default {
  id: "nike-product",
  title: "Nike Product Animation",
  summary: "Animation de présentation d'une chaussure de tennis Nike.",
  context: "challenge",
  period: { start: "2023-11", end: "2023-11" },
  role: "Développement",
  technologies: ["React", "CSS"],
  links: [{ type: "demo", url: "https://nike-product.vercel.app/" }],
  images: [{ image: cover, alt: "Chaussure Nike mise en scène avec animation", format: "desktop" }],
  logo,
} satisfies ProjectInput;
