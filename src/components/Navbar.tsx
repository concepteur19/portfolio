import React from "react";
import Link from "next/link";
import { BsMoon, BsSun } from "react-icons/bs";
import Image, { type StaticImageData } from "next/image";
import { useTheme } from "@/contexts/themeContext";
import { useRouter } from "next/router";
import { navItems } from "@/content/site";

function Navbar({ src }: { src: StaticImageData }) {
  const { isDarkTheme, toggleTheme } = useTheme();
  const { pathname } = useRouter();

  return (
    <nav
      aria-label="Navigation principale"
      className="flex items-center justify-between w-full py-8"
    >
      <Link
        href="/"
        aria-label="Accueil"
        className={`h-12 w-12 rounded-full border-2 p-[2px] ${
          pathname === "/" ? "border-primary" : "border-slate-200 dark:border-slate-400"
        }`}
      >
        <Image
          src={src}
          alt=""
          sizes="48px"
          className="h-full w-full rounded-full object-cover"
        />
      </Link>

      <div className="border rounded-full shadow-xs flex h-12 justify-center items-center px-8 bg-[#fffdfd] border-slate-200 dark:bg-slate-800 dark:border-slate-700">
        <ul className="flex space-x-8 font-barlowMedium">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className="flex justify-center items-center">
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`hover:text-primary-strong dark:hover:text-primary ${
                    isActive ? "active" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        aria-label="Thème sombre"
        aria-pressed={isDarkTheme}
        onClick={toggleTheme}
        className="group border p-2 rounded-full shadow-md max-sm:absolute top-24 right-4 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700"
      >
        <BsMoon
          size={14}
          aria-hidden="true"
          className="m-[2px] dark:hidden group-hover:text-primary-strong"
        />
        <BsSun
          size={18}
          aria-hidden="true"
          className="hidden dark:block group-hover:text-primary"
        />
      </button>
    </nav>
  );
}

export default Navbar;
