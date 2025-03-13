import { SettingsData } from "@/services/prismic/prismic.dto";
import { PrismicDocument } from "@prismicio/client";

export interface SidebarProps {
  settings: PrismicDocument<SettingsData, string, string>;
}
