import Link from "next/link";
import React from "react";
import { BiCopyright } from "react-icons/bi";
import SocialIcon from "@/components/base/SocialIcon";
import { profile } from "@/content/profile";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="space-y-4 w-full pb-4 text-center bg-transparent">
      <hr className="border-slate-200 dark:border-slate-700" />
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between px-4 xl:px-[8%] 2xl:px-[21.5%] w-full py-4">
        <ul className="flex justify-center space-x-6">
          {profile.socials.map((social) => {
            const isMail = social.network === "email";
            return (
              <li key={social.network}>
                <Link
                  href={social.url}
                  aria-label={social.label}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noopener noreferrer"}
                  className="block bg-slate-800 text-white p-2 rounded-md shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <SocialIcon network={social.network} />
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="flex items-center font-barlowMedium justify-center space-x-2">
          <BiCopyright size={24} aria-hidden="true" />
          <span suppressHydrationWarning>
            {year} {profile.displayName}. Tous droits réservés.
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
