import React from "react";
import { SkillsProps } from "./skills.props";
import AnimatedSection from "@/app/shared/animated-section";

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section id="skills" className="portfolio-section">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-16 lowercase">
            Skills
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {skills?.sort((a, b) => a.data.order - b.data.order).map((skillCategory, index) => (
            <AnimatedSection
              key={skillCategory.id}
              className="space-y-3"
              delay={100 * (index + 1)}
            >
              <h3 className="text-xl text-primary font-primary border-b border-ink-100 pb-2 mb-3">
                {skillCategory.data.category}
              </h3>
              <div className="skill-prose flex flex-wrap items-baseline">
                {skillCategory.data.items
                  ?.sort((a, b) => a.order - b.order)
                  .map((skill, i, arr) => (
                    <span key={i} className="flex items-baseline">
                      <span className="skill-name text-sm font-light text-ink cursor-default">
                        {skill.name}
                      </span>
                      {i < arr.length - 1 && (
                        <span className="skill-sep text-ink-200 mx-1.5 text-xs">—</span>
                      )}
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
