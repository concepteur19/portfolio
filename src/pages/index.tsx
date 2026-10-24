import fs from "node:fs";
import path from "node:path";
import type { GetStaticProps } from "next";
import Home, { type HomeProps } from "@/components/sections/Home";
import {
  fillExperience,
  getCurrentRole,
  getEducation,
  getExperienceSummary,
  getExperiences,
  getProfile,
  getSkillGroups,
} from "@/content";

export const getStaticProps: GetStaticProps<HomeProps> = () => {
  const profile = getProfile();

  const cvFile = path.join(process.cwd(), "public", profile.cv.path);
  if (!fs.existsSync(cvFile)) {
    throw new Error(`CV introuvable : public${profile.cv.path}`);
  }

  const summary = getExperienceSummary(new Date());

  return {
    props: {
      profile,
      tagline: fillExperience(profile.tagline, summary.label),
      currentRole: getCurrentRole(),
      experiences: getExperiences(),
      education: getEducation(),
      skillGroups: getSkillGroups(),
      experienceLabel: summary.label,
    },
    // Regenerated daily on Vercel so the experience duration stays current.
    revalidate: 86400,
  };
};

export default function Index(props: HomeProps) {
  return <Home {...props} />;
}
