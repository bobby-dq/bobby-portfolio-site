import React from "react";
import { EducationProps } from "./education.props";
import AnimatedSection from "@/app/shared/animated-section";

const Education: React.FC<EducationProps> = ({ education }) => {
  return (
    <section id="education" className="portfolio-section">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-16">
            Education
          </h2>
        </AnimatedSection>

        <div className="space-y-12">
          {education?.map((edu, index) => (
            <AnimatedSection key={edu.id} delay={100 * (index + 1)}>
              <div className="border border-ink-800 p-6 hover:border-ink-700 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-xl text-ink">{edu.data.degree}</h3>
                  <span className="text-ink-500 text-sm">
                    {edu.data.duration}
                  </span>
                </div>
                <h4 className="text-ink-400 mb-4">{edu.data.institution}</h4>
                <p className="text-ink-300 mb-2">{edu.data.gpa}</p>

                {edu.data.key_courses && edu.data.key_courses.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-ink-800">
                    <h5 className="text-ink mb-3">Key Courses</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {edu.data.key_courses.map((course, i) => (
                        <div
                          key={i}
                          className="p-3 border border-ink-800 group hover:border-ink-700 transition-colors"
                        >
                          <h6 className="text-ink text-sm mb-1">
                            {course.course_name}
                          </h6>
                          {course.course_description && (
                            <p className="text-ink-400 text-xs">
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
            <p className="text-ink-400 text-center py-8">
              Education information not available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;
