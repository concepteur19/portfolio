import Link from "next/link";
import React from "react";
import type { ProjectView } from "@/content/projects/load";
import ProjectCover from "./ProjectCover";
import ProjectLinks from "./ProjectLinks";

const MAX_TECHNOLOGIES = 5;

export const visibilityNotes: Partial<Record<ProjectView["visibility"], string>> = {
  confidential: "Projet confidentiel",
  "not-public": "Projet non public",
};

type ProjectCardProps = {
  project: ProjectView;
  sizes?: string;
};

// Title and cover lead to the project page; external links stay separate buttons (US2-2).
const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}) => {
  const href = `/projects/${project.id}`;
  const shown = project.technologies.slice(0, MAX_TECHNOLOGIES);
  const hidden = project.technologies.length - shown.length;
  const note = visibilityNotes[project.visibility];

  return (
    <article className="flex flex-col gap-3">
      {/* Duplicate link for the pointer: kept out of the tab order and of screen readers. */}
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
        <ProjectCover cover={project.cover} color={project.contextColor} sizes={sizes} />
      </Link>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span
          className="rounded-full px-2 py-0.5 font-barlowMedium text-white"
          style={{ backgroundColor: project.contextColor }}
        >
          {project.contextLabel}
        </span>
        <span className="text-gray-500 dark:text-gray-400">{project.periodLabel}</span>
      </div>

      <h3 className="text-lg font-barlowMedium">
        <Link href={href} className="hover:text-primary-strong dark:hover:text-primary">
          {project.title}
        </Link>
      </h3>

      <p className="text-[15px] text-gray-600 dark:text-gray-300">{project.summary}</p>

      <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
        {shown.map((technology) => (
          <li
            key={technology.slug}
            className="rounded-full border px-2 py-0.5 text-xs border-slate-200 dark:border-slate-700"
          >
            {technology.name}
          </li>
        ))}
        {hidden > 0 && (
          <li className="px-1 py-0.5 text-xs text-gray-500 dark:text-gray-400">+{hidden}</li>
        )}
      </ul>

      {note && <p className="text-sm italic text-gray-500 dark:text-gray-400">{note}</p>}

      <ProjectLinks links={project.links} title={project.title} />
    </article>
  );
};

export default ProjectCard;
