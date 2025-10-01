import Link from "next/link";
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
    <Link href={href} className={`page-link ${className}`}>
      {children}
    </Link>
  );
}
