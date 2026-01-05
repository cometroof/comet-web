import { LangLink } from "@/components/app/lang-link";
import { ReactNode } from "react";

export default function PageLink({
  children,
  href,
  displayOnly,
  className,
  trackingName,
}: {
  children: ReactNode;
  href: string;
  displayOnly?: boolean;
  className?: string;
  trackingName?: string;
}) {
  return displayOnly ? (
    <div className={`page-link ${className}`}>{children}</div>
  ) : (
    <LangLink
      href={href}
      className={`page-link ${className}`}
      trackingName={trackingName}
    >
      {children}
    </LangLink>
  );
}
