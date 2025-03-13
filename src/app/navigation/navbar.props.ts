// import { NavItem } from "@/services/navigation/nav-item.dto";
import { SettingsData } from "@/services/prismic/prismic.dto";
import { PrismicDocument } from "@prismicio/client";

export interface NavbarProps {
  settings: PrismicDocument<SettingsData, string, string>;
  // isScrolled: boolean;
  // navItems: NavItem[];
  // setCurrentSection: (section: string) => void;
  // setIsExpandedSidebar: (isExpanded: boolean) => void;
  // expandedSidebarRef: React.RefObject<HTMLDivElement>;
}
