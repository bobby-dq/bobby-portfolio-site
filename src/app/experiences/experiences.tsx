import React from "react";
import { ExperiencesProps } from "./experiences.props";
import AnimatedSection from "@/app/shared/animated-section";
import { JobDescriptionItem } from "@/services/prismic/prismic.dto";

const Experiences: React.FC<ExperiencesProps> = ({ experiences }) => {
  return (
    <section id="about" className="portfolio-section">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fadeUp">
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-16">
            Experience
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <AnimatedSection
            className="md:col-span-2"
            animation="slideRight"
            delay={200}
          >
            <div className="mt-8 space-y-6">
              <h3 className="text-xl text-ink">Experience</h3>

              <AnimatedSection animation="stagger" className="timeline">
                {experiences?.map((experience) => (
                  <div key={experience.id} className="timeline-item mb-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h4 className="text-lg text-ink">
                        {experience.data.position}
                      </h4>
                      <span className="text-ink-500 text-sm">
                        {experience.data.date_range}
                      </span>
                    </div>
                    <h5 className="text-ink-400 mb-2">
                      {experience.data.company}
                    </h5>
                    {/* <p className="text-ink">
                      {experience.data.short_description}
                    </p> */}
                    {experience.data.descriptions.map(
                      (d: JobDescriptionItem, i: number) => (
                        <li className="text-ink-300" key={i}>
                          {d.item}
                        </li>
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
  );
};

export default Experiences;
