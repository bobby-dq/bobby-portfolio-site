"use client";

import { SettingsData } from "@/services/prismic/prismic.dto";
import { PrismicDocument } from "@prismicio/client";
import { createContext, ReactNode } from "react";

export interface SettingsContextType {
  settings: PrismicDocument<SettingsData, string, string> | null;
}

export interface SettingsProviderProps {
  children: ReactNode;
  settings: PrismicDocument<SettingsData, string, string> | null;
}

export const SettingsContext = createContext<SettingsContextType>({
  settings: null,
});

export function SettingsProvider({
  children,
  settings,
}: SettingsProviderProps) {
  return (
    <SettingsContext.Provider value={{ settings }}>
      {children}
    </SettingsContext.Provider>
  );
}
