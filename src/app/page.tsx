import { Metadata } from "next";
import { getPortfolioData, JobDescriptionItem } from "../lib/getPortfolioData";
import Link from "next/link";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import Image from "next/image";
import ContactButton from "@/  components/ContactButton";
import ProjectItem from "@/  components/ProjectItem";
import AnimatedSection from "@/  components/AnimatedSection";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getPortfolioData();

  return {
    title: settings?.data?.site_title || "Bobby Quilacio | Portfolio",
    description:
      settings?.data?.site_description ||
      "Full-stack developer crafting digital experiences",
  };
}

export default async function Home() {
  const { homepage, projects, experiences, skills, settings, education } =
    await getPortfolioData();

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container mx-auto px-4">
          <AnimatedSection className="hero-content" animation="fadeUp">
            <h1 className="font-pirata text-6xl md:text-8xl text-white mb-6">
              {isFilled.richText(homepage?.data?.title) && (
                <span className="block">
                  <PrismicText field={homepage.data.title} />
                </span>
              )}
              {homepage?.data?.subtitle && (
                <span className="block">{homepage.data.subtitle}</span>
              )}
            </h1>
            <div className="font-inter text-xl md:text-2xl max-w-xl leading-relaxed mb-8">
              {isFilled.richText(homepage?.data?.description) && (
                <PrismicRichText field={homepage.data.description} />
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="#work" className="gothic-button">
                View my work
              </Link>
              <ContactButton email={settings?.data?.email} />
              {isFilled.link(settings?.data?.resume_link) && (
                <a
                  href={settings.data.resume_link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gothic-button"
                >
                  Resume
                </a>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="portfolio-section">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="font-pirata text-5xl md:text-6xl text-white mb-16">
              Education
            </h2>
          </AnimatedSection>

          <div className="space-y-12">
            {education?.map((edu, index) => (
              <AnimatedSection key={edu.id} delay={100 * (index + 1)}>
                <div className="border border-gray-800 p-6 hover:border-gray-700 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl text-white">{edu.data.degree}</h3>
                    <span className="text-gray-500 text-sm">
                      {edu.data.duration}
                    </span>
                  </div>
                  <h4 className="text-gray-400 mb-4">{edu.data.institution}</h4>
                  <p className="text-gray-300 mb-2">{edu.data.gpa}</p>

                  {edu.data.key_courses && edu.data.key_courses.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <h5 className="text-white mb-3">Key Courses</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {edu.data.key_courses.map((course, i) => (
                          <div
                            key={i}
                            className="p-3 border border-gray-800 group hover:border-gray-700 transition-colors"
                          >
                            <h6 className="text-white text-sm mb-1">
                              {course.course_name}
                            </h6>
                            {course.course_description && (
                              <p className="text-gray-400 text-xs">
                                {course.course_description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}

            {/* Fallback if no education data is found */}
            {(!education || education.length === 0) && (
              <p className="text-gray-400 text-center py-8">
                Education information not available.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="portfolio-section">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeUp">
            <h2 className="font-pirata text-5xl md:text-6xl text-white mb-16">
              Work
            </h2>
          </AnimatedSection>

          <div className="space-y-16">
            {projects?.map((project, index) => (
              <ProjectItem key={project.id} project={project} index={index} />
            ))}

            {(!projects || projects.length === 0) && (
              <p className="text-gray-400 text-center py-8">
                No projects found. Add some projects in your Prismic repository.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="portfolio-section">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeUp">
            <h2 className="font-pirata text-5xl md:text-6xl text-white mb-16">
              About
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <AnimatedSection
              className="md:col-span-1"
              animation="fadeIn"
              delay={100}
            >
              {isFilled.image(homepage?.data?.profile_image) ? (
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={homepage.data.profile_image.url}
                    alt={homepage.data.profile_image.alt || "Profile Image"}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gray-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                    Profile Image
                  </div>
                </div>
              )}
            </AnimatedSection>

            <AnimatedSection
              className="md:col-span-2"
              animation="slideRight"
              delay={200}
            >
              <div className="prose prose-invert prose-lg max-w-none">
                {isFilled.richText(homepage?.data?.description) && (
                  <PrismicRichText field={homepage.data.description} />
                )}
              </div>

              <div className="mt-8 space-y-6">
                <h3 className="text-xl text-white">Experience</h3>

                <AnimatedSection animation="stagger" className="timeline">
                  {experiences?.map((experience) => (
                    <div key={experience.id} className="timeline-item">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h4 className="text-lg text-white">
                          {experience.data.position}
                        </h4>
                        <span className="text-gray-500 text-sm">
                          {experience.data.date_range}
                        </span>
                      </div>
                      <h5 className="text-gray-400 mb-2">
                        {experience.data.company}
                      </h5>
                      <p className="text-gray-300">
                        {experience.data.short_description}
                      </p>
                      {experience.data.descriptions.map(
                        (d: JobDescriptionItem, i: number) => (
                          <p className="text-gray-300" key={i}>
                            {d.item}
                          </p>
                        )
                      )}
                    </div>
                  ))}
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="portfolio-section">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="font-pirata text-5xl md:text-6xl text-white mb-16">
              Skills
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {/* Languages & Frameworks */}
            <AnimatedSection className="space-y-6" delay={100}>
              <h3 className="text-xl text-white mb-8 font-pirata">
                Languages & Frameworks
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills
                  ?.filter(
                    (skill) => skill.data.category === "Languages & Frameworks"
                  )
                  .map((skill) => (
                    <span
                      key={skill.id}
                      className="px-4 py-2 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition-colors"
                    >
                      {skill.data.name}
                    </span>
                  ))}
              </div>
            </AnimatedSection>

            {/* Infrastructure & Tools */}
            <AnimatedSection className="space-y-6" delay={200}>
              <h3 className="text-xl text-white mb-8 font-pirata">
                Infrastructure & Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills
                  ?.filter(
                    (skill) => skill.data.category === "Infrastructure & Tools"
                  )
                  .map((skill) => (
                    <span
                      key={skill.id}
                      className="px-4 py-2 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition-colors"
                    >
                      {skill.data.name}
                    </span>
                  ))}
              </div>
            </AnimatedSection>

            {/* Methodologies */}
            <AnimatedSection className="space-y-6 md:col-span-2" delay={300}>
              <h3 className="text-xl text-white mb-8 font-pirata">
                Methodologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills
                  ?.filter((skill) => skill.data.category === "Methodologies")
                  .map((skill) => (
                    <span
                      key={skill.id}
                      className="px-4 py-2 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition-colors"
                    >
                      {skill.data.name}
                    </span>
                  ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="portfolio-section border-b-0">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeUp">
            <h2 className="font-pirata text-5xl md:text-6xl text-white mb-16">
              Contact
            </h2>
          </AnimatedSection>

          <AnimatedSection
            animation="fadeUp"
            delay={100}
            className="max-w-2xl mx-auto"
          >
            <p className="text-gray-300 mb-8 text-center text-xl">
              Interested in working together? Feel free to reach out directly.
            </p>

            <div className="flex flex-col items-center space-y-6">
              <ContactButton
                email={settings?.data?.email}
                className="w-full md:w-auto text-center text-xl py-4 px-8"
              />

              {isFilled.link(settings?.data?.resume_link) && (
                <a
                  href={settings.data.resume_link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gothic-button w-full md:w-auto text-center text-xl py-4 px-8"
                >
                  Download Resume
                </a>
              )}

              <AnimatedSection
                animation="stagger"
                className="flex space-x-6 mt-8"
              >
                {settings?.data?.social_links &&
                  settings.data.social_links.map(
                    (social, index) =>
                      isFilled.link(social.url) && (
                        <a
                          key={index}
                          href={social.url.url}
                          className="gothic-tooltip"
                          data-tooltip={social.platform}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {/* Use SVG icon based on platform or show platform name */}
                          <span className="text-xl">{social.platform}</span>
                        </a>
                      )
                  )}
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
