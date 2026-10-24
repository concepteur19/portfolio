import Title from "@/components/base/Title";
import projectsData, { isPublishable } from "@/data/ProjectsData";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiLink } from "react-icons/bi";

const publishedProjects = projectsData.filter(isPublishable);

const Index = () => {
  return (
    <div className="space-y-8 py-10">
      <Title
        as="h1"
        className="text-5xl md:text-6xl sm:w-[90%] md:w-2/3"
        title="Quelques projets sur lesquels j'ai travaillé."
      />

      <p className="font-barlowItalic text-base sm:w-[62%]">
        Voici les projets sur lesquels j&apos;ai travaillé en tant qu&apos;indépendant,
        employé et membre d&apos;un collectif. Cette liste contient des projets concrets
        (résolution d&apos;une problématique) mais aussi de petits projets fun et des
        challenges.
      </p>

      <ul className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4 md:gap-x-6 lg:gap-x-8">
        {publishedProjects.map((project) => (
          <li key={project.name}>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={project.link}
              className="group block transition-all duration-300 sm:hover:rotate-3 space-y-3 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <div className="w-14 h-14 rounded-full border flex items-center justify-center border-slate-200 dark:border-slate-700">
                <Image
                  src={project.logo}
                  alt=""
                  loading="lazy"
                  sizes="48px"
                  className="w-12 h-12 object-contain rounded-full"
                />
              </div>

              <Title as="h3" title={project.name} className="text-base font-barlowMedium" />
              <p className="text-[0.9375rem] w-72 max-w-full dark:text-gray-400">
                {project.description}
              </p>
              <span className="flex items-center space-x-2 font-barlowMedium group-hover:text-primary-strong dark:group-hover:text-primary">
                <BiLink className="rotate-90" size={16} aria-hidden="true" />
                <span>{new URL(project.link).hostname}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
