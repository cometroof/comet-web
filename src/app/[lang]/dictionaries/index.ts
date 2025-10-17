import "server-only";
import type { Dictionary, PageDictionary } from "@/types/dictionary";
import { notFound } from "next/navigation";

// Dictionary loaders for each language
const dictionaries = {
  en: {
    getPage: (page: string) =>
      import(`./en/pages/${page}.json`)
        .then((module) => module.default)
        .catch(() => null),
    getAll: () =>
      Promise.all([
        import("./en/pages/home.json").then((module) => ({
          home: module.default,
        })),
        import("./en/pages/contact.json").then((module) => ({
          contact: module.default,
        })),
        import("./en/pages/common.json").then((module) => ({
          common: module.default,
        })),
        // Add more pages as they are created
      ]).then((modules) => Object.assign({}, ...modules)),
  },
  id: {
    getPage: (page: string) =>
      import(`./id/pages/${page}.json`)
        .then((module) => module.default)
        .catch(() => null),
    getAll: () =>
      Promise.all([
        import("./id/pages/home.json").then((module) => ({
          home: module.default,
        })),
        import("./id/pages/contact.json").then((module) => ({
          contact: module.default,
        })),
        import("./id/pages/common.json").then((module) => ({
          common: module.default,
        })),
        // Add more pages as they are created
      ]).then((modules) => Object.assign({}, ...modules)),
  },
};

type ValidLocale = keyof typeof dictionaries;
const validPages = ["home", "contact", "common"];

/**
 * Get dictionary for the specified page in the given locale
 */
export const getPageDictionary = async (
  locale: string,
  page: string,
): Promise<PageDictionary> => {
  // Validate locale
  if (locale !== "en" && locale !== "id") {
    notFound();
  }

  // Get dictionary for the page
  const dictionary = await dictionaries[locale as ValidLocale].getPage(page);

  // If dictionary for page doesn't exist, return empty object or handle error
  if (!dictionary && validPages.includes(page)) {
    console.warn(
      `Dictionary for page '${page}' not found in locale '${locale}'`,
    );
  }

  return dictionary || {};
};

/**
 * Get the complete dictionary for the given locale
 * @deprecated Use getPageDictionary for better performance
 */
export const getDictionary = async (locale: string): Promise<Dictionary> => {
  // Validate locale
  if (locale !== "en" && locale !== "id") {
    notFound();
  }

  // Get all dictionaries for the locale
  return dictionaries[locale as ValidLocale].getAll();
};
