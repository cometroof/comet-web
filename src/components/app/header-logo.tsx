"use client";

import { trackEvent } from "@/lib/gtag";
import { LangLink } from "./lang-link";
import { ReactNode } from "react";

export default function HeaderLogo({
  children,
}: Readonly<{ children: ReactNode }>) {
  const handleClick = () => {
    trackEvent("Header Logo", {
      screen_name: "Logo",
    });
  };

  return (
    <LangLink
      href="/"
      className="w-[160px] h-9 relative"
      title="Home - Comet"
      onClick={handleClick}
    >
      {children}
    </LangLink>
  );
}
