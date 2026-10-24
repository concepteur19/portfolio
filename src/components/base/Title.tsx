import React from "react";

type TitleProps = {
  className?: string;
  title: string;
  as?: "h1" | "h2" | "h3";
};

const Title: React.FC<TitleProps> = ({ className, title, as: Tag = "h2" }) => {
  return (
    <Tag className={`font-barlowBold text-2xl text-left ${className}`}>
      {title}
    </Tag>
  );
};

export default Title;
