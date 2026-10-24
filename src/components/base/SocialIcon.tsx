import React from "react";
import { BiLogoGithub, BiLogoGmail, BiLogoLinkedin } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import type { SocialLinkInput } from "@/content/schema";

const icons = {
  github: BiLogoGithub,
  linkedin: BiLogoLinkedin,
  x: BsTwitterX,
  email: BiLogoGmail,
};

type SocialIconProps = {
  network: SocialLinkInput["network"];
  size?: number;
};

// Icons use currentColor, so they follow the text colour of both themes.
const SocialIcon: React.FC<SocialIconProps> = ({ network, size = 18 }) => {
  const Icon = icons[network];
  return <Icon size={size} aria-hidden="true" />;
};

export default SocialIcon;
