import { HomepageData, SettingsData } from "@/services/prismic/prismic.dto";
import { PrismicDocument } from "@prismicio/client";

export interface HeroProps {
  settings: PrismicDocument<SettingsData, string, string>;
  homepage: PrismicDocument<HomepageData, string, string>;
}
