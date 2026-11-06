import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import type { ProjectView } from "@/content/projects/load";

type ProjectLinksProps = {
  links: ProjectView["links"];
  title: string;
};

// External links of a project; an archived link stays visible but is not clickable (FR-009).
const ProjectLinks: React.FC<ProjectLinksProps> = ({ links, title }) => {
  if (links.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={link.url}>
          {link.archived ? (
            <span className="inline-flex items-center rounded-full border border-dashed px-3 py-1 text-sm border-slate-300 text-gray-500 dark:border-slate-600 dark:text-gray-400">
              Démo hors ligne
            </span>
          ) : (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} de ${title}`}
              className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-barlowMedium border-slate-300 hover:border-primary-strong hover:text-primary-strong dark:border-slate-600 dark:hover:border-primary dark:hover:text-primary"
            >
              {link.label}
              <BiLinkExternal size={14} aria-hidden="true" />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ProjectLinks;
