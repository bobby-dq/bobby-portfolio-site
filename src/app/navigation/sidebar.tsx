import React from "react";
import { SidebarProps } from "./sidebar.props";
import { PanelLeftOpen, X } from "lucide-react";

const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  navItems,
  setIsExpandedSidebar,
  isExpandedSidebar,
}) => {
  const handleOpenSidebar = () => {
    if (setIsExpandedSidebar) {
      setIsExpandedSidebar(!isExpandedSidebar);
    }
  };
  return (
    <div
      onClick={handleOpenSidebar}
      className="fixed left-0 top-0 h-full w-12 bg-base z-50 bg-opacity-100 backdrop-blur-sm border-r border-primary cursor-pointer hover:invert transition-all duration-300"
    >
      <div className="w-full flex flex-col items-center h-full">
        <div className="py-4">
          <button
            onClick={handleOpenSidebar}
            className="text-primary hover:text-ink transition-colors p-2"
            aria-label="Open menu"
          >
            {isExpandedSidebar ? <X size={20} /> : <PanelLeftOpen size={20} />}
          </button>
        </div>
        <div className="flex-grow flex items-center">
          <div className="transform -rotate-90 text-sm tracking-wider whitespace-nowrap text-ink font-bold">
            <span className="font-primary lowercase text-lg">
              {currentSection.toUpperCase()}
            </span>{" "}
            - {navItems.find((item) => item.id === currentSection)?.subtext}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
