"use client";

import { useRef, useState, useEffect } from "react";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { isFilled, PrismicDocument } from "@prismicio/client";
import Image from "next/image";
import gsap from "gsap";
import {
  ProjectData,
  ProjectImage,
  TechnologyItem,
} from "@/lib/getPortfolioData";

interface ProjectItemProps {
  project: PrismicDocument<ProjectData, string, string>;
  index: number;
}

export default function ProjectItem({ project, index }: ProjectItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;

    if (!content) return;

    if (isExpanded) {
      // Animate opening
      gsap.set(content, { height: "auto" });
      gsap.from(content, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      // Animate content items
      const contentItems = content.querySelectorAll(".content-item");
      gsap.fromTo(
        contentItems,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2,
        }
      );
    } else {
      // Animate closing
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [isExpanded]);

  // Initial entrance animation
  useEffect(() => {
    const project = projectRef.current;

    if (!project) return;

    gsap.fromTo(
      project,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power2.out",
      }
    );
  }, [index]);

  return (
    <div className="work-item" ref={projectRef}>
      <div
        className="cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl font-pirata text-gray-500">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-2xl md:text-3xl text-white group-hover:text-gray-300 transition-colors">
            <PrismicText field={project.data.title} />
          </h3>
          <div
            className="ml-auto text-2xl transition-transform duration-300"
            style={{
              transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
            }}
          >
            +
          </div>
        </div>

        <p className="text-gray-400 mb-4 ml-12">
          {project.data.short_description}
        </p>
      </div>

      <div ref={contentRef} className="overflow-hidden h-0 ml-12">
        <div className="space-y-6 border-l-2 border-gray-800 pl-6">
          {project.data.images && project.data.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 content-item">
              {project.data.images.map((imageObj: ProjectImage, i: number) => (
                <div key={i} className="aspect-video bg-gray-800 relative">
                  {isFilled.image(imageObj.image) ? (
                    <Image
                      src={imageObj.image.url}
                      alt={imageObj.image.alt || `Project image ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                      Project Image {i + 1}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="prose prose-invert max-w-none content-item">
            <PrismicRichText field={project.data.full_description} />
          </div>

          {project.data.technologies &&
            project.data.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 content-item">
                {project.data.technologies.map(
                  (tech: TechnologyItem, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 border border-gray-800 text-sm text-gray-400"
                    >
                      {tech.item}
                    </span>
                  )
                )}
              </div>
            )}

          <div className="flex gap-4 content-item">
            {isFilled.link(project.data.project_url) && (
              <a
                href={project.data.project_url.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gothic-button text-sm"
              >
                Live Project
              </a>
            )}

            {isFilled.link(project.data.github_url) && (
              <a
                href={project.data.github_url.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gothic-button text-sm"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
