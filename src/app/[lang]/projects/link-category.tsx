"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LinkCategory({
  link,
  name,
}: {
  link: string;
  name: string;
}) {
  const path = usePathname();

  function isActiveProject(link: string) {
    if (
      link === "/" &&
      path.replace("/en", "").replace("/id", "") === "/projects"
    )
      return true;
    if (link === "/") return false;
    return path.includes("/projects/category" + link);
  }

  return (
    <Link
      href={link === "/" ? "/projects" : `/projects/category${link}`}
      className={`text-heads hover:underline ${isActiveProject(link) ? "text-app-red" : "text-app-gray"} uppercase`}
    >
      {name}
    </Link>
  );
}
