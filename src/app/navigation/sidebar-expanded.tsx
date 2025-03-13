import React from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { ExpandedSidebarProps } from "./sidebar-expanded.props";

const ExpandedSidebar: React.FC<ExpandedSidebarProps> = ({
  navItems,
  setCurrentSection,
  setIsExpandedSidebar,
  expandedSidebarRef,
  sidebarContentRef,
  overlayRef,
}) => {
  return (
    <div ref={expandedSidebarRef} className="fixed inset-0 z-50 invisible">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsExpandedSidebar(false)}
      />

      {/* Sidebar Content */}
      <div
        ref={sidebarContentRef}
        className="absolute left-0 h-full w-full max-w-xs bg-black text-white"
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsExpandedSidebar(false)}
            className="text-white p-2"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          {navItems.map((item) => (
            <div key={item.id} className="mb-8">
              <button
                onClick={() => {
                  setCurrentSection(item.id);
                  setIsExpandedSidebar(false);
                  gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: `#${item.id}`, offsetY: 80 },
                    ease: "power3.inOut",
                  });
                }}
                className="w-full text-left"
              >
                <div className="text-gray-400 text-sm mb-1">{item.number}</div>
                <div className="text-2xl font-semibold mb-1">{item.label}</div>
                <div className="text-gray-400">{item.subtext}</div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpandedSidebar;
