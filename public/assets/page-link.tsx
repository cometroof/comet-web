import { LangLink } from "@/components/app/lang-link";
import { ReactNode } from "react";

export default function PageLink({
  children,
  href,
  displayOnly,
  className,
}: {
  children: ReactNode;
  href: string;
  displayOnly?: boolean;
  className?: string;
}) {
  return displayOnly ? (
    <div className={`page-link ${className}`}>{children}</div>
  ) : (
    <LangLink href={href} className={`page-link ${className}`}>
      {children}
    </LangLink>
  );
}
