import { ExperienceData } from "@/services/prismic/prismic.dto";
import { PrismicDocument } from "@prismicio/client";

export interface ExperienceCardProps {
  experience: PrismicDocument<ExperienceData, string, string>;
}
