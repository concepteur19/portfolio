import type { StaticImageData } from "next/image";
import img1 from "../assets/images/icons/logo.svg";
import img11 from "../assets/images/subscribe.png";
import img2 from "../assets/images/loteryEC.png";
import img3 from "../assets/images/icons/Logo Initiale ABN vert citron.png";
import img33 from "../assets/images/abn.png";
import img4 from "../assets/images/icons/clickSchool.png";
import img5 from "../assets/images/icons/countryico.png";
import img55 from "../assets/images/restcountry.png";
import img6 from "../assets/images/icons/formstep.png"
import img7 from "../assets/images/icons/logo.png"
import img77 from "../assets/images/foodanim.png"
import img8 from "../assets/images/icons/RedBlackWhite1.png"
import img88 from "../assets/images/nike.png"

// Transitional model, replaced by spec 002 (project showcase).
export type LegacyProject = {
  imgSrc: StaticImageData | string;
  logo: StaticImageData | string;
  projectType: string;
  name: string;
  description: string;
  link: string;
  technos: string;
  colorProjectType: string;
  visible?: boolean;
};

export const isPublishable = (project: LegacyProject) =>
  project.visible !== false && project.link !== "";

const projectsData: LegacyProject[] = [
  {
    imgSrc: img11,
    logo: img1,
    projectType: "Side-project",
    name: "Subscribe",
    description:
      "Application web qui permet aux utilisateurs de gérer facilement leurs abonnements (Netflix, Spotify, Deezer, etc.).",
    link: "https://subscribe-ui.vercel.app/",
    technos: "React, Tailwind, Laravel.",
    colorProjectType: "#EAB308",
  },
  {
    logo: img2,
    imgSrc: img2,
    projectType: "Projet client",
    name: "Lottery Elmados Consulting",
    description:
      "Application web qui permet au client de gérer les joueurs de la loterie américaine qui passent par lui.",
    link: "https://dvloteriec.com/",
    technos: "Laravel, Bootstrap, Javascript.",
    colorProjectType: "#1E73C3",
  },
  {
    logo: img3,
    imgSrc: img33,
    projectType: "Projet client",
    name: "Africa Business Network",
    description:
      "Participation à la conception et à l'intégration des interfaces utilisateur du projet. Le premier module déployé est la Market Place.",
    link: "https://afri-front.vercel.app/",
    technos: "React, Redux, Bootstrap.",
    colorProjectType: "#1E73C3",
  },
  {
    visible: false,
    logo: img4,
    imgSrc: "",
    projectType: "Projet client",
    name: "Click School",
    description:
      "Une application permettant aux parents de suivre l'évolution de leurs enfants depuis le confort de leur canapé...",
    link: "",
    technos: "Nextjs, Tailwind, Laravel.",
    colorProjectType: "#1E73C3",
  },
  {
    logo: img5,
    imgSrc: img55,
    projectType: "Challenge",
    name: "Recherche de pays",
    description:
      "Projet fun permettant d'avoir les informations (nom, langues parlées, superficie, etc.) sur le pays de son choix.",
    link: "https://rest-coutries-api-omega.vercel.app/",
    technos: "React, TailwindCss.",
    colorProjectType: "#EAB308",
  },
  {
    logo: img6,
    imgSrc: "",
    projectType: "fun",
    name: "Formulaire en plusieurs étapes",
    description:
      "Pour m'amuser, j'ai réalisé un formulaire animé, ayant plusieurs étapes avant sa soumission.",
    link: "https://form-steps-three.vercel.app/",
    technos: "React, TailwindCss.",
    colorProjectType: "#fd7fa4",
  },

  {
    visible: false,
    logo: img7,
    imgSrc: img77,
    projectType: "fun",
    name: "Food Animation",
    description:
      "Animation de plats de cuisine indienne...",
    link: "https://food-animation-xi.vercel.app/",
    technos: "React, TailwindCss.",
    colorProjectType: "#fd7fa4",
  },
  {
    logo: img8,
    imgSrc: img88,
    projectType: "fun",
    name: "Nike Product Animation",
    description:
      "Animation de tennis de la marque Nike...",
    link: "https://nike-product.vercel.app/",
    technos: "React, CSS.",
    colorProjectType: "#fd7fa4",
  },
];

export default projectsData;
