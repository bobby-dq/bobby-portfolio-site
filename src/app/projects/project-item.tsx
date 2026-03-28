"use client";

import { useRef, useState, useEffect } from "react";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { isFilled, asText } from "@prismicio/client";
import { sendGAEvent } from "@next/third-parties/google";
import Image from "next/image";
import gsap from "gsap";
import { ProjectItemProps } from "./project-item.props";
import { ProjectImage, TechnologyItem } from "@/services/prismic/prismic.dto";

export default function ProjectItem({ project, index }: ProjectItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;

    if (!content) return;

    if (isExpanded) {
      // First ensure content is visible
      gsap.set(content, { opacity: 1 });

      // Then animate height
      gsap.set(content, { height: "auto" });
      gsap.from(content, {
        height: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      // Animate content items with a slight delay
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
          delay: 0.3, // Slightly longer delay
          onComplete: () => {
            // Force render of images
            window.dispatchEvent(new Event("resize"));
          },
        }
      );
    } else {
      // Animate closing
      const contentItems = content.querySelectorAll(".content-item");

      // First fade out content items
      gsap.to(contentItems, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });

      // Then collapse the container
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        delay: 0.1,
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
      {/* Clickable: title row + toggle only */}
      <div
        className="cursor-pointer group"
        onClick={() => {
          const action = isExpanded ? "collapse" : "expand";
          sendGAEvent("event", "project_expand", {
            project_title: asText(project.data.title),
            action,
          });
          setIsExpanded(!isExpanded);
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-lg font-primary text-primary-500">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-lg font-bold text-ink group-hover:text-ink-300 transition-colors">
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
      </div>

      {/* Always visible: description + tech stack */}
      <p className="text-sm text-ink mb-2 ml-12">
        {project.data.short_description}
      </p>

      {project.data.technologies && project.data.technologies.length > 0 && (
        <div className="skill-prose flex flex-wrap items-baseline ml-12 mb-4">
          {project.data.technologies.map((tech: TechnologyItem, i: number, arr) => (
            <span key={i} className="flex items-baseline">
              <span className="skill-name text-xs font-light text-ink cursor-default">
                {tech.item}
              </span>
              {i < arr.length - 1 && (
                <span className="skill-sep text-ink-200 mx-1.5 text-xs">—</span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Accordion: full description + images */}
      <div
        ref={contentRef}
        className="overflow-hidden h-0 ml-12"
        style={{ opacity: isExpanded ? 1 : 0 }}
      >
        <div className="space-y-6 border-l-2 border-ink-800 pl-6">
          <div className="prose prose-sm prose-invert max-w-none content-item">
            <PrismicRichText field={project.data.full_description} />
          </div>

          {project.data.images && project.data.images.length > 0 && (
            <div className="flex flex-col gap-4 content-item opacity-100 w-full">
              {project.data.images.map((imageObj: ProjectImage, i: number) => (
                <div
                  key={i}
                  className="bg-ink-800 relative w-full mb-4"
                  style={{ width: "100%" }}
                >
                  {isFilled.image(imageObj.image) ? (
                    <Image
                      src={imageObj.image.url}
                      alt={imageObj.image.alt || `Project image ${i + 1}`}
                      width={1200}
                      height={675}
                      priority={i === 0}
                      className="w-full h-auto object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center text-ink-600 h-48">
                      Project Image {i + 1}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 content-item">
            {isFilled.link(project.data.project_url) && (
              <a
                href={project.data.project_url.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gothic-button text-sm"
                onClick={() =>
                  sendGAEvent("event", "project_link_click", {
                    project_title: asText(project.data.title),
                    link_type: "live",
                  })
                }
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
                onClick={() =>
                  sendGAEvent("event", "project_link_click", {
                    project_title: asText(project.data.title),
                    link_type: "github",
                  })
                }
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
