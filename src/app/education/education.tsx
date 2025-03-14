import React from "react";
import { EducationProps } from "./education.props";
import AnimatedSection from "@/app/shared/animated-section";

const Education: React.FC<EducationProps> = ({ education }) => {
  const sortedEducation = education?.sort(
    (a, b) => a.data.order - b.data.order
  );

  return (
    <section id="education" className="portfolio-section py-16">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fadeUp">
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-16 lowercase">
            Education
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sortedEducation?.map((edu, index) => (
            <AnimatedSection
              key={edu.id}
              animation="fadeUp"
              delay={100 * (index + 1)}
            >
              <div className="p-6 transition-all duration-300 hover:border hover:border-primary group h-full hover:bg-base">
                <div className="flex flex-col mb-2">
                  <span className="text-ink-500 text-sm mb-2 tracking-wider uppercase">
                    {edu.data.duration}
                  </span>
                  <h3 className="text-xl font-bold text-primary group-hover:text-primary-dark transition-colors">
                    {edu.data.degree}
                  </h3>
                  <h4 className="text-lg text-ink-400 mt-2">
                    {edu.data.institution}
                  </h4>
                  {edu.data.gpa && (
                    <div className="mt-3 inline-flex items-center border border-ink-700 px-3 py-1 text-ink-300 self-start">
                      <span className="mr-1">GPA:</span>
                      <span className="font-bold text-primary">
                        {edu.data.gpa}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}

          {/* Fallback if no education data is found */}
          {(!education || education.length === 0) && (
            <div className="col-span-full">
              <p className="text-ink-400 text-center py-8">
                Education information not available.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;
