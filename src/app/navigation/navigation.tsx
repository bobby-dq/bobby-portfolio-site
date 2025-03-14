"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "./navbar";
import ExpandedSidebar from "./sidebar-expanded";
import Sidebar from "./sidebar";
import { NavigationProps } from "./navigation.props";

const Navigation: React.FC<NavigationProps> = ({
  currentSection,
  isScrolled,
  isExpandedSidebar,
  setCurrentSection,
  setIsExpandedSidebar,
  navItems,
  settings,
}) => {
  // Use useRef instead of state to persist references between renders
  const expandedSidebarRef = useRef<HTMLDivElement>(null);
  const sidebarContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Sidebar animation
  useEffect(() => {
    // Only run animation if all refs are available (client-side)
    if (
      expandedSidebarRef.current &&
      sidebarContentRef.current &&
      overlayRef.current
    ) {
      if (isExpandedSidebar) {
        // Make the sidebar visible first using display block
        gsap.set(expandedSidebarRef.current, {
          display: "block",
          autoAlpha: 1,
        });

        // Create the timeline
        const tl = gsap.timeline();

        // Animate overlay
        tl.to(overlayRef.current, { opacity: 1, duration: 0.3 });

        // Animate fan panels
        const fanPanels = expandedSidebarRef.current.querySelectorAll(
          '[class*="fan-panel"]'
        );

        if (fanPanels && fanPanels.length > 0) {
          // Reset all panels to width 0
          gsap.set(fanPanels, { width: 0 });

          // Animate each panel sequentially
          fanPanels.forEach((panel, index) => {
            tl.to(
              panel,
              { width: "100%", duration: 0.4, ease: "power3.out" },
              index * 0.05
            );
          });
        }

        // Ensure content is visible
        gsap.set(sidebarContentRef.current, {
          opacity: 0,
        });

        // Animate in the content
        tl.to(
          sidebarContentRef.current,
          {
            opacity: 1,
            duration: 0.3,
          },
          "-=0.1"
        );
      } else {
        // Hide sidebar with animation
        const tl = gsap.timeline({
          onComplete: () => {
            if (expandedSidebarRef.current) {
              // When animation is complete, set display to none
              gsap.set(expandedSidebarRef.current, {
                display: "none",
              });
            }
          },
        });

        // Fade out content first
        tl.to(sidebarContentRef.current, {
          opacity: 0,
          duration: 0.3,
        });

        // Reverse animate fan panels
        const fanPanels = expandedSidebarRef.current.querySelectorAll(
          '[class*="fan-panel"]'
        );

        if (fanPanels && fanPanels.length > 0) {
          const reversePanels = Array.from(fanPanels).reverse();
          reversePanels.forEach((panel, index) => {
            tl.to(
              panel,
              { width: 0, duration: 0.3, ease: "power3.in" },
              index * 0.05
            );
          });
        }

        // Fade out overlay
        tl.to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2").to(
          expandedSidebarRef.current,
          { autoAlpha: 0, duration: 0.1 }
        );
      }
    }
  }, [isExpandedSidebar]);

  return (
    <>
      <Sidebar
        currentSection={currentSection}
        navItems={navItems}
        settings={settings}
        setIsExpandedSidebar={setIsExpandedSidebar}
        isExpandedSidebar={isExpandedSidebar}
      />
      <Navbar
        settings={settings}
        isScrolled={isScrolled}
        navItems={navItems}
        setCurrentSection={setCurrentSection}
        setIsExpandedSidebar={setIsExpandedSidebar}
        expandedSidebarRef={expandedSidebarRef}
      />
      <ExpandedSidebar
        settings={settings}
        navItems={navItems}
        setCurrentSection={setCurrentSection}
        setIsExpandedSidebar={setIsExpandedSidebar}
        expandedSidebarRef={expandedSidebarRef}
        sidebarContentRef={sidebarContentRef}
        overlayRef={overlayRef}
        currentSection={currentSection}
      />
    </>
  );
};

export default Navigation;
