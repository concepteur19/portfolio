import Title from "@/components/base/Title";
import ProjectCard from "@/components/projects/ProjectCard";
import type { GetStaticProps } from "next";
import React from "react";
import { getProjects, type ProjectView } from "@/content/projects/load";

type ProjectsProps = { projects: ProjectView[] };

export const getStaticProps: GetStaticProps<ProjectsProps> = () => ({
  props: { projects: getProjects() },
});

const Index = ({ projects }: ProjectsProps) => {
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

      <ul className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 lg:gap-x-8">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
