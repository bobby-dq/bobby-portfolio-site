import { sendGAEvent } from "@next/third-parties/google";

export function useAnalytics() {
  const trackSectionView = (sectionId: string) =>
    sendGAEvent("event", "section_view", { section_id: sectionId });

  const trackContactClick = (
    method: "email" | "github" | "linkedin" | "resume"
  ) => sendGAEvent("event", "contact_click", { method });

  const trackProjectExpand = (
    projectTitle: string,
    action: "expand" | "collapse"
  ) =>
    sendGAEvent("event", "project_expand", {
      project_title: projectTitle,
      action,
    });

  const trackProjectLink = (
    projectTitle: string,
    linkType: "live" | "github"
  ) =>
    sendGAEvent("event", "project_link_click", {
      project_title: projectTitle,
      link_type: linkType,
    });

  const trackNavClick = (sectionId: string) =>
    sendGAEvent("event", "nav_click", { section_id: sectionId });

  return {
    trackSectionView,
    trackContactClick,
    trackProjectExpand,
    trackProjectLink,
    trackNavClick,
  };
}
