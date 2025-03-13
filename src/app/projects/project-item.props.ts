import { ProjectData } from "@/services/prismic/prismic.dto";
import { PrismicDocument } from "@prismicio/client";

export interface ProjectItemProps {
  project: PrismicDocument<ProjectData, string, string>;
  index: number;
}
