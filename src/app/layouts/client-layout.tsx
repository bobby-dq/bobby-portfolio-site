"use client";

import { useState } from "react";
import Footer from "@/app/navigation/footer";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { getNavigationItems } from "@/services/navigation/navigation.service";
import Navigation from "../navigation/navigation";
import { useSettings } from "@/hooks/useSettings";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings } = useSettings();
  const [isExpandedSidebar, setIsExpandedSidebar] = useState(false);
  const navItems = getNavigationItems();
  const { currentSection, setCurrentSection, isScrolled } =
    useSectionTracking(navItems);

  return (
    <div className="min-h-screen flex flex-col">
      {settings && (
        <Navigation
          settings={settings}
          currentSection={currentSection}
          isScrolled={isScrolled}
          isExpandedSidebar={isExpandedSidebar}
          setCurrentSection={setCurrentSection}
          setIsExpandedSidebar={setIsExpandedSidebar}
          navItems={navItems}
        />
      )}
      <main className="flex-grow pt-24 ml-12">{children}</main>
      {settings && <Footer settings={settings} />}
    </div>
  );
}
