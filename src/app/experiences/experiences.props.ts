import { ExperienceData, SettingsData } from "@/services/prismic/prismic.dto";
import { PrismicDocument } from "@prismicio/client";

export interface ExperiencesProps {
  settings: PrismicDocument<SettingsData, string, string>;
  experiences: PrismicDocument<ExperienceData, string, string>[];
}
