import type { EducationInput } from "./schema";

export const education = [
  {
    id: "ensp",
    degree: "Ingénieur en Informatique (BAC+5)",
    school: "École Nationale Supérieure Polytechnique de Douala (ENSP)",
    startYear: 2018,
    endYear: 2023,
  },
  {
    id: "bac",
    degree: "Baccalauréat C",
    school: "Lycée Bilingue de Bonabéri",
    endYear: 2016,
  },
] satisfies EducationInput[];
