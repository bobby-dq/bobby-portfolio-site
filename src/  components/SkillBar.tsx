"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SkillBarProps {
  name: string;
  level: string;
  percentage: number;
}

export default function SkillBar({ name, level, percentage }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const bar = barRef.current;
    const progress = progressRef.current;

    if (!bar || !progress) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bar,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      progress,
      { width: 0 },
      {
        width: `${percentage}%`,
        duration: 1.5,
        ease: "power2.out",
      }
    );

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [percentage]);

  return (
    <div className="mb-6" ref={barRef}>
      <div className="flex justify-between mb-2">
        <span className="text-white">{name}</span>
        <span className="text-gray-500">{level}</span>
      </div>
      <div className="skill-bar">
        <div
          ref={progressRef}
          className="skill-progress"
          style={{ width: 0 }}
        ></div>
      </div>
    </div>
  );
}
