"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  animation?: "fadeUp" | "fadeIn" | "slideRight" | "stagger";
}

export default function AnimatedSection({
  children,
  delay = 0,
  className = "",
  animation = "fadeUp",
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const childrenElements = childrenRef.current;

    if (!section || !childrenElements) return;

    let tl: gsap.core.Timeline;

    switch (animation) {
      case "fadeUp":
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          section,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: delay / 1000,
          }
        );
        break;

      case "fadeIn":
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          section,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1.5,
            delay: delay / 1000,
          }
        );
        break;

      case "slideRight":
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          section,
          {
            x: -50,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            delay: delay / 1000,
          }
        );
        break;

      case "stagger":
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        // Get all direct children
        const children = Array.from(childrenElements.children);

        tl.fromTo(
          children,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            delay: delay / 1000,
          }
        );
        break;
    }

    // Cleanup
    return () => {
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [animation, delay]);

  return (
    <div ref={sectionRef} className={className}>
      <div ref={childrenRef}>{children}</div>
    </div>
  );
}
