import { redirect } from "next/navigation";
import { getPortfolioData } from "@/services/prismic/prismic.service";
import { isFilled } from "@prismicio/client";

export async function GET() {
  const { settings } = await getPortfolioData(["settings"]);

  if (settings?.data?.resume_link && isFilled.link(settings.data.resume_link)) {
    redirect(settings.data.resume_link.url);
  }

  redirect("/");
}
