import Link from "next/link";
import { ReactNode } from "react";

export default function PageLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Link href={href} className="page-link">
      {children}
    </Link>
  );
}
