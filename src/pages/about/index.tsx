import Title from "@/components/base/Title";
import Image from "next/image";
import React from "react";
import profileImg from "@/assets/images/pro.jpeg";
import { useTheme } from "@/contexts/themeContext";
import Link from "next/link";
import {
  BiCopyright,
  BiLogoGithub,
  BiLogoGmail,
  BiLogoLinkedin,
} from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";

const Index = () => {
  const { isDarkTheme } = useTheme();
  return (
    <div className=" flex items-start min-h-[65vh]# space-x- pt-10 justify-between#">
      <div className=" space-y-8 ">
        <Title
          title="Hey, je suis Nguening zobel Ing. Logiciel"
          className="text-5xl md:text-6xl sm:w-[90%] md:w-[85%]"
        />
        <p
          className={`  font-barlowItalic text-lg w-[90%] md:w-[85%]${
            isDarkTheme ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {
            "Je travaille actuellement en tant développeur frontend chez Happyness SARL, je suis responsable de la créations d'interfaces utilisateur, agréables, optimisées et responsives avec pour objectif de rendre remarquable l'expérience des utilisateurs sur nos applications. "
          }
        </p>

        <p className=" font-barlowItalic text-lg w-[90%] md:w-[85%]">
          {
            "Je travaille aussi en tant qu'enseignant d'informatique au College Bilingue Emergence, un établissment situé à Bonaberi - Douala. Je me défini comme quelqu'un d'assez ouvert et curieux, capacités qui couplées à mes connaissances en informatique, m'ont permis de facilement m'adapter à l'enseignement. "
          }
        </p>

        <p className=" font-barlowItalic text-lg w-[90%] md:w-[85%]">
          {
            " Je suis un passionné de design, dessin etc. J'adore le niveau de détail avec lequel certains artistes réalisent leurs oeuvres..."
          }
        </p>
      </div>

      <div className=" flex flex-col justify-between space-y-8 ">
        <Image
          src={profileImg}
          alt=""
          // width={400}
          // height={200}
          className={` hidden lg:block rounded-lg border-[2px]# rotate-3 ${
            isDarkTheme
              ? " bg-slate-800 border-slate-700 "
              : "bg-[#fffdfd] border-slate-200"
          } `}
        />
        <div className=" flex flex-col justify-center space-y-5 ">
          <Link href={"https://twitter.com/nguening"}
              target="_blank"  className="flex space-x-2 items-center">
            <div
              
              // className=" bg-slate-800 w-fit p-2 rounded-md shadow-lg hover:-translate-y-1 transition-all duration-200 "
            >
              <BsTwitterX color="#fff" />
            </div>
            <span>@nguening</span>
          </Link>

          <Link
            href={"https://github.com/concepteur19"}
            target="_blank"
            className="flex space-x-2 items-center"
          >
            <div

            // className=" bg-slate-800  w-fit p-2 rounded-md shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <BiLogoGithub color="#fff" size={18} />
            </div>
            <span>@concepteur19</span>
          </Link>

          <Link
            href={
              "https://linkedin.com/in/zobel-ulrich-nguening-tchomgui-825a01224/"
            }
            target="_blank"
            className="flex space-x-2 items-center"
          >
            <div

            // className=" bg-slate-800 w-fit p-2 rounded-md shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <BiLogoLinkedin color="#fff" size={18} />
            </div>
            <span>zobel-ulrich-nguening-tchomgui</span>
          </Link>

          <Link
            href={"mailto:zobel.tchomgui@gmail.com"}
            target="_blank"
            className="flex space-x-2 items-center"
          >
            <div
            // href={"mailto:zobel.tchomgui@gmail.com"}
            // target="_blank"
            // className=" bg-slate-800 w-fit p-2 rounded-md shadow-lg  hover:-translate-y-1 transition-all duration-200"
            >
              <BiLogoGmail color="#fff" size={18} />
            </div>
            <span>zobel.tchomgui@gmail.com</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
