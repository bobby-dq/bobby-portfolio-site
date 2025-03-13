import { SettingsData, SkillData } from "@/services/prismic/prismic.dto";
import { PrismicDocument } from "@prismicio/client";

export interface SkillsProps {
  settings: PrismicDocument<SettingsData, string, string>;
  skills: PrismicDocument<SkillData, string, string>[];
}
