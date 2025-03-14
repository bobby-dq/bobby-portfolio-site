"use client";

import React, { useState, useRef, useEffect } from "react";
import { JobDescriptionItem } from "@/services/prismic/prismic.dto";
import TechnologyChip from "../shared/technology-chip";
import gsap from "gsap";
import { ExperienceCardProps } from "./experience-card.props";

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const [expanded, setExpanded] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      if (expanded) {
        gsap.fromTo(
          descriptionRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      } else {
        gsap.to(descriptionRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [expanded]);

  return (
    <div className="timeline-item mb-10 p-5 hover:border-primary transition-all duration-300 hover:shadow-lg hover:bg-base group h-full">
      <div className="flex flex-col justify-between mb-2">
        <span className="text-ink-500 text-sm">
          {experience.data.date_range}
        </span>
        <h4 className="text-lg font-bold text-ink">
          {experience.data.position}
        </h4>
        <h5 className="text-ink-400 mb-3 font-bold">
          {experience.data.company}
        </h5>
      </div>

      {/* Short description */}
      <p className="text-ink mb-4">{experience.data.short_description}</p>

      {/* Technology chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {experience.data.technologies
          .sort((a, b) => a.order1 - b.order1)
          .map((tech, i) => (
            <TechnologyChip key={i} name={tech.name} index={i} />
          ))}
      </div>

      {/* Expand/collapse button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
      >
        {expanded ? "Show less" : "Show more"}
        <svg
          className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Expanded descriptions */}
      <div ref={descriptionRef} className="overflow-hidden h-0 opacity-0">
        <div className="mt-4 pt-4 border-t border-ink-100">
          <ul className="list-disc pl-5 space-y-2">
            {experience.data.descriptions.map(
              (d: JobDescriptionItem, i: number) => (
                <li className="text-ink-500" key={i}>
                  {d.item}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
