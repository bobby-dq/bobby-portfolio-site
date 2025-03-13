import { EducationData, SettingsData } from "@/services/prismic/prismic.dto";
import { PrismicDocument } from "@prismicio/client";

export interface EducationProps {
  settings: PrismicDocument<SettingsData, string, string>;
  education: PrismicDocument<EducationData, string, string>[];
}
