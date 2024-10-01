// import React from "react";
// import Title from "@/components/base/Title";
// import ProjectCard from "../base/projects/ProjectCard";
// import parcoursData from "@/data/CertificaionsData";
// import projectsData from "@/data/ProjectsData";
// import Image from "next/image";
// import {
//   BsBackpack,
//   BsCode,
//   BsCodeSlash,
//   BsCodeSquare,
//   BsFolder,
//   BsPersonWorkspace,
// } from "react-icons/bs";
// import experiencePro from "@/data/ExperienceData";
// import { GrMysql, GrReactjs } from "react-icons/gr";
// import {
//   BiLogoBootstrap,
//   BiLogoReact,
//   BiLogoRedux,
//   BiLogoTailwindCss,
//   BiLogoTypescript,
// } from "react-icons/bi";
// import { RiNextjsFill } from "react-icons/ri";
// import { IoLogoLaravel } from "react-icons/io5";
// import { TbBrandMysql } from "react-icons/tb";
// import { DiMysql } from "react-icons/di";

// function About() {
//   return (
//     <div className=" space-y-16 ">
//       <div className=" space-y-8 ">
//         <Title title="Mon parcours scolaire" className="text-2xl" />
//         <div className=" space-y-8">
//           {parcoursData.map((data, id) => {
//             return (
//               <div key={id} className="flex space-x-8 space-x-12">
//                 <p className=" text-base p-1 text-stone-500 "> {data.year} </p>
//                 <div className=" flex flex-col space-y-2 ">
//                   <span className=" text-lg font-barlowMedium ">
//                     {data.certificate}
//                   </span>
//                   <span className=" text-[15px] "> {data.school} </span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <div className=" space-y-8 ">
//         <Title title="Mon projets phares" className="text-2xl" />
//         <div className=" grid grid-flow-row grid-cols-3 gap-8">
//           {projectsData.map((data, id) => {
//             return (
//               <ProjectCard
//                 key={id}
//                 src={data.imgSrc}
//                 name={data.name}
//                 description={data.description}
//                 projectType={data.projectType}
//                 technos={data.technos}
//                 colorProjectType={data.colorProjectType}
//               />
//             );
//           })}
//         </div>
//       </div>

//       <div className=" space-x-8 flex items-start grid grid-flow-row grid-cols-2 ">
//         <div className=" border rounded-lg p-4 space-y-3">
//           <div className=" flex items-center text-stone-500 space-x-2">
//             {/* <Image src="" alt="12" className=" rounded-full h-5 w-5 border " ></Image> */}
//             <BsFolder size={22} />
//             <Title
//               title="Expériences Professionnelle"
//               className="text-lg font-barlowMedium "
//             />
//           </div>

//           <p className=" w-[23rem]#">
//             {
//               "j'accumule près de 18 mois d'expérience, expérience comprenant des stages académiques, contrat de préemplois et freelance."
//             }
//           </p>

//           <div className=" space-y-2">
//             {experiencePro.map((data, id) => {
//               return (
//                 <div key={id} className="flex space-x-8 space-x-12">
//                   <p className=" w-28 text-sm p-1 text-stone-500 ">
//                     {" "}
//                     {data.structure}{" "}
//                   </p>
//                   <div className=" flex flex-col space-y- ">
//                     <span className=" text-base font-barlowMedium ">
//                       {data.poste}
//                     </span>
//                     <span className=" text-[13px] "> {data.year} </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         <div className=" border rounded-lg p-4 space-y-3">
//           <div className=" flex items-center text-stone-500 space-x-2">
//             {/* <Image src="" alt="12" className=" rounded-full h-5 w-5 border " ></Image> */}
//             <BsCodeSlash size={22} />
//             <Title
//               title="Ma Stack Technique"
//               className="text-lg font-barlowMedium "
//             />
//           </div>

//           <p className=" w-[23rem]#">
//             {
//               "Je me défini comme quelqu'un qui apprend vite et qui peut etre assez polivalent , ce qui ne m'empêche pas d'avoir des technologies préférentielles."
//             }
//           </p>

//           <div className=" flex items-center space-x-4 ">
//             <BiLogoReact size={32} /> <BiLogoRedux size={32} />{" "}
//             <RiNextjsFill size={32} /> <BiLogoTailwindCss size={32} />{" "}
//             <BiLogoBootstrap size={32} /> <IoLogoLaravel size={32} />{" "}
//             <BiLogoTypescript size={32} /> <GrMysql size={32} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default About;


import React from 'react'

export const About = () => {
  return (
    <div>About</div>
  )
}
