"use client";

import { usePathname, useRouter } from "next/navigation";

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

  // Switch language handlers
  const handleLanguageSwitch = (lang: string) => {
    const newPath = `/${lang}${getPathWithoutLang()}`;
    router.replace(newPath, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2 font-exo-2 text-white text-lg">
      <button
        type="button"
        className={`${isEnglish ? "text-red-500 font-extrabold" : ""}`}
        onClick={() => handleLanguageSwitch("en")}
      >
        EN
      </button>
      <div className="w-1 h-6 bg-white rounded-sm" />
      <button
        type="button"
        className={`${isIndonesian ? "text-red-500 font-extrabold" : ""}`}
        onClick={() => handleLanguageSwitch("id")}
      >
        ID
      </button>
    </div>
  );
}
