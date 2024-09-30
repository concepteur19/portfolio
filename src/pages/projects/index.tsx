import Title from "@/components/base/Title";
import { useTheme } from "@/contexts/themeContext";
import projectsData from "@/data/ProjectsData";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { BiLink } from "react-icons/bi";

const Index = () => {
  const { isDarkTheme } = useTheme();

  return (
    <div className=" space-y-8">
      <Title
        className=" text-6xl w-2/3"
        title="Quelques projets sur lesquels j'ai travaillé."
      />

      <p className=" font-barlowItalic text-base w-[62%]">
        {" "}
        {
          "Ici vous avez la liste de tous les projets sur lesquels j'ai trabaillé en tant que indépendant, employé et membre d'un collectif. Cette liste contient des projets concrets (résolution d'une problématique) mais aussi des petits projets fun et challenges..."
        }{" "}
      </p>

      <div className=" grid grid-flow-row grid-cols-3 gap-8 ">
        {projectsData.map((project, id) => {
          return (
            <div
              key={id}
              className={`transition-all duration-300 hover:rotate-3 space-y-3 border# rounded-lg p-4 h-fit# cursor-pointer  ${
                isDarkTheme ? "hover:bg-slate-800 " : "hover:bg-gray-100"
              }`}
            >
              <div className={`w-14 h-14 rounded-full border flex items-center justify-center ${
                    isDarkTheme ? "border-slate-700 bg-slate-800#" : ""
                  }`}>
                <Image
                  src={project.logo}
                  alt="projectImg"
                  loading="lazy"
                  className={`w-12 h-12 object-contain rounded-full border# ${
                    isDarkTheme ? "border-slate-700# bg-slate-800#" : ""
                  }`}
                />
              </div>

              <Title
                title={project.name}
                className=" text-base font-barlowMedium "
              />
              <p
                className={`text-[0.9375rem]  ${
                  isDarkTheme ? " text-gray-400 " : ""
                }`}
              >
                {" "}
                {project.description}{" "}
              </p>
              <Link
                href={project.link}
                className=" flex items-center space-x-2 font-barlowMedium hover:text-primary"
              >
                <BiLink className=" rotate-90 " size={16} />
                <span> {project.name} </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
