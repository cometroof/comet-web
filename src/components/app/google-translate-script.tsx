"use client";

import { ParamsLang } from "@/app/[lang]/types-general";
import { useCallback, useEffect } from "react";

type ExtendedWindow = Window & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  google?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  googleTranslateElementInit?: any;
};

type TProps = ParamsLang & {
  includedLanguages?: string;
};

export default function GoogleTranslateScript({
  lang,
  includedLanguages,
}: TProps) {
  const _lang = lang || "en";

  const googleTranslateElementInit = useCallback(() => {
    const newWindow = window as ExtendedWindow;
    if (newWindow && newWindow.google) {
      return new newWindow.google.translate.TranslateElement(
        {
          pageLanguage: "id",
          autoDisplay: false,
          includedLanguages,
        },
        "google_translate_element",
      );
    }
  }, [includedLanguages]);

  useEffect(() => {
    if (document && document.body) {
      const endpoint = `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
      const gTranslateScript = document.createElement("script");
      gTranslateScript.setAttribute("src", endpoint);
      document.body.appendChild(gTranslateScript);
      (window as ExtendedWindow).googleTranslateElementInit =
        googleTranslateElementInit;
    }
  }, [googleTranslateElementInit, _lang, includedLanguages]);

  return <div id="google_translate_element" />;
}
