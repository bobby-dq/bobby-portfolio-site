import { NavItem } from "@/services/navigation/nav-item.dto";
import { SettingsData } from "@/services/prismic/prismic.dto";
import { PrismicDocument } from "@prismicio/client";

export interface NavigationProps {
  settings: PrismicDocument<SettingsData, string, string>;
  currentSection: string;
  isScrolled: boolean;
  isExpandedSidebar: boolean;
  setCurrentSection: (section: string) => void;
  setIsExpandedSidebar: (isExpanded: boolean) => void;
  navItems: NavItem[];
}
