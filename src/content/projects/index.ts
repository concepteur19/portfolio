// Project registry. To add a project:
// 1. create src/content/projects/<id>/index.ts (and its images) following the existing fiches;
// 2. import it below and add one line { file: "<id>/index.ts", data: <import> }.
// No display component needs to change.
import africaBusinessNetwork from "./africa-business-network";
import clickSchool from "./click-school";
import foodAnimation from "./food-animation";
import formSteps from "./form-steps";
import lotteryElmados from "./lottery-elmados";
import nikeProduct from "./nike-product";
import restCountries from "./rest-countries";
import subscribe from "./subscribe";

export const projectEntries: { file: string; data: unknown }[] = [
  { file: "subscribe/index.ts", data: subscribe },
  { file: "lottery-elmados/index.ts", data: lotteryElmados },
  { file: "africa-business-network/index.ts", data: africaBusinessNetwork },
  { file: "click-school/index.ts", data: clickSchool },
  { file: "rest-countries/index.ts", data: restCountries },
  { file: "form-steps/index.ts", data: formSteps },
  { file: "food-animation/index.ts", data: foodAnimation },
  { file: "nike-product/index.ts", data: nikeProduct },
];
