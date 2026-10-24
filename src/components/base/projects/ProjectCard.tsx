import Image, { StaticImageData } from "next/image";
import React from "react";
import Title from "../Title";
import Link from "next/link";

type ProjectCardProps = {
  src: string | StaticImageData;
  name: string;
  description?: string;
  technos?: string;
  projectType: string;
  colorProjectType: string;
  link: string;
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
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block text-sm space-y-2"
    >
      <div className="space-y-3">
        <Image
          src={src}
          alt=""
          loading="lazy"
          sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="w-96 h-52 border aspect-13/8 object-cover rounded-lg border-slate-200 dark:border-slate-700"
        />
        <div className="rounded-full flex items-center space-x-1 bg-slate-800 w-max py-1 px-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: colorProjectType }}
          ></span>
          <span className="text-white">{projectType}</span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="font-barlowMedium text-gray-500 dark:text-gray-400">{technos}</div>

        <div>
          <Title
            as="h3"
            title={name}
            className="text-lg font-barlowMedium group-hover:text-primary-strong dark:group-hover:text-primary"
          />
          <p className="text-[15px] font-barlowMedium text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
