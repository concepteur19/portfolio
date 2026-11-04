import type { ProjectInput } from "../schema";
import cover from "./cover.png";
import logo from "./logo.png";

export default {
  id: "food-animation",
  title: "Food Animation",
  summary: "Animation de plats de cuisine indienne.",
  context: "challenge",
  period: { start: "2023-10", end: "2023-10" },
  role: "Développement",
  technologies: ["React", "Tailwind CSS"],
  links: [{ type: "demo", url: "https://food-animation-xi.vercel.app/" }],
  images: [{ image: cover, alt: "Plat indien animé sur fond coloré", format: "desktop" }],
  logo,
  hidden: true,
} satisfies ProjectInput;
