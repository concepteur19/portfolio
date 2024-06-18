import React, { ReactNode } from "react";

type ProjectCardProps = {
  className?: string;
  src: string;
  alt: string;
  name: string;
  description?: string;
  children?: ReactNode;
  tech?: string;
  maintenance?: boolean;
  link: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  className = "",
  src,
  alt,
  name,
  description,
  children,
  tech,
  maintenance,
  link,
}) => {
  return (
    <div className={className}>
      <img src={src} alt={alt} />
      <div>
        <span className="name-project">{name}</span>
        <br />
        {description && (
          <>
            <span className="description">{description}</span>
            <br />
          </>
        )}
        {children}
        {tech && <span style={{ fontSize: "12px" }}>{tech}</span>}
        {maintenance && (
          <div style={{ fontSize: "12px" }}>Software maintenance and updates.</div>
        )}
        <div className="link-div">
          <i style={{ fontSize: "12px" }} className="fa fa-link" aria-hidden="true"></i>
          <a href={link} className="link-a" style={{ fontSize: "12px" }}>
            Visit Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
