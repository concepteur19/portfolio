import Title from "@/components/base/Title";
import { useTheme } from "@/contexts/themeContext";
import projectsData from "@/data/ProjectsData";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { BiLink } from "react-icons/bi";

const Index = () => {
  const { isDarkTheme } = useTheme();
  const [isCardHover, setIsCardHover] = useState(false);
  const [idCard, setIdCard] = useState<number | null>(null);

  const handleCardOver = (id: number) => {
    setIdCard(id);
    setIsCardHover(true);
  };

  const handleCardLeave = () => {
    setIsCardHover(false);
    setIdCard(null);
  };

  return (
    <div className=" space-y-8">
      <Title
        className="text-5xl md:text-6xl sm:w-[90%] md:w-2/3"
        title="Quelques projets sur lesquels j'ai travaillé."
      />

      <p className=" font-barlowItalic text-base sm:w-[62%]">
        {" "}
        {
          "Ici vous avez la liste de tous les projets sur lesquels j'ai trabaillé en tant que indépendant, employé et membre d'un collectif. Cette liste contient des projets concrets (résolution d'une problématique) mais aussi des petits projets fun et challenges..."
        }{" "}
      </p>

      <div className=" grid grid-flow-row md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4 md:gap-x-6 lg:gap-x-8 ">
        {projectsData.map((project, id) => {
          return (
            <Link key={id} target="_blank" rel="noreferrer" href={project.link}>
              <div
                onMouseEnter={() => handleCardOver(id)}
                onMouseLeave={() => handleCardLeave()}
             
                className={`transition-all duration-300 hover:rotate-3# sm:hover:rotate-3 space-y-3 border# rounded-lg p-4 h-fit# cursor-pointer  ${
                  isDarkTheme
                    ? "hover:bg-slate-800 "
                    : "hover:bg-gray-100 hover:bg-pink-10#0 hover:bg-opacity-65"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-full border flex items-center justify-center ${
                    isDarkTheme
                      ? "border-slate-700 bg-slate-800#"
                      : " border-slate-200 bg-gray-100#"
                  }`}

                  // style={ isCardHover && idCard === id ? { borderColor: "#fd7fa470", } : {} }
                >
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
                  className={`text-[0.9375rem] w-72 ${
                    isDarkTheme ? " text-gray-400 " : ""
                  }`}
                >
                  {" "}
                  {project.description}{" "}
                </p>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={project.link}
                  className={` flex items-center space-x-2 font-barlowMedium ${
                    isCardHover && idCard === id ? " text-primary" : ""
                  } `}
                >
                  <BiLink className=" rotate-90 " size={16} />
                  <span> {project.link.split("/")[2]} </span>
                </Link>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
