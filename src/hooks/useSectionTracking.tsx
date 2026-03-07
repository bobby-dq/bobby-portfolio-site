import { useState, useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";

export function useSectionTracking(navItems: { id: string }[]) {
  const [currentSection, setCurrentSection] = useState(
    navItems[0]?.id || "home"
  );
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (
            scrollPosition >= sectionTop - 100 &&
            scrollPosition < sectionTop + sectionHeight - 100
          ) {
            setCurrentSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
  }, [navItems]);

  const prevSection = useRef<string | null>(null);
  useEffect(() => {
    if (prevSection.current !== currentSection) {
      sendGAEvent("event", "section_view", { section_id: currentSection });
      prevSection.current = currentSection;
    }
  }, [currentSection]);

  return { currentSection, setCurrentSection, isScrolled };
}
