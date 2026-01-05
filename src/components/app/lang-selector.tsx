"use client";

import { usePathname, useRouter } from "next/navigation";
import { trackEvent } from "@/lib/gtag";

export default function LanguageSelector() {
  // Import required hooks from Next.js

  const pathname = usePathname();
  const router = useRouter();

  // Check current language from path
  const isEnglish = pathname.startsWith("/en");
  const isIndonesian = pathname.startsWith("/id");

  // Get the rest of the path after language prefix
  const getPathWithoutLang = () => {
    if (isEnglish) return pathname.substring(3); // remove '/en'
    if (isIndonesian) return pathname.substring(3); // remove '/id'
    return pathname;
  };

  function setCookie(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expires}; path=/; domain=${window.location.hostname}`;
  }

  // handle cookie google translate
  const handleGoogleTranslate = (
    lang: string,
    reload: boolean = false,
    nextPath?: string
  ) => {
    const _sourceLang = "en";
    const _targetLang = lang;
    setCookie("googtrans", `/${_sourceLang}/${_targetLang}`, 7);
    if (reload) {
      if (nextPath) window.location.href = nextPath;
      else window.location.reload();
    }
  };

  // Switch language handlers
  const handleLanguageSwitch = (lang: string) => {
    trackEvent("web_comet_event", {
      screen_name: `Switch Language to: ${lang.toUpperCase()}`,
    });
    const _path = getPathWithoutLang();
    const inArticleDetail = /^\/article\/[A-Za-z0-9-_]+$/.test(_path);
    const newPath = `/${lang}${_path}`;
    router.replace(newPath, { scroll: false });
    handleGoogleTranslate(lang, inArticleDetail, newPath);
  };

  return (
    <div className="flex items-center gap-2 font-exo-2 text-white text-lg  notranslate">
      <button
        type="button"
        className={`${isEnglish ? "text-red-500 font-extrabold" : ""}`}
        onClick={() => handleLanguageSwitch("en")}
        aria-label="Switch Button to EN"
      >
        EN
      </button>
      <div className="w-1 h-6 bg-white rounded-sm" />
      <button
        type="button"
        className={`${isIndonesian ? "text-red-500 font-extrabold" : ""}`}
        onClick={() => handleLanguageSwitch("id")}
        aria-label="Switch Button to ID"
      >
        ID
      </button>
    </div>
  );
}
