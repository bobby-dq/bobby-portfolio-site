import { createClient } from "../../prismic";
import * as prismic from "@prismicio/client";

export interface HomepageData {
  title: prismic.RichTextField;
  subtitle?: string;
  description: prismic.RichTextField;
  profile_image?: prismic.ImageField;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ProjectImage {
  image: prismic.ImageField;
  caption?: string;
}

export interface TechnologyItem {
  item: string;
}

export interface JobDescriptionItem {
  item: string;
}

export interface ProjectData {
  title: prismic.RichTextField;
  order: number;
  short_description: string;
  full_description: prismic.RichTextField;
  images: ProjectImage[];
  technologies: TechnologyItem[];
  project_url?: prismic.LinkField;
  github_url?: prismic.LinkField;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ExperienceData {
  position: string;
  company: string;
  date_range: string;
  short_description: string;
  descriptions: JobDescriptionItem[];
  order: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface SkillItem {
  name: string;
  order: number;
}

export interface SkillData {
  category: string;
  order: number;
  items: SkillItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface SocialLink {
  platform: string;
  url: prismic.LinkField;
  icon: prismic.ImageField;
}

export interface SettingField {
  name: string;
  value: string;
}

export interface SettingsData {
  site_title: string;
  site_description: string;
  email: string;
  resume_link: prismic.LinkField;
  social_links: SocialLink[];
  logo: prismic.ImageField;
  other_fields: SettingField[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface CourseItem {
  course_name: string;
  course_description: string;
}

export interface EducationData {
  degree: string;
  institution: string;
  duration: string;
  gpa: string;
  key_courses: CourseItem[];
  order: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface PortfolioData {
  homepage: prismic.PrismicDocument<HomepageData>;
  projects: prismic.PrismicDocument<ProjectData>[];
  experiences: prismic.PrismicDocument<ExperienceData>[];
  skills: prismic.PrismicDocument<SkillData>[];
  settings: prismic.PrismicDocument<SettingsData>;
  education: prismic.PrismicDocument<EducationData>[];
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const client = createClient();

  const homepage = (await client.getSingle(
    "homepage"
  )) as prismic.PrismicDocument<HomepageData>;

  const projects = (await client.getAllByType("project", {
    orderings: {
      field: "my.project.order",
      direction: "asc",
    },
  })) as prismic.PrismicDocument<ProjectData>[];

  const experiences = (await client.getAllByType("experience", {
    orderings: {
      field: "my.experience.order",
      direction: "asc",
    },
  })) as prismic.PrismicDocument<ExperienceData>[];

  const skills = (await client.getAllByType("skill", {
    orderings: [
      {
        field: "my.skill.category",
        direction: "asc",
      },
      {
        field: "my.skill.order",
        direction: "asc",
      },
    ],
  })) as prismic.PrismicDocument<SkillData>[];

  const settings = (await client.getSingle(
    "settings"
  )) as prismic.PrismicDocument<SettingsData>;

  const education = (await client.getAllByType("education", {
    orderings: {
      field: "my.education.order",
      direction: "asc",
    },
  })) as prismic.PrismicDocument<EducationData>[];

  return {
    homepage,
    projects,
    experiences,
    skills,
    settings,
    education,
  };
}
