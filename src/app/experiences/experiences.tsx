import React from "react";
import { ExperiencesProps } from "./experiences.props";
import AnimatedSection from "@/app/shared/animated-section";
import ExperienceCard from "./experience-card";

const Experiences: React.FC<ExperiencesProps> = ({ experiences }) => {
  return (
    <section id="work" className="portfolio-section">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fadeUp">
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-16 lowercase">
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
              <AnimatedSection animation="stagger" className="timeline">
                {experiences
                  ?.sort((a, b) => a.data.order - b.data.order)
                  .map((experience) => (
                    <ExperienceCard
                      key={experience.id}
                      experience={experience}
                    />
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
