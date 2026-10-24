import type { ProfileInput } from "./schema";

export const profile = {
  displayName: "Zobel Nguening",
  fullName: "Zobel Ulrich Nguening Tchomgui",
  title: "Ingénieur Logiciel Fullstack",
  specialties: ["React", "ASP.NET Core", "Laravel"],
  tagline:
    "Ingénieur en informatique (ENSP Douala) avec {experience} d'expérience en développement fullstack d'applications web et mobiles. Chez Orange Cameroun, je développe et fais évoluer des services de la super app MaxIt avec React, ASP.NET Core et OpenShift, de l'analyse des besoins jusqu'au suivi en production.",
  bio: [
    "Je suis développeur d'applications fullstack chez INGSi (Sprint Pay), en mission à la Digital Factory d'Orange Cameroun. J'y développe les WebViews commerciales de la super app MaxIt et le frontend de mini apps comme Univers Jeunes et Résultats officiels, et je participe à leur mise en production et à leur supervision.",
    "Je suis aussi co-fondateur de PhiBrain Inc SARL, où j'ai conçu et développé Clickschool, une plateforme de gestion scolaire. En freelance, j'ai livré Kibreeze, une plateforme touristique bilingue, et Connecteur360, une plateforme d'investissement participatif.",
    "De 2024 à 2025, j'ai enseigné l'informatique en collège et au lycée : une expérience qui m'a appris à expliquer simplement des sujets techniques. En dehors du code, je suis passionné de design et de dessin, et j'admire le niveau de détail de certains artistes.",
  ],
  currentRoleId: "ingsi-orange",
  location: "Douala, Cameroun",
  email: "zobel.tchomgui@gmail.com",
  socials: [
    {
      network: "github",
      url: "https://github.com/concepteur19",
      handle: "@concepteur19",
      label: "GitHub de Zobel Nguening",
    },
    {
      network: "linkedin",
      url: "https://linkedin.com/in/zobel-ulrich-nguening-tchomgui-825a01224/",
      handle: "zobel-ulrich-nguening-tchomgui",
      label: "LinkedIn de Zobel Nguening",
    },
    {
      network: "x",
      url: "https://twitter.com/nguening",
      handle: "@nguening",
      label: "X (Twitter) de Zobel Nguening",
    },
    {
      network: "email",
      url: "mailto:zobel.tchomgui@gmail.com",
      handle: "zobel.tchomgui@gmail.com",
      label: "Écrire à Zobel Nguening",
    },
  ],
  cv: {
    path: "/cv/zobel-nguening-cv.pdf",
    downloadName: "Zobel-Nguening-CV.pdf",
  },
} satisfies ProfileInput;
