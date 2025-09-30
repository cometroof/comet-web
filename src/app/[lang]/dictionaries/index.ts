import "server-only";
import type { Dictionary } from "@/types/dictionary";

const dictionaries = {
  en: () => import("./en/index.json").then((module) => module.default),
  id: () => import("./id/index.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en" | "id"): Promise<Dictionary> =>
  dictionaries[locale]();
