import img1 from "../assets/images/icons/logo.svg";
import img11 from "../assets/images/subscribe.png";
import img2 from "../assets/images/loteryEC.PNG";
import img3 from "../assets/images/icons/Logo Initiale ABN vert citron.png";
import img33 from "../assets/images/abn.png";
import img4 from "../assets/images/icons/clickSchool.png";
import img5 from "../assets/images/icons/countryico.PNG";
import img55 from "../assets/images/restcountry.png";
import img6 from "../assets/images/icons/formstep.PNG"
import img7 from "../assets/images/icons/logo.png"
import img77 from "../assets/images/foodanim.png"
import img8 from "../assets/images/icons/RedBlackWhite1.png"
import img88 from "../assets/images/nike.png"


const projectsData = [
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
      "Application web qui permet au client de gérer les joeurs de la loterie américaine qui passent par lui.",
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
      "Participation à la conception et intégration des interfaces utilisateur du projet. Le premier module déployé est la Market Place",
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
      "Une application permettant aux parents de suivre l'évolurion de leurs enfant depuis le confort de leur canapé...",
    link: "",
    technos: "Nextjs, Tailwind, Laravel.",
    colorProjectType: "#1E73C3",
  },
  {
    logo: img5,
    imgSrc: img55,
    projectType: "Challenge",
    name: "Recheche de pays",
    description:
      "petit projet fun permettant d'avoir les informations(nom, langues parlées, superficie, etc.) sur le pays de son choix.",
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
      "pour m'amuser j'ai réalisé un formulaire animé, ayant plusieurs étapes avant sa soumission.",
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
      "Animation de plats de cuisine indiene...",
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
      "Animation de tenis de la marque Nike...",
    link: "https://nike-product.vercel.app/",
    technos: "React, CSS.",
    colorProjectType: "#fd7fa4",
  },
];

export default projectsData;