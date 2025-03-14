import React from "react";
import { X, Github, Linkedin, Mail } from "lucide-react";
import gsap from "gsap";
import { ExpandedSidebarProps } from "./sidebar-expanded.props";
import { isFilled } from "@prismicio/client";

const ExpandedSidebar: React.FC<ExpandedSidebarProps> = ({
  navItems,
  settings,
  currentSection,
  setCurrentSection,
  setIsExpandedSidebar,
  expandedSidebarRef,
  sidebarContentRef,
  overlayRef,
}) => {
  // Fan panels with different shades
  const fanPanels = [
    { shade: "bg-primary-200" },
    { shade: "bg-primary-300" },
    { shade: "bg-primary-400" },
    { shade: "bg-primary-600" },
    { shade: "bg-primary" },
  ];

  // Social links from settings - properly typed with Prismic's isFilled
  const githubLink = settings?.data?.social_links?.find(
    (x) => x.platform === "GitHub"
  );

  const linkedinLink = settings?.data?.social_links?.find(
    (x) => x.platform === "LinkedIn"
  );

  const emailLink = settings?.data?.social_links?.find(
    (x) => x.platform === "Email"
  );

  // Safe access to URLs with proper Prismic typing
  const githubUrl =
    githubLink?.url && isFilled.link(githubLink.url) ? githubLink.url.url : "#";

  const linkedinUrl =
    linkedinLink?.url && isFilled.link(linkedinLink.url)
      ? linkedinLink.url.url
      : "#";

  const emailUrl =
    emailLink?.url && isFilled.link(emailLink.url) ? emailLink.url.url : "#";

  // Animation for highlighter effect
  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const highlighter = e.currentTarget.querySelector(".highlighter");
    if (highlighter) {
      // Make sure highlighter is visible first
      gsap.set(highlighter, { opacity: 0.3 });
      gsap.fromTo(
        highlighter,
        { width: "0%", left: "0%" },
        { width: "100%", duration: 0.4, ease: "power1.out" }
      );
    }
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const highlighter = e.currentTarget.querySelector(".highlighter");
    if (highlighter) {
      gsap.to(highlighter, { width: "0%", opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div
      ref={expandedSidebarRef}
      className="fixed inset-0 z-50 hidden"
      style={{ pointerEvents: "none" }}
    >
      {/* Overlay - Modified to start after the sidebar */}
      <div
        ref={overlayRef}
        className="absolute top-0 bottom-0 right-0 bg-ink/50 backdrop-blur-sm"
        onClick={() => setIsExpandedSidebar(false)}
        style={{
          zIndex: 55,
          pointerEvents: "auto",
          left: "48px", // Start after the sidebar width (12px) with some buffer
        }}
      />

      {/* Fan Animation Panels - Also start after sidebar */}
      {fanPanels.map((panel, index) => (
        <div
          key={`fan-panel-${index}`}
          className={`absolute top-0 bottom-0 right-0 h-full w-0 ${panel.shade} origin-left fan-panel-${index}`}
          style={{
            zIndex: 60 + index,
            pointerEvents: "none",
            left: "48px", // Start after the sidebar
          }}
        />
      ))}

      {/* Sidebar Content - Also starts after sidebar */}
      <div
        ref={sidebarContentRef}
        className="absolute top-0 bottom-0 right-0 h-full bg-primary text-base overflow-y-auto"
        style={{
          zIndex: 70,
          pointerEvents: "auto",
          left: "48px", // Start after the sidebar
        }}
      >
        {/* Noise overlay
        <div
          className="absolute inset-0"
          style={{
            pointerEvents: "none",
            opacity: 0.1,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            animation: "noise 0.5s steps(1) infinite",
          }}
        /> */}

        <div className="flex justify-end p-4 relative z-10">
          <button
            onClick={() => setIsExpandedSidebar(false)}
            className="text-base p-2 hover:text-ink-300 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Section list matching the screenshot */}
        <div className="relative z-10 px-8 py-2 max-w-5xl mx-auto">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`border-t border-ink-300 py-2 flex items-start cursor-pointer relative transition-colors duration-300 ${
                item.id === currentSection ? "bg-ink/10" : ""
              }`}
              onClick={() => {
                setCurrentSection(item.id);
                setIsExpandedSidebar(false);
                gsap.to(window, {
                  duration: 1,
                  scrollTo: { y: `#${item.id}`, offsetY: 80 },
                  ease: "power3.inOut",
                });
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Highlighter overlay */}
              <div
                className="highlighter absolute top-0 left-0 h-full bg-ink w-0 opacity-0"
                style={{
                  pointerEvents: "none",
                  zIndex: -1, // Behind the content but above the background
                }}
              ></div>

              <div className="w-1/3 md:w-1/4 pr-4 relative">
                <div className="mb-2 text-ink font-primary text-6xl">
                  {item.number}
                </div>
              </div>

              <div className="w-2/3 md:w-3/4 relative">
                <div className="text-3xl font-primary uppercase mb-2">
                  {item.label}
                </div>
                <div className="text-ink-700 text-base">{item.subtext}</div>
              </div>
            </div>
          ))}
          {/* Social Media Icons */}
          <div className="mt-8 flex space-x-6">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base hover:text-ink transition-colors p-2"
            >
              <Github size={24} />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base hover:text-ink transition-colors p-2"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={`mailto:${emailUrl}`}
              className="text-base hover:text-ink transition-colors p-2"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedSidebar;
