import { createClient } from "../../../prismic";
import * as prismic from "@prismicio/client";
import {
  PortfolioData,
  HomepageData,
  ProjectData,
  ExperienceData,
  SkillData,
  SettingsData,
  EducationData,
} from "./prismic.dto";

export type PrismicDataType =
  | "homepage"
  | "projects"
  | "experiences"
  | "skills"
  | "settings"
  | "education";

export async function getPortfolioData(
  dataTypes?: PrismicDataType[]
): Promise<Partial<PortfolioData>> {
  const client = createClient();
  const result: Partial<PortfolioData> = {};

  const typesToFetch = dataTypes || [
    "homepage",
    "projects",
    "experiences",
    "skills",
    "settings",
    "education",
  ];

  const fetchPromises = typesToFetch.map(async (type) => {
    switch (type) {
      case "homepage":
        result.homepage = (await client.getSingle(
          "homepage"
        )) as prismic.PrismicDocument<HomepageData>;
        break;

      case "projects":
        result.projects = (await client.getAllByType("project", {
          orderings: {
            field: "my.project.order",
            direction: "asc",
          },
        })) as prismic.PrismicDocument<ProjectData>[];
        break;

      case "experiences":
        result.experiences = (await client.getAllByType("experience", {
          orderings: {
            field: "my.experience.order",
            direction: "asc",
          },
        })) as prismic.PrismicDocument<ExperienceData>[];
        break;

      case "skills":
        result.skills = (await client.getAllByType("skill", {
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
        break;

      case "settings":
        result.settings = (await client.getSingle(
          "settings"
        )) as prismic.PrismicDocument<SettingsData>;
        break;

      case "education":
        result.education = (await client.getAllByType("education", {
          orderings: {
            field: "my.education.order",
            direction: "asc",
          },
        })) as prismic.PrismicDocument<EducationData>[];
        break;
    }
  });

  await Promise.all(fetchPromises);

  return result;
}
