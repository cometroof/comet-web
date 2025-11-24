// components/Link.tsx
"use client";
import NextLink from "next/link";
import { useParams } from "next/navigation";

// eslint-disable-next-line
export function LangLink({ href, ...props }: any) {
  const { lang } = useParams<{ lang: "id" | "en" }>();
  if (
    typeof href === "string" &&
    href.startsWith("/") &&
    !href.startsWith(`/${lang}`)
  ) {
    href = `/${lang}${href}`;
  }

  return <NextLink href={href} {...props} scroll={true} />;
}
