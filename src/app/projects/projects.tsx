import React from "react";
import { ProjectsProps } from "./projects.props";
import AnimatedSection from "@/app/shared/animated-section";
import ProjectItem from "./project-item";

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section id="work" className="portfolio-section">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fadeUp">
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-16">
            Technical Projects
          </h2>
        </AnimatedSection>

        <div className="space-y-16">
          {projects?.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}

          {(!projects || projects.length === 0) && (
            <p className="text-ink-400 text-center py-8">
              No projects found. Add some projects in your Prismic repository.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
