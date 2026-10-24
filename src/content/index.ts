// Server-side only: call these functions from getStaticProps, never from components,
// so that Zod stays out of the client bundle.
import { z } from "zod";
import { getExperienceSummary as summarize, type ExperienceSummary } from "./dates";
import { education } from "./education";
import { experiences } from "./experience";
import { profile } from "./profile";
import {
  educationSchema,
  experienceSchema,
  formatContentError,
  navItemSchema,
  profileSchema,
  skillGroupSchema,
  type Education,
  type Experience,
  type NavItem,
  type Profile,
  type SkillGroup,
} from "./schema";
import { navItems } from "./site";
import { skillGroups } from "./skills";

export type { Education, Experience, ExperienceSummary, NavItem, Profile, SkillGroup };

export type RawContent = {
  profile: unknown;
  experiences: unknown;
  education: unknown;
  skillGroups: unknown;
  navItems: unknown;
};

export type Content = {
  profile: Profile;
  experiences: Experience[];
  education: Education[];
  skillGroups: SkillGroup[];
  navItems: NavItem[];
};

function parse<T extends z.ZodType>(file: string, schema: T, value: unknown): z.output<T> {
  const result = schema.safeParse(value);
  if (!result.success) throw formatContentError(file, result.error);
  return result.data;
}

function assertUniqueIds(file: string, entries: { id: string }[]) {
  const seen = new Set<string>();
  entries.forEach((entry, index) => {
    if (seen.has(entry.id)) {
      throw new Error(
        `Contenu invalide dans src/content/${file} › [${index}].id : identifiant en double (${entry.id})`,
      );
    }
    seen.add(entry.id);
  });
}

export function validateContent(raw: RawContent): Content {
  const content: Content = {
    profile: parse("profile.ts", profileSchema, raw.profile),
    experiences: parse("experience.ts", z.array(experienceSchema), raw.experiences),
    education: parse("education.ts", z.array(educationSchema), raw.education),
    skillGroups: parse("skills.ts", z.array(skillGroupSchema), raw.skillGroups),
    navItems: parse("site.ts", z.array(navItemSchema), raw.navItems),
  };

  assertUniqueIds("experience.ts", content.experiences);
  assertUniqueIds("education.ts", content.education);
  assertUniqueIds("skills.ts", content.skillGroups);

  const currentRole = content.experiences.find(
    (entry) => entry.id === content.profile.currentRoleId,
  );
  if (!currentRole || currentRole.end) {
    throw new Error(
      `Contenu invalide dans src/content/profile.ts › currentRoleId : « ${content.profile.currentRoleId} » doit désigner une expérience en cours`,
    );
  }

  return content;
}

// Next.js refuses to serialize undefined values returned by getStaticProps.
function jsonSafe<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

let cache: Content | undefined;
function content(): Content {
  cache ??= validateContent({ profile, experiences, education, skillGroups, navItems });
  return cache;
}

const byStartDesc = (a: Experience, b: Experience) => b.start.localeCompare(a.start);

function sortExperiences(entries: Experience[]): Experience[] {
  const ongoing = entries.filter((entry) => !entry.end).sort(byStartDesc);
  const ended = entries.filter((entry) => entry.end).sort(byStartDesc);
  return [...ongoing, ...ended];
}

export function getProfile(): Profile {
  return jsonSafe(content().profile);
}

export function getCurrentRole(): Experience {
  const { profile, experiences } = content();
  return jsonSafe(experiences.find((entry) => entry.id === profile.currentRoleId)!);
}

export function getExperiences(): { main: Experience[]; early: Experience[] } {
  const entries = content().experiences;
  return jsonSafe({
    main: sortExperiences(entries.filter((entry) => entry.section === "main")),
    early: sortExperiences(entries.filter((entry) => entry.section === "early")),
  });
}

export function getEducation(): Education[] {
  return jsonSafe([...content().education].sort((a, b) => b.endYear - a.endYear));
}

export function getSkillGroups(): SkillGroup[] {
  return jsonSafe(content().skillGroups);
}

export function getNavItems(): NavItem[] {
  return jsonSafe(content().navItems);
}

export function getExperienceSummary(today: Date): ExperienceSummary {
  return summarize(content().experiences, today);
}

export function fillExperience(text: string, label: string): string {
  return text.replaceAll("{experience}", label);
}
