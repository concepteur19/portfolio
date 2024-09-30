import React, { useState } from "react";
import Title from "@/components/base/Title";
import ProjectCard from "../base/projects/ProjectCard";
import parcoursData from "@/data/CertificaionsData";
import projectsData from "@/data/ProjectsData";
import {
  BsArrowRight,
  BsCodeSlash,
  BsDownload,
  BsFolder,
} from "react-icons/bs";
import experiencePro from "@/data/ExperienceData";
import { GrMysql } from "react-icons/gr";
import {
  BiLogoBootstrap,
  BiLogoReact,
  BiLogoRedux,
  BiLogoTailwindCss,
  BiLogoTypescript,
} from "react-icons/bi";
import { IoLogoLaravel } from "react-icons/io5";
import { TbBrandNextjs } from "react-icons/tb";
import Image from "next/image";
import { useTheme } from "@/contexts/themeContext";
import Link from "next/link";

const stack = [
  {
    name: "React js",
    icone: <BiLogoReact key={1} size={32} className=" hover:text-[#4da1f1] " />,
  },
  {
    name: "Redux",
    icone: <BiLogoRedux key={2} size={32} className=" hover:text-[#5e72e4] " />,
  },
  {
    name: "Next js",
    icone: <TbBrandNextjs key={3} size={32} className=" hover:text-[#111] " />,
  },
  {
    name: "TailwindCss",
    icone: (
      <BiLogoTailwindCss key={4} size={32} className=" hover:text-[#4da1f1] " />
    ),
  },
  {
    name: "Bootstrap",
    icone: (
      <BiLogoBootstrap key={5} size={32} className=" hover:text-[#5e72e4] " />
    ),
  },
  {
    name: "Laravel",
    icone: (
      <IoLogoLaravel key={6} size={32} className=" hover:text-[#e30613] " />
    ),
  },
  {
    name: "Typescript",
    icone: (
      <BiLogoTypescript key={7} size={32} className=" hover:text-[#1e73c3] " />
    ),
  },
  {
    name: "Mysql",
    icone: <GrMysql size={32} key={8} className=" hover:text-[#0d569a] " />,
  },
];

function Home({ profileImg }: { profileImg: string }) {
  const [visible, setVisible] = useState<boolean>(false);
  const [idStack, setIdStack] = useState<number>();
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  const handleMouseEnter = (id: number) => {
    setVisible(true);
    setIdStack(id);
  };
  const handleMouseLeave = (id: number) => {
    setVisible(false);
    setIdStack(undefined);
  };

  const { isDarkTheme } = useTheme();

  return (
    <div className=" space-y-12 ">
      <div className=" flex items-center space-x-6 justify-between">
        <div className=" space-y-8 ">
          <Title
            title="Hey, je suis Nguening zobel Ing. Logiciel"
            className="text-6xl w-[85%]"
          />
          <p className=" text-lg  w-[75%]">
            {
              "En tant qu'ingénieur logiciel spécialisé dans le développement front-end, je crée des sites web esthétiques et fonctionnels en utilisant principalement Nextjs et React. Avec une passion pour l'amélioration de mes compétences et le travail en équipe, mon objectif est d'offrir une excellente expérience utilisateur. Consultez mon portfolio pour en savoir plus. "
            }
          </p>
        </div>

        <Image
          src={profileImg}
          alt=""
          width={280}
          height={100}
          className={` rounded-lg border-[2px]# rotate-3 ${
            isDarkTheme
              ? " bg-slate-800 border-slate-700 "
              : "bg-[#fffdfd] border-slate-200"
          } `}
        ></Image>
      </div>

      <div className=" space-y-8 ">
        <Title title="Mon parcours scolaire" className="text-2xl" />
        <div className=" space-y-8">
          {parcoursData.map((data, id) => {
            return (
              <div key={id} className="flex space-x-8 space-x-12">
                <p
                  className={`text-base p-1 text-stone-500 ${
                    isDarkTheme ? "text-stone-400" : ""
                  }`}
                >
                  {" "}
                  {data.year}{" "}
                </p>
                <div className=" flex flex-col space-y-2 ">
                  <span className=" text-lg font-barlowMedium ">
                    {data.certificate}
                  </span>
                  <span className=" text-[15px] "> {data.school} </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className=" space-y-8 ">
        <div className=" flex justify-between items-center">
          <Title title="Mon projets phares" className="text-2xl" />

          <Link href={"/projects"}>
            <div
              className={`w-max# ${
                isDarkTheme ? "hover:bg-slate-800" : "hover:bg-slate-300"
              } flex items-center space-x-1 cursor-pointer bg-opacity-0 hover:bg-opacity-100 transition-all duration-300 p-2 rounded-full  `}
              onMouseEnter={() => setMouseOver(true)}
              onMouseLeave={() => setMouseOver(false)}
            >
              {" "}
              <span className={`text-base font-barlowMedium } `}>
                Voir plus
              </span>{" "}
              <BsArrowRight
                className={` ${
                  mouseOver ? " translate-x-1 transition-all duration-300 " : ""
                } `}
                size={18}
              />{" "}
            </div>
          </Link>
        </div>

        <div className=" grid grid-flow-row grid-cols-3 gap-8">
          {projectsData.slice(0, 3).map((data, id) => {
            return (
              <ProjectCard
                key={id}
                src={data.imgSrc}
                name={data.name}
                description={data.description}
                projectType={data.projectType}
                technos={data.technos}
                colorProjectType={data.colorProjectType}
              />
            );
          })}
        </div>
      </div>

      <div className=" space-x-8 flex items-start grid grid-flow-row grid-cols-2 ">
        <div
          className={` ${
            isDarkTheme ? "border-slate-700" : ""
          } border rounded-lg p-4 space-y-3 `}
        >
          <div
            className={`flex items-center text-stone-500 space-x-2 ${
              isDarkTheme ? "text-stone-400" : ""
            }`}
          >
            {/* <Image src="" alt="12" className=" rounded-full h-5 w-5 border " ></Image> */}
            <BsFolder size={22} />
            <Title
              title="Expériences Professionnelle"
              className="text-lg font-barlowMedium "
            />
          </div>

          <p className=" w-[23rem]# text-base">
            {
              "j'accumule près de 18 mois d'expérience, expérience comprenant des stages académiques, contrat de préemplois et freelance."
            }
          </p>

          <div className=" space-y-2">
            {experiencePro.map((data, id) => {
              return (
                <div key={id} className="flex space-x-8 space-x-12">
                  <p
                    className={`w-32 text-base p-1 text-stone-500 ${
                      isDarkTheme ? "text-stone-400" : ""
                    } `}
                  >
                    {" "}
                    {data.structure}{" "}
                  </p>
                  <div className=" flex flex-col space-y- ">
                    <span className=" text-base font-barlowMedium ">
                      {data.poste}
                    </span>
                    <span className=" text-[15px] "> {data.year} </span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className={` w-full rounded-lg p-3 text-base ${
              isDarkTheme ? "" : "text-white"
            } font-barlowMedium bg-slate-800 hover:-translate-y-[3px] transition-all duration-100 flex items-center justify-center  space-x-1`}
          >
            {" "}
            <span>Téléchargez mon CV</span> <BsDownload size={18} />
          </button>
        </div>
        <div
          className={` ${
            isDarkTheme ? "border-slate-700" : ""
          } border rounded-lg p-4 space-y-3 `}
        >
          <div
            className={`flex items-center text-stone-500 space-x-2 ${
              isDarkTheme ? "text-stone-400" : ""
            }`}
          >
            {/* <Image src="" alt="12" className=" rounded-full h-5 w-5 border " ></Image> */}
            <BsCodeSlash size={22} />
            <Title
              title="Ma Stack Technique"
              className="text-lg font-barlowMedium "
            />
          </div>

          <p className=" w-[23rem]# text-base">
            {
              "Je me défini comme quelqu'un qui apprend vite et qui peut etre assez polivalent , ce qui ne m'empêche pas d'avoir des technologies préférentielles."
            }
          </p>

          <div className=" flex items-center space-x-4 relative">
            {stack.map((data, id) => (
              <div
                key={id}
                className=" cursor-pointer "
                onMouseEnter={() => handleMouseEnter(id)}
                onMouseLeave={() => handleMouseLeave(id)}
              >
                {" "}
                {data.icone}
                {visible && idStack === id && (
                  <span
                    className={`absolute -top-7 bg-slate-600 text-white p-1 px-2 rounded-full `}
                  >
                    {" "}
                    {data.name}{" "}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
