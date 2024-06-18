import Link from "next/link";
import React from "react";
import {
  BiCopyright,
  BiLogoGithub,
  BiLogoGmail,
  BiLogoLinkedin,
} from "react-icons/bi";
import { BsGithub, BsTwitterX } from "react-icons/bs";

const Footer = () => {
  const currentDate = new Date().getFullYear();
  return (
    <div className=" space-y-4 w-full pb-4 ">
      <h1 className=" font-medium text-center text-xl text-yellow ">
        {" "}
        G.O.A.T JS{" "}
      </h1>
      <ul className=" flex justify-center space-x-6">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#projects">Portfolio</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <div className=" flex justify-center space-x-6 pb-4 ">
        <Link
          href={"https://twitter.com/nguening"}
          target="_blank"
          className=" bg-slate-800 p-2 rounded-md shadow-lg shadow-gray-400"
        >
          <BsTwitterX color="#fff" />
        </Link>
        <Link
          href={"https://github.com/concepteur19"}
          target="_blank"
          className=" bg-slate-800 p-2 rounded-md shadow-lg shadow-gray-400"
        >
          <BiLogoGithub color="#fff" size={18} />
        </Link>
        <Link
          href={
            "https://linkedin.com/in/zobel-ulrich-nguening-tchomgui-825a01224/"
          }
          target="_blank"
          className=" bg-slate-800 p-2 rounded-md shadow-lg shadow-gray-400"
        >
          <BiLogoLinkedin color="#fff" size={18} />
        </Link>
        <Link
          href={"mailto:zobel.tchomgui@gmail.com"}
          target="_blank"
          className=" bg-slate-800 p-2 rounded-md shadow-lg shadow-gray-400 "
        >
          <BiLogoGmail color="#fff" size={18} />
        </Link>
      </div>

      <hr />

      <div className=" flex items-center justify-center space-x-2 text-slate-600">
        <BiCopyright size={24} /> <span>2023 Concepteur JS. All Rights Reserved</span>
      </div>
    </div>
  );
};

export default Footer;
