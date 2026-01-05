// components/Link.tsx
"use client";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { trackEvent } from "@/lib/gtag";

// eslint-disable-next-line
export function LangLink({ href, onClick, trackingName, ...props }: any) {
  const { lang } = useParams<{ lang: "id" | "en" }>();

  const handleClick = (e: any) => {
    trackEvent("screen_view", {
      screen_name: trackingName || `Link: ${href}`,
    });
    if (onClick) onClick(e);
  };

  if (
    typeof href === "string" &&
    href.startsWith("/") &&
    !href.startsWith(`/${lang}`)
  ) {
    href = `/${lang}${href}`;
  }

  return (
    <NextLink href={href} {...props} onClick={handleClick} scroll={true} />
  );
}
