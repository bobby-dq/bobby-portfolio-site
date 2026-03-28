"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface TechItem {
  name: string;
  order1: number;
  category?: string;
}

interface TechnologyListProps {
  technologies: TechItem[];
  className?: string;
}

const TechnologyList: React.FC<TechnologyListProps> = ({
  technologies,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Group by category; items without a category fall into ""
  const grouped = technologies
    .sort((a, b) => a.order1 - b.order1)
    .reduce<Record<string, TechItem[]>>((acc, tech) => {
      const key = tech.category ?? "";
      if (!acc[key]) acc[key] = [];
      acc[key].push(tech);
      return acc;
    }, {});

  const groups = Object.entries(grouped);

  useEffect(() => {
    if (!containerRef.current) return;
    const blocks = containerRef.current.querySelectorAll(".tech-block");
    if (!blocks.length) return;
    gsap.fromTo(
      blocks,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div ref={containerRef} className={`space-y-2 ${className}`}>
      {groups.map(([category, items]) => (
        <div key={category} className="tech-block">
          {category && (
            <span className="block text-[9px] uppercase tracking-widest text-primary font-medium mb-0.5">
              {category}
            </span>
          )}
          <div className="flex flex-wrap items-baseline">
            {items.map((tech, i) => (
              <span key={i} className="flex items-baseline">
                <span className="tech-name text-xs font-light text-ink cursor-default">
                  {tech.name}
                </span>
                {i < items.length - 1 && (
                  <span className="tech-sep text-ink-200 mx-1.5 text-[9px]">
                    —
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechnologyList;
