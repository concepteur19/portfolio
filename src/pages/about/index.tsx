import Title from '@/components/base/Title'
import Image from 'next/image'
import React from 'react'
import profileImg from "@/assets/images/pro.jpeg"
import { useTheme } from "@/contexts/themeContext";

const Index = () => {
  const { isDarkTheme } = useTheme();
  return (
    <div className=" flex items-start space-x-6 justify-between">
        <div className=" space-y-8 ">
          <Title
            title="Hey, je suis Nguening zobel Ing. Logiciel"
            className="text-5xl md:text-6xl sm:w-[90%] md:w-[85%]"
          />
          <p className=" text-lg w-[90%] md:w-[85%]">
            {
              "En tant qu'ingénieur logiciel spécialisé dans le développement front-end, je crée des sites web esthétiques et fonctionnels en utilisant principalement Nextjs et React. Avec une passion pour l'amélioration de mes compétences et le travail en équipe, mon objectif est d'offrir une excellente expérience utilisateur. Consultez mon portfolio pour en savoir plus. "
            }
          </p>

          <p className=" text-lg w-[90%] md:w-[85%]">
            {
              "En tant qu'ingénieur logiciel spécialisé dans le développement front-end, je crée des sites web esthétiques et fonctionnels en utilisant principalement Nextjs et React. Avec une passion pour l'amélioration de mes compétences et le travail en équipe, mon objectif est d'offrir une excellente expérience utilisateur. Consultez mon portfolio pour en savoir plus. "
            }
          </p>

          <p className=" text-lg w-[90%] md:w-[85%]">
            {
              "En tant qu'ingénieur logiciel spécialisé dans le développement front-end, je crée des sites web esthétiques et fonctionnels en utilisant principalement Nextjs et React. Avec une passion pour l'amélioration de mes compétences et le travail en équipe, mon objectif est d'offrir une excellente expérience utilisateur. Consultez mon portfolio pour en savoir plus. "
            }
          </p>
        </div>

        <Image
          src={profileImg.src}
          alt=""
          width={350}
          height={100}
          className={` hidden lg:block rounded-lg border-[2px]# rotate-3 ${
            isDarkTheme
              ? " bg-slate-800 border-slate-700 "
              : "bg-[#fffdfd] border-slate-200"
          } `}
        />
      </div>
  )
}

export default Index