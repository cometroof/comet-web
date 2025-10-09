import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stripHTML(htmlString: string) {
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
}

export function isHomepage(pathname?: string) {
  const locales = ["en", "id"];

  if (!pathname) return false;
  if (pathname === "/") return true;

  const pathWithoutSlash = pathname.replace(/^\//, "");
  return locales.includes(pathWithoutSlash);
}

export function isCurrentPath(
  currentPath: string,
  targetPath: string | string[],
): boolean {
  const locales = ["en", "id"];

  if (Array.isArray(targetPath)) {
    return targetPath.some((path) => isCurrentPath(currentPath, path));
  }

  const normalizedTarget = targetPath.startsWith("/")
    ? targetPath
    : `/${targetPath}`;

  if (currentPath === normalizedTarget) return true;

  if (
    normalizedTarget === "/" &&
    locales.includes(currentPath.replace(/^\//, ""))
  ) {
    return true;
  }

  for (const locale of locales) {
    const pathWithLocale = `/${locale}${normalizedTarget}`;
    if (currentPath === pathWithLocale) return true;
  }

  return false;
}
