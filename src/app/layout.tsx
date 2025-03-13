import { getPortfolioData } from "@/services/prismic/prismic.service";
import "./globals.css";
import { Pirata_One, Forum } from "next/font/google";
import { SettingsProvider } from "@/providers/settings.provider";
import ClientLayout from "./layouts/client-layout";
import { GSAPProvider } from "@/providers/gsap.providers";

const primaryFont = Pirata_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-primary",
});

const secondaryFont = Forum({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-secondary",
});

export const metadata = {
  title: "Bobby Quilacio | Software Engineer",
  description:
    "Passionate about crafting user-friendly APIs and web applications with a focus on delivering scalable, clean, and maintainable code.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings } = await getPortfolioData(["settings"]);
  return (
    <html
      lang="en"
      className={`${primaryFont.variable} ${secondaryFont.variable} scroll-smooth`}
    >
      <body className="bg-base text-ink-300 font-secondary">
        {settings && (
          <SettingsProvider settings={settings}>
            <GSAPProvider>
              <ClientLayout>{children}</ClientLayout>
            </GSAPProvider>
          </SettingsProvider>
        )}
      </body>
    </html>
  );
}
