"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LangLink } from "@/components/app/lang-link";
import Icon__LongArrow from "../assets/long-arrow";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  className?: string;
}

export default function PaginationBrand({
  currentPage,
  totalPages,
  className,
}: PaginationProps) {
  const pathname = usePathname();

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near the beginning
        pages.push(2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        // In the middle
        pages.push(
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div
      className={cn(
        "flex items-center justify-start mt-12 text-subheading",
        className
      )}
    >
      {/* Previous button */}
      {currentPage > 1 ? (
        <LangLink
          href={`${pathname}?page=${currentPage - 1}`}
          className="flex items-center justify-center w-10 h-10 text-primary hover:bg-gray-100 mr-4 [&>svg]:translate-x-2 hover:[&>svg]:translate-x-0 overflow-hidden [&>svg]:transition-all"
        >
          <Icon__LongArrow className="-rotate-y-180" />
        </LangLink>
      ) : (
        <div className="flex items-center justify-center w-10 h-10 text-gray-300 cursor-not-allowed mr-4 [&>svg]:translate-x-2 hover:[&>svg]:translate-x-0 overflow-hidden [&>svg]:transition-all">
          <Icon__LongArrow className="-rotate-y-180" />
        </div>
      )}

      {/* Page numbers */}
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center justify-center w-fit h-10 text-gray-400"
            >
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <LangLink
            key={pageNumber}
            href={`${pathname}?page=${pageNumber}`}
            className={cn(
              "flex items-center justify-center w-10 h-10 transition-colors font-medium px-2  hover:bg-app-light-gray",
              isActive ? "text-app-red" : "text-app-black"
            )}
          >
            {pageNumber}
          </LangLink>
        );
      })}

      {/* Next button */}
      {currentPage < totalPages ? (
        <LangLink
          href={`${pathname}?page=${currentPage + 1}`}
          className="flex items-center justify-center w-10 h-10 text-primary hover:bg-gray-100 transition-colors ml-4  overflow-hidden [&>svg]:-translate-x-2 [&>svg]:transition-all hover:[&>svg]:translate-x-0"
        >
          <Icon__LongArrow />
        </LangLink>
      ) : (
        <div className="flex items-center justify-center w-10 h-10 text-gray-300 cursor-not-allowed ml-4  overflow-hidden [&>svg]:-translate-x-2 [&>svg]:transition-all hover:[&>svg]:translate-x-0">
          <Icon__LongArrow />
        </div>
      )}
    </div>
  );
}
