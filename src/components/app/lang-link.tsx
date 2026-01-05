// components/Link.tsx
"use client";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { trackEvent } from "@/lib/gtag";

import { ComponentProps, MouseEvent } from "react";

interface LangLinkProps extends ComponentProps<typeof NextLink> {
  trackingName?: string;
}

export function LangLink({
  href,
  onClick,
  trackingName,
  ...props
}: LangLinkProps) {
  const { lang } = useParams<{ lang: "id" | "en" }>();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    trackEvent("Link To", {
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
