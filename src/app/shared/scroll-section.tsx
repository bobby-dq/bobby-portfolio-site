"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionProps {
  children: React.ReactNode;
  animation?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "fadeIn";
  exitAnimation?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "fadeOut";
  delay?: number;
  className?: string;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
  children,
  animation = "fadeUp",
  exitAnimation,
  delay = 0,
  className = "",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;

    // Find the child element with an ID (assuming it's the main section)
    // This allows us to preserve existing IDs in the children
    const childWithId = section.querySelector("[id]");
    const triggerElement = childWithId || section;

    // Set initial state based on animation type
    let initialProps = {};

    switch (animation) {
      case "fadeUp":
        initialProps = { y: 100, opacity: 0 };
        break;
      case "fadeDown":
        initialProps = { y: -100, opacity: 0 };
        break;
      case "fadeLeft":
        initialProps = { x: 100, opacity: 0 };
        break;
      case "fadeRight":
        initialProps = { x: -100, opacity: 0 };
        break;
      default:
        initialProps = { opacity: 0 };
    }

    // Set initial state
    gsap.set(section, initialProps);

    // Determine exit properties
    const getExitProps = () => {
      const exit = exitAnimation || animation;
      switch (exit) {
        case "fadeUp":
          return { y: -100, opacity: 0 };
        case "fadeDown":
          return { y: 100, opacity: 0 };
        case "fadeLeft":
          return { x: -100, opacity: 0 };
        case "fadeRight":
          return { x: 100, opacity: 0 };
        case "fadeOut":
          return { opacity: 0 };
        default:
          return { opacity: 0 };
      }
    };

    // Create scroll trigger
    const st = ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        gsap.to(section, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: "power2.out",
        });
      },
      onLeave: () => {
        if (exitAnimation) {
          gsap.to(section, {
            ...getExitProps(),
            duration: 0.5,
            ease: "power1.in",
          });
        }
      },
      onEnterBack: () => {
        gsap.to(section, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        if (exitAnimation) {
          gsap.to(section, {
            ...initialProps,
            duration: 0.5,
            ease: "power1.in",
          });
        }
      },
    });

    return () => {
      // Clean up ScrollTrigger on unmount
      st.kill();
    };
  }, [animation, exitAnimation, delay]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollSection;
