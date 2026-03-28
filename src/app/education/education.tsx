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
              <div className="edu-timeline-item">
                <span className="block text-xs uppercase tracking-wider text-ink-500 mb-1">
                  {edu.data.duration}
                </span>
                <h3 className="font-primary text-lg text-ink mb-1">
                  {edu.data.degree}
                </h3>
                <p className="text-sm font-light text-ink-400 mb-2">
                  {edu.data.institution}
                </p>
                {edu.data.gpa && (
                  <span className="text-xs text-primary border-b border-primary pb-px">
                    GPA {edu.data.gpa}
                  </span>
                )}
                {edu.data.key_courses && edu.data.key_courses.length > 0 && (
                  <div className="mt-3">
                    <span className="block text-[9px] uppercase tracking-widest text-ink-300 mb-1">
                      Key Courses
                    </span>
                    <p className="text-xs font-light text-ink-400">
                      {edu.data.key_courses
                        .map((c) => c.course_name)
                        .join(" — ")}
                    </p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}

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
