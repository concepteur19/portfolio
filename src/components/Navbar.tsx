import React, { useContext, useState } from "react";
import Link from "next/link";
import { BsMoon, BsSun } from "react-icons/bs";
import Image from "next/image";
import ThemeContext from "@/contexts/themeContext";

function Navbar(props: any) {

  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

  return (
    <nav className=" flex items-center justify-between w-full py-8 ">
      <div className={`h-12 w-12 rounded-full border p-[2px] cursor-pointer ${isDarkTheme ? "border-slate-400 " : " border-slate-200"}`}>
        {/* <span className=""> TCHOMGUI </span> */}
        <Image src={props.src} alt="profile" className=" h-full w-full rounded-full" />
      </div>

      <div
        className={`${isDarkTheme ? " bg-slate-800 border-slate-700 " : "bg-[#fffdfd] border-slate-200"} border  rounded-full shadow-sm flex flex-col py-2 px-4 `}
      >
        <ul className="navlist flex space-x-8 font-barlowMedium ">
          <li className="navitem hover:opacity-60">
            <Link href="/about">About</Link>
          </li>
          <li className="navitem hover:opacity-60">
            <Link href="/projects">Projects</Link>
          </li>
          <li className="navitem hover:opacity-60">
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
      </div>

      <button
        className={`border p-2 rounded-full shadow-md ${isDarkTheme? " bg-slate-800 border-slate-700 " : ""}`}
        onClick={() => setIsDarkTheme(!isDarkTheme)}
       
      >
        {isDarkTheme ? (
         <BsSun size={18} className=" " />
        ) : (
          <BsMoon size={14} className=" text-slate-500 m-[2px] " />
        )}
      </button>
    </nav>
  );
}

export default Navbar;
