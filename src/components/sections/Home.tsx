import React from "react";
import Title from "@/components/base/Title";
import ProjectCard from "../base/projects/ProjectCard";
import projectsData, { isPublishable } from "@/data/ProjectsData";
import { BsArrowRight, BsCodeSlash, BsDownload, BsFolder } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import portrait from "@/assets/images/pro.jpg";
import { formatPeriod } from "@/content/dates";
import type { Education, Experience, Profile, SkillGroup } from "@/content";

export type HomeProps = {
  profile: Profile;
  tagline: string;
  currentRole: Experience;
  experiences: { main: Experience[]; early: Experience[] };
  education: Education[];
  skillGroups: SkillGroup[];
  experienceLabel: string;
};

const featuredProjects = projectsData
  .filter(isPublishable)
  .filter((project) => project.imgSrc)
  .slice(0, 3);

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const organizationLine = (entry: Experience) =>
  entry.client ? `${entry.organization}, en mission chez ${entry.client}` : entry.organization;

function Home({
  profile,
  tagline,
  currentRole,
  experiences,
  education,
  skillGroups,
  experienceLabel,
}: HomeProps) {
  return (
    <div className="space-y-12">
      <section className="flex items-center gap-6 justify-between">
        <div className="space-y-6">
          <Title
            as="h1"
            title={`Hey, je suis ${profile.displayName}, ${profile.title}`}
            className="text-5xl md:text-6xl sm:w-[90%] md:w-[85%]"
          />
          <p className="text-lg font-barlowMedium">
            {currentRole.role} chez {organizationLine(currentRole)}
          </p>
          <p className="text-lg w-[90%] md:w-[75%] text-gray-500 dark:text-gray-400">
            {tagline}
          </p>
        </div>

        <Image
          src={portrait}
          alt={`Portrait de ${profile.displayName}`}
          sizes="300px"
          priority
          className="hidden lg:block w-[300px] h-auto rounded-lg rotate-3 bg-[#fffdfd] border-slate-200 dark:bg-slate-800 dark:border-slate-700"
        />
      </section>

      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <Title title="Mes projets phares" className="text-2xl" />

          <Link
            href="/projects"
            className="group flex items-center space-x-1 p-2 rounded-full transition-all duration-300 hover:bg-slate-300 dark:hover:bg-slate-800"
          >
            <span className="text-base font-barlowMedium">Voir plus</span>
            <BsArrowRight
              aria-hidden="true"
              className="transition-all duration-300 group-hover:translate-x-1"
              size={18}
            />
          </Link>
        </div>

        <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 lg:gap-x-8">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.name}
              src={project.imgSrc}
              name={project.name}
              description={project.description}
              projectType={project.projectType}
              technos={project.technos}
              colorProjectType={project.colorProjectType}
              link={project.link}
            />
          ))}
        </div>
      </section>

      <div className="md:gap-x-4 lg:gap-x-8 gap-y-8 items-start grid grid-flow-row md:grid-cols-2">
        <section className="border rounded-lg p-4 space-y-4 border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-2 text-stone-500 dark:text-stone-400">
            <BsFolder size={22} aria-hidden="true" />
            <Title title="Expérience professionnelle" className="text-lg font-barlowMedium" />
          </div>

          <p className="text-base">
            {capitalize(experienceLabel)} d&apos;expérience en développement, en entreprise, en
            mission et en freelance.
          </p>

          <ol className="space-y-5">
            {experiences.main.map((entry) => (
              <li key={entry.id} className="space-y-1">
                <p className="text-base font-barlowMedium">{entry.role}</p>
                <p className="text-[15px]">{organizationLine(entry)}</p>
                <p className="text-[15px] text-gray-500 dark:text-gray-400">
                  {formatPeriod(entry.start, entry.end)}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-[15px]">
                  {entry.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          {experiences.early.length > 0 && (
            <details className="text-[15px]">
              <summary className="cursor-pointer font-barlowMedium">Débuts</summary>
              <ul className="mt-3 space-y-2">
                {experiences.early.map((entry) => (
                  <li key={entry.id}>
                    <span className="font-barlowMedium">{entry.role}</span>, {entry.organization}
                    <span className="text-gray-500 dark:text-gray-400">
                      {" "}
                      ({formatPeriod(entry.start, entry.end)})
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          )}

          <a
            href={profile.cv.path}
            download={profile.cv.downloadName}
            className="w-full rounded-lg p-3 text-base text-white font-barlowMedium bg-slate-700 hover:translate-y-[-3px] transition-all duration-100 flex items-center justify-center space-x-1"
          >
            <span>Télécharger mon CV</span> <BsDownload size={18} aria-hidden="true" />
          </a>
        </section>

        <section className="border rounded-lg p-4 space-y-4 border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-2 text-stone-500 dark:text-stone-400">
            <BsCodeSlash size={22} aria-hidden="true" />
            <Title title="Compétences" className="text-lg font-barlowMedium" />
          </div>

          <div className="space-y-4">
            {skillGroups.map((group) => (
              <div key={group.id} className="space-y-2">
                <Title
                  as="h3"
                  title={group.label}
                  className="text-sm font-barlowMedium text-gray-500 dark:text-gray-400"
                />
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border px-2 py-0.5 text-sm border-slate-200 dark:border-slate-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="space-y-8">
        <Title title="Formation" className="text-2xl" />
        <ul className="space-y-8">
          {education.map((entry) => (
            <li key={entry.id} className="flex space-x-2 sm:space-x-4 md:space-x-8 lg:space-x-12">
              <p className="text-base pt-1 w-28 text-gray-500 dark:text-gray-400">
                {entry.startYear ? `${entry.startYear} - ${entry.endYear}` : entry.endYear}
              </p>
              <div className="flex flex-col space-y-2">
                <span className="text-lg font-barlowMedium">{entry.degree}</span>
                <span className="text-[15px]">{entry.school}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Home;
