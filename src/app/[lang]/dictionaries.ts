import "server-only";

const dictionaries = {
  en: () => import("./dict/en/index.json").then((module) => module.default),
  id: () => import("./dict/id/index.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en" | "id") =>
  dictionaries[locale]();
