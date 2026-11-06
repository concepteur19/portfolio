import type { ProjectInput } from "../schema";
import cover from "./cover.png";
import logo from "./logo.svg";

export default {
  id: "subscribe",
  title: "Subscribe",
  summary:
    "Application web pour suivre ses abonnements (Netflix, Spotify, Deezer…) et leurs échéances.",
  context: "personal",
  period: { start: "2024-01", end: "2024-06" },
  role: "Conception et développement fullstack",
  technologies: ["React", "TypeScript", "Tailwind CSS", "Laravel"],
  links: [
    { type: "demo", url: "https://subscribe-ui.vercel.app/" },
    { type: "code-frontend", url: "https://github.com/concepteur19/subscribe_UI" },
    { type: "code-backend", url: "https://github.com/concepteur19/subscribe_api" },
  ],
  images: [
    { image: cover, alt: "Tableau de bord de Subscribe listant des abonnements", format: "desktop" },
  ],
  logo,
  featured: { order: 1 },
} satisfies ProjectInput;
