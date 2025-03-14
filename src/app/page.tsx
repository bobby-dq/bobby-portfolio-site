import { Metadata } from "next";
import { getPortfolioData } from "../services/prismic/prismic.service";
import Hero from "./hero/hero";
import Education from "./education/education";
import Projects from "./projects/projects";
import Experiences from "./experiences/experiences";
import Skills from "./skills/skills";
import Contact from "./contact/contact";
import ScrollSection from "./shared/scroll-section";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getPortfolioData(["settings"]);

  return {
    title: settings?.data?.site_title || "Bobby Quilacio | Portfolio",
    description:
      settings?.data?.site_description ||
      "Full-stack developer crafting digital experiences",
    icons: {
      icon: [
        { url: "/icon-bobby.svg", type: "image/svg+xml" },
        { url: "/favicon.ico" },
      ],
    },
  };
}

export default async function Home() {
  const { homepage, projects, experiences, skills, settings, education } =
    await getPortfolioData();

  return (
    <>
      {settings && homepage && <Hero homepage={homepage} settings={settings} />}

      {settings && experiences && (
        <Experiences experiences={experiences} settings={settings} />
      )}

      {settings && education && (
        <Education education={education} settings={settings} />
      )}

      {settings && projects && (
        <Projects projects={projects} settings={settings} />
      )}

      {settings && skills && <Skills skills={skills} settings={settings} />}

      {settings && <Contact settings={settings} />}
    </>
  );
}
