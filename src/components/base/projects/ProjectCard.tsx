import Image, { StaticImageData } from "next/image";
import React, { ReactNode } from "react";
import { BsDot } from "react-icons/bs";
import Title from "../Title";
import { useTheme } from "@/contexts/themeContext";
import Link from "next/link";

type ProjectCardProps = {
  src: string | StaticImageData;
  name: string;
  description?: string;
  technos?: string;
  projectType: string;
  colorProjectType: string;
  link?: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  src,
  name,
  description,
  technos,
  projectType,
  colorProjectType,
  link,
}) => {
  const { isDarkTheme } = useTheme();
  return (
    <div className=" text-sm space-y-2 ">
      <div className=" space-y-3 ">
        {/* <Link href={link} target="_blank" rel="noreferrer" className=" pb-"> */}
        <Image
          src={src}
          alt="projectImg"
          loading="lazy"
          className={`w-96 h-52 border aspect-[13/8] object-cover rounded-lg
             ${isDarkTheme ? "border-slate-700" : ""}`}
        />
        {/* </Link> */}
        <div className=" rounded-full flex items-center space-x-1 bg-slate-800 w-max py-1 px-2 ">
          {/* <BsDot color={colorProjectType} size={24} /> */}
          <span
            className={` h-2 w-2 rounded-full `}
            style={{ backgroundColor: colorProjectType }}
          ></span>
          <span className=" text-white">{projectType}</span>
        </div>
      </div>

      <div className=" space-y-1">
        <div className={`text-gray-500 font-barlowMedium `}> {technos} </div>

        <div className="">
          <Title
            title={name}
            className={`text-lg text-stone-500# font-barlowMedium  ${
              isDarkTheme ? "text-stone-400# " : ""
            } `}
          />
          <p
            className={`text-[15px] font-barlowMedium  ${
              isDarkTheme ? "text-gray-400 " : "text-gray-500"
            } `}
          >
            {" "}
            {description}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
