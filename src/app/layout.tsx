import { getPortfolioData } from "@/services/prismic/prismic.service";
import "./globals.css";
import { Pirata_One, Cambay } from "next/font/google";
import Navbar from "@/app/navigation/navbar";
import Footer from "@/app/navigation/footer";
import Sidebar from "@/app/navigation/sidebar";

const primaryFont = Pirata_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-primary",
});

const secondaryFont = Cambay({
  subsets: ["latin"],
  weight: ["400", "700"],
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
        <div className="min-h-screen flex flex-col">
          {settings && <Navbar settings={settings}></Navbar>}
          {settings && <Sidebar settings={settings}></Sidebar>}
          <main className="flex-grow pt-24">{children}</main>
          {settings && <Footer settings={settings}></Footer>}
        </div>
      </body>
    </html>
  );
}
