import type { NavItemInput } from "./schema";

// Absolute URLs (share previews). Spec 003 may move the site to a custom domain.
export const siteUrl = "https://portfolio-phi-one-99.vercel.app";

// "Articles" comes back with spec 007 (blog), together with its page.
export const navItems = [
  { href: "/about", label: "À propos" },
  { href: "/projects", label: "Projets" },
] satisfies NavItemInput[];
