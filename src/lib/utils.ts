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
  targetPath: string | string[]
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

export function truncateAtWord(text: string, maxLength: number = 140) {
  // Jika text sudah lebih pendek, return apa adanya
  if (text.length <= maxLength) return text;

  // Potong di maxLength
  const truncated = text.substring(0, maxLength);

  // Cari spasi terakhir untuk potong di ujung kata
  const lastSpace = truncated.lastIndexOf(" ");

  // Jika tidak ada spasi (kata sangat panjang), potong paksa
  if (lastSpace === -1) {
    return truncated + "...";
  }

  // Potong di spasi terakhir dan tambah elipsis
  return truncated.substring(0, lastSpace) + "...";
}
