import Title from "@/components/base/Title";
import SocialIcon from "@/components/base/SocialIcon";
import Image from "next/image";
import React from "react";
import type { GetStaticProps } from "next";
import profileImg from "@/assets/images/pro.jpeg";
import Link from "next/link";
import { getProfile, type Profile } from "@/content";

type AboutProps = { profile: Profile };

export const getStaticProps: GetStaticProps<AboutProps> = () => ({
  props: { profile: getProfile() },
});

const Index = ({ profile }: AboutProps) => {
  return (
    <div className="flex items-start pt-10 gap-8 max-lg:flex-col">
      <div className="space-y-8">
        <Title
          as="h1"
          title="À propos"
          className="text-5xl md:text-6xl sm:w-[90%] md:w-[85%]"
        />
        {profile.bio.map((paragraph) => (
          <p key={paragraph} className="font-barlowItalic text-lg w-[90%] md:w-[85%]">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="flex flex-col justify-between space-y-8">
        <Image
          src={profileImg}
          alt={`Portrait de ${profile.displayName}`}
          sizes="(min-width: 1024px) 384px, 0px"
          className="hidden lg:block rounded-lg rotate-3 bg-[#fffdfd] dark:bg-slate-800"
        />
        <ul className="flex flex-col justify-center space-y-5">
          {profile.socials.map((social) => {
            const isMail = social.network === "email";
            return (
              <li key={social.network}>
                <Link
                  href={social.url}
                  aria-label={social.label}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noopener noreferrer"}
                  className="flex space-x-2 items-center hover:text-primary-strong dark:hover:text-primary"
                >
                  <SocialIcon network={social.network} />
                  <span>{social.handle}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Index;
