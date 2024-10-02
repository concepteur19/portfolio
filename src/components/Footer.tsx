import Link from "next/link";
import React, { useContext } from "react";
import {
  BiCopyright,
  BiLogoGithub,
  BiLogoGmail,
  BiLogoLinkedin,
} from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import ThemeContext from "@/contexts/themeContext";

const Footer = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const currentDate = new Date().getFullYear();
  return (
    <div className=" space-y-4 w-full pb-4 text-center bg-transparent ">
      {/* <span className=" font-bold text-xl ">
        {" "}
        G.O.A.T JS{" "}
      </span> */}

      <hr className={`${isDarkTheme ? " border-slate-700" : ""}`} />
      <div className=" flex flex-col md:flex-row space-y-3 items-center justify-between px-4 xl:px-[8%] 2xl:px-[21.5%] w-full py-4">
        <div className=" flex justify-center space-x-6 ">
          <Link
            href={"https://twitter.com/nguening"}
            target="_blank"
            className=" bg-slate-800 p-2 rounded-md shadow-lg hover:-translate-y-1 transition-all duration-200 "
          >
            <BsTwitterX color="#fff" />
          </Link>
          <Link
            href={"https://github.com/concepteur19"}
            target="_blank"
            className=" bg-slate-800 p-2 rounded-md shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <BiLogoGithub color="#fff" size={18} />
          </Link>
          <Link
            href={
              "https://linkedin.com/in/zobel-ulrich-nguening-tchomgui-825a01224/"
            }
            target="_blank"
            className=" bg-slate-800 p-2 rounded-md shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <BiLogoLinkedin color="#fff" size={18} />
          </Link>
          <Link
            href={"mailto:zobel.tchomgui@gmail.com"}
            target="_blank"
            className=" bg-slate-800 p-2 rounded-md shadow-lg  hover:-translate-y-1 transition-all duration-200"
          >
            <BiLogoGmail color="#fff" size={18} />
          </Link>
        </div>
        <div className=" flex items-center font-barlowMedium justify-center space-x-2 ">
          <BiCopyright size={24} />{" "}
          <span>2024 Concepteur JS. All Rights Reserved</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
