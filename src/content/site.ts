import type { NavItemInput } from "./schema";

// "Articles" comes back with spec 007 (blog), together with its page.
export const navItems = [
  { href: "/about", label: "À propos" },
  { href: "/projects", label: "Projets" },
] satisfies NavItemInput[];
