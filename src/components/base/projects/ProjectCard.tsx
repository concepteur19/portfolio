import Image from "next/image";
import React, { ReactNode } from "react";
import { BsDot } from "react-icons/bs";
import Title from "../Title";
import { useTheme } from "@/contexts/themeContext";

type ProjectCardProps = {
  src: string;
  name: string;
  description?: string;
  technos?: string;
  projectType: string;
  colorProjectType: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  src,
  name,
  description,
  technos,
  projectType,
  colorProjectType,
}) => {
  const { isDarkTheme } = useTheme();
  return (
    <div className=" text-sm space-y-2 ">
      <a href="http://">
        <Image
          src={src}
          alt="projectImg"
          loading="lazy"
          className={`w-96 h-52 border aspect-[13/8] object-cover rounded-lg ${
            isDarkTheme ? "border-slate-700" : ""
          }`}
        />
      </a>

      <div className=" rounded-full flex items-center space-x-1 bg-slate-800 w-max py-1 px-2">
        {/* <BsDot color={colorProjectType} size={24} /> */}
        <div
          className={` h-2 w-2 rounded-full `}
          style={{ backgroundColor: colorProjectType }}
        ></div>
        <span className=" text-white">{projectType}</span>
      </div>

      <p className=" text-gray-500"> {technos} </p>

      <div className=" space-y-3">
        <Title
          title={name}
          className={`text-lg p-1 text-stone-500 font-barlowMedium  ${
            isDarkTheme ? "text-stone-400" : ""
          } `}
        />
        <p className="text-[15px]"> {description} </p>
      </div>
    </div>
  );
};

export default ProjectCard;
