import "server-only";
import type { Dictionary } from "@/types/dictionary";

const dictionaries = {
  en: () => import("./en/index.json").then((module) => module.default),
  id: () => import("./id/index.json").then((module) => module.default),
};

type ValidLocale = keyof typeof dictionaries;

export const getDictionary = async (
  locale: "en" | "id",
): Promise<Dictionary> => {
  const validLocale: ValidLocale =
    locale === "en" || locale === "id" ? locale : "id";
  return dictionaries[validLocale]();
};
