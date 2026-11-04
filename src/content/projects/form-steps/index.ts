import type { ProjectInput } from "../schema";
import logo from "./logo.png";

export default {
  id: "form-steps",
  title: "Formulaire en plusieurs étapes",
  summary: "Formulaire animé en plusieurs étapes avant sa soumission.",
  context: "challenge",
  period: { start: "2023-09", end: "2023-09" },
  role: "Développement",
  technologies: ["React", "Tailwind CSS"],
  links: [{ type: "demo", url: "https://form-steps-three.vercel.app/" }],
  logo,
} satisfies ProjectInput;
