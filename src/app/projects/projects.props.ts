import { ProjectData, SettingsData } from "@/services/prismic/prismic.dto";
import { PrismicDocument } from "@prismicio/client";

export interface ProjectsProps {
  settings: PrismicDocument<SettingsData, string, string>;
  projects: PrismicDocument<ProjectData, string, string>[];
}
