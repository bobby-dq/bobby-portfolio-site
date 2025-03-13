import { SettingsData } from "@/services/prismic/prismic.dto";
import { PrismicDocument } from "@prismicio/client";

export interface NavbarProps {
  settings: PrismicDocument<SettingsData, string, string>;
}
