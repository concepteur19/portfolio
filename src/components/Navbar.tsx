import React, { useContext, useState } from "react";
import Link from "next/link";
import { BsMoon, BsSun } from "react-icons/bs";
import Image from "next/image";
import ThemeContext from "@/contexts/themeContext";
import { useRouter } from "next/router";

function Navbar(props: any) {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
  const router = useRouter();
  const isActive = (path: string) => path === router.pathname;
  const [isDarkBottonOver, setIsDarkBottonOver] = useState(false);

  console.log(router.pathname);
  return (
    <nav className=" flex items-center justify-between w-full py-8 ">
      <Link href="/">
        <div
          className={`h-12 w-12 rounded-full border-2 p-[2px] cursor-pointer ${
            router.pathname === "/" || router.pathname === ""
              ? "border-primary"
              : ""
          } ${isDarkTheme ? "border-slate-400 " : " border-slate-200"}`}
        >
          {/* <span className=""> TCHOMGUI </span> */}

          <Image
            src={props.src}
            alt="profile"
            className=" h-full w-full rounded-full object-cover "
          />
        </div>
      </Link>

      <div
        className={`${
          isDarkTheme
            ? " bg-slate-800 border-slate-700 "
            : "bg-[#fffdfd] border-slate-200"
        } border  rounded-full shadow-sm flex flex-col py-2# h-12 justify-center items-center px-8 `}
      >
        <ul className=" flex space-x-8 font-barlowMedium ">
          <li
            className={`hover:text-primary flex justify-center items-center ${
              isActive("/about") && "active border-y-primary h-12 border-y "
            } `}
          >
            <Link href="/about">A Propos</Link>
          </li>
          <li
            className={`hover:text-primary hover:h-12 flex justify-center items-center ${
              isActive("/projects") && "active border-y-primary h-12 border-y "
            } `}
          >
            <Link href="/projects">Projets</Link>
          </li>
          <li
            className={`hover:text-primary flex justify-center items-center ${
              isActive("/blog") && "active border-y-primary h-12 border-y "
            } `}
          >
            <Link href="/blog">Articles</Link>
          </li>
        </ul>
      </div>

      <button
        type="button"
        aria-label="Toggle Dark Mode"
        aria-expanded={isDarkTheme}
        aria-controls="dark-mode-toggle"
        aria-pressed={isDarkTheme}
        onMouseEnter={() => setIsDarkBottonOver(true)}
        onMouseLeave={() => setIsDarkBottonOver(false)}
        className={`border p-2 rounded-full shadow-md  ${
          isDarkTheme
            ? " bg-slate-800 border-slate-700 hover:bg-slate-700 "
            : " hover:bg-slate-100 "
        }`}
        onClick={() => setIsDarkTheme(!isDarkTheme)}
      >
        {isDarkTheme ? (
          <BsSun
            size={18}
            className={isDarkBottonOver ? "text-primary stroke-[0.3px]" : ""}
          />
        ) : (
          <BsMoon
            size={14}
            className={` m-[2px] ${isDarkBottonOver ? "text-primary" : ""}`}
          />
        )}
      </button>
    </nav>
  );
}

export default Navbar;
