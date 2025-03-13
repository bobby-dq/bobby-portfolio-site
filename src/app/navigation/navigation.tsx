"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { NavItem } from "@/services/navigation/nav-item.dto";
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
  const expandedSidebarRef = useRef<HTMLDivElement>(null);
  const sidebarContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      expandedSidebarRef.current &&
      sidebarContentRef.current &&
      overlayRef.current
    ) {
      if (isExpandedSidebar) {
        // Make the sidebar visible first
        gsap.set(expandedSidebarRef.current, {
          visibility: "visible",
          autoAlpha: 1,
        });

        // Then animate the elements
        const tl = gsap.timeline();

        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }
        ).fromTo(
          sidebarContentRef.current,
          { x: "-100%" },
          { x: "0%", duration: 0.5, ease: "power3.out" },
          "-=0.2"
        );

        // Safe check that sidebar content has children before animating them
        if (sidebarContentRef.current.children.length > 0) {
          tl.fromTo(
            sidebarContentRef.current.children,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.1 },
            "-=0.3"
          );
        }
      } else {
        // Hide sidebar with animation
        const tl = gsap.timeline({
          onComplete: () => {
            if (expandedSidebarRef.current) {
              gsap.set(expandedSidebarRef.current, { visibility: "hidden" });
            }
          },
        });

        tl.to(sidebarContentRef.current, {
          x: "-100%",
          duration: 0.5,
          ease: "power3.in",
        })
          .to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.3")
          .to(expandedSidebarRef.current, { autoAlpha: 0, duration: 0.1 });
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
        expandedSidebarRef={expandedSidebarRef}
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
      />
    </>
  );
};

export default Navigation;
