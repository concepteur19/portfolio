import Head from "next/head";
import Link from "next/link";
import React from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { BsArrowLeft } from "react-icons/bs";
import Title from "@/components/base/Title";
import ProjectCover from "@/components/projects/ProjectCover";
import ProjectLinks from "@/components/projects/ProjectLinks";
import { visibilityNotes } from "@/components/projects/ProjectCard";
import { getProject, getProjectIds, type ProjectView } from "@/content/projects/load";

type ProjectPageProps = { project: ProjectView };

export const getStaticPaths: GetStaticPaths = () => ({
  paths: getProjectIds().map((id) => ({ params: { id } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<ProjectPageProps> = ({ params }) => ({
  props: { project: getProject(String(params?.id)) },
});

const ProjectPage = ({ project }: ProjectPageProps) => {
  const note = visibilityNotes[project.visibility];

  return (
    <article className="space-y-8 py-10">
      <Head>
        <title>{`${project.title} · Zobel Nguening`}</title>
        <meta name="description" content={project.summary} />
      </Head>

      <Link
        href="/projects"
        className="inline-flex items-center gap-2 font-barlowMedium hover:text-primary-strong dark:hover:text-primary"
      >
        <BsArrowLeft aria-hidden="true" /> Tous les projets
      </Link>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span
            className="rounded-full px-2 py-0.5 font-barlowMedium text-white"
            style={{ backgroundColor: project.contextColor }}
          >
            {project.contextLabel}
          </span>
          {project.organization && <span>{project.organization}</span>}
          <span className="text-gray-500 dark:text-gray-400">{project.periodLabel}</span>
        </div>
        <Title as="h1" title={project.title} className="text-4xl md:text-5xl" />
        {note && <p className="italic text-gray-500 dark:text-gray-400">{note}</p>}
        <p className="text-lg text-gray-600 dark:text-gray-300 md:w-3/4">{project.summary}</p>
        <ProjectLinks links={project.links} title={project.title} />
      </header>

      <ProjectCover
        cover={project.cover}
        color={project.contextColor}
        sizes="(min-width: 1280px) 1024px, 100vw"
        fit="contain"
        preload
        className="max-w-5xl"
      />

      <dl className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-1">
          <dt className="font-barlowMedium text-gray-500 dark:text-gray-400">Mon rôle</dt>
          <dd>{project.role}</dd>
        </div>
        <div className="space-y-1">
          <dt className="font-barlowMedium text-gray-500 dark:text-gray-400">Technologies</dt>
          <dd>
            <ul className="flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <li
                  key={technology.slug}
                  className="rounded-full border px-2 py-0.5 text-sm border-slate-200 dark:border-slate-700"
                >
                  {technology.name}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </article>
  );
};

export default ProjectPage;
