import { NavItem } from "@/services/navigation/nav-item.dto";
import { SettingsData } from "@/services/prismic/prismic.dto";
import { PrismicDocument } from "@prismicio/client";
import { RefObject } from "react";

export interface ExpandedSidebarProps {
  settings: PrismicDocument<SettingsData, string, string>;
  navItems: NavItem[];
  setCurrentSection: (section: string) => void;
  setIsExpandedSidebar: (isExpanded: boolean) => void;
  expandedSidebarRef: { current: HTMLDivElement | null };
  sidebarContentRef: { current: HTMLDivElement | null };
  overlayRef: { current: HTMLDivElement | null };
  currentSection: string;
}
