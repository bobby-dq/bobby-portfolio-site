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

  const items = [...technologies].sort((a, b) => a.order1 - b.order1);

  useEffect(() => {
    if (!containerRef.current) return;
    const targets = containerRef.current.querySelectorAll(
      ".tech-name, .tech-sep"
    );
    if (!targets.length) return;
    const tween = gsap.fromTo(
      targets,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
      }
    );
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={`tech-block ${className}`}>
      <span className="prefix">Stack</span>
      {items.map((tech, i) => (
        <span key={tech.name}>
          <span className="tech-name text-xs font-light text-ink cursor-default">
            {tech.name}
          </span>
          {i < items.length - 1 && (
            <span className="tech-sep text-ink-200 mx-1.5 text-[9px]">/</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default TechnologyList;
