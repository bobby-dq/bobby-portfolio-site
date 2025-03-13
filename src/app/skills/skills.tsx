import React from "react";
import { SkillsProps } from "./skills.props";
import AnimatedSection from "@/app/shared/animated-section";

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section id="skills" className="portfolio-section">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-16">
            Skills
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {/* Map through skill categories */}
          {skills?.map((skillCategory, index) => (
            <AnimatedSection
              key={skillCategory.id}
              className="space-y-6"
              delay={100 * (index + 1)}
            >
              <h3 className="text-xl text-primary mb-8 font-primary">
                {skillCategory.data.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillCategory.data.items
                  ?.sort((a, b) => a.order - b.order) // Sort items by order
                  .map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 border border-ink-800 text-ink-300 hover:text-ink hover:border-ink-700 transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
