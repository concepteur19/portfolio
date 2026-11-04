import Image from "next/image";
import React from "react";
import type { ProjectCover as Cover } from "@/content/projects/load";

type ProjectCoverProps = {
  cover: Cover;
  color: string;
  sizes: string;
  preload?: boolean;
  fit?: "cover" | "contain";
  className?: string;
};

// Image cover, or a fallback built on the context colour: the project logo, else its initials.
const ProjectCover: React.FC<ProjectCoverProps> = ({
  cover,
  color,
  sizes,
  preload = false,
  fit = "cover",
  className = "",
}) => {
  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 ${className}`}
      style={cover.kind === "image" ? undefined : { backgroundColor: color }}
    >
      {cover.kind === "image" && (
        <Image
          src={cover.image}
          alt={cover.alt}
          fill
          sizes={sizes}
          preload={preload}
          placeholder={cover.image.blurDataURL ? "blur" : "empty"}
          className={fit === "contain" ? "object-contain" : "object-cover object-top"}
        />
      )}
      {cover.kind === "logo" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white p-3">
            <Image src={cover.logo} alt="" width={56} height={56} className="h-14 w-14 object-contain" />
          </span>
        </div>
      )}
      {cover.kind === "initials" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-barlowBold text-5xl text-white"
        >
          {cover.initials}
        </span>
      )}
    </div>
  );
};

export default ProjectCover;
