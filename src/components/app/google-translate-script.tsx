"use client";

import { ParamsLang } from "@/app/[lang]/types-general";
import { useEffect } from "react";
import "./google-translate-script.css";

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

  useEffect(() => {
    const googleTranslateElementInit = () => {
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
    };

    if (document && document.body) {
      const endpoint = `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
      const gTranslateScript = document.createElement("script");
      gTranslateScript.setAttribute("src", endpoint);
      document.body.appendChild(gTranslateScript);
      (window as ExtendedWindow).googleTranslateElementInit =
        googleTranslateElementInit;
    }
  }, [includedLanguages]);

  return <div id="google_translate_element" />;
}
