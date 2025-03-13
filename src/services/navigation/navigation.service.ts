import { NavItem } from "./nav-item.dto";

export const getNavigationItems = (): NavItem[] => {
  return [
    {
      id: "home",
      label: "Home",
      subtext: "A brief context",
      number: "01",
    },
    {
      id: "work",
      label: "Work",
      subtext: "A professional summary",
      number: "02",
    },
    {
      id: "education",
      label: "Education",
      subtext: "An academic overview",
      number: "03",
    },
    {
      id: "project",
      label: "Projects",
      subtext: "A quick show-and-tell",
      number: "04",
    },
    {
      id: "skills",
      label: "Skills",
      subtext: "An ability check",
      number: "05",
    },
    {
      id: "contact",
      label: "Contact",
      subtext: "A ring",
      number: "06",
    },
  ];
};
