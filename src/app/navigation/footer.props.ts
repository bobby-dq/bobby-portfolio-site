import { SettingsData } from "@/services/prismic/prismic.dto";
import { PrismicDocument } from "@prismicio/client";

export interface FooterProps {
  settings: PrismicDocument<SettingsData, string, string>;
}
