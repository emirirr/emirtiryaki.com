import type { NavigateFunction } from "react-router-dom";

const PLACEHOLDER = "https://emirtiryaki.com";

export function hasProjectVisitLink(link: string): boolean {
  return link !== PLACEHOLDER;
}

export function navigateOrOpenProjectLink(link: string, navigate: NavigateFunction): void {
  if (link.startsWith("/")) {
    navigate(link);
    return;
  }
  window.open(link, "_blank", "noopener,noreferrer");
}

export function projectVisitButtonLabel(link: string): string {
  return link.startsWith("/") ? "Detay" : "Demo";
}
