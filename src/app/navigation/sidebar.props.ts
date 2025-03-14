import { NavItem } from "@/services/navigation/nav-item.dto";
import { SettingsData } from "@/services/prismic/prismic.dto";
import { PrismicDocument } from "@prismicio/client";

export interface SidebarProps {
  settings: PrismicDocument<SettingsData, string, string>;
  currentSection: string;
  navItems: NavItem[];
  setIsExpandedSidebar: (isExpanded: boolean) => void;
  isExpandedSidebar: boolean;
}
