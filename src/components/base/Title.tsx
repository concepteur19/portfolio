import React from "react";

type TitleProps = {
  className?: string;
  title: string;
};

const Title: React.FC<TitleProps> = ({ className, title }) => {
  return (
    <h1
    // animate={{ y: -30 }}
    // transition={{ type: "tween", duration: 0.5 }}
    className={`font-barlowBold text-2xl text-left ${className}` }
    // {...rest} // Utilisation des props restantes
    >
      {title}
    </h1>
  );
};

export default Title;
