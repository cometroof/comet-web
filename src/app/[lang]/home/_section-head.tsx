import BrandButton from "@/components/app/brand-button";
import Link from "next/link";
import { ReactNode } from "react";

export default function Homepage__SectionHead({
  title,
  description,
  linkText = "LINK TEXT",
  link,
  closerText,
  undertitle = null,
  className = "",
}: {
  title: string;
  description: string;
  linkText?: string;
  link?: string;
  closerText?: string;
  undertitle?: ReactNode;
  className?: string;
}) {
  function sanitizeHtml(html: string) {
    return html.replace(/<[^>]*>?/gm, "");
  }
  return (
    <div>
      <div
        className={`w-full flex justify-between gap-40 border-b border-b-black pb-[92px] ${className}`}
      >
        <div className="w-full lg:w-2/3 lg:max-w-[640px]">
          <h2 className="hidden">{sanitizeHtml(title)}</h2>
          <div
            className="text-heading1 span-inner-red"
            dangerouslySetInnerHTML={{ __html: title }}
          ></div>
          {undertitle}
        </div>
        <div className="w-1/2 flex flex-col gap-12">
          <p
            className="text-body text-[#58595B]"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
          {link && (
            <Link href={link}>
              <BrandButton className="btn-fill">{linkText}</BrandButton>
            </Link>
          )}
        </div>
      </div>
      {closerText && <div className="mt-5 text-caption">{closerText}</div>}
    </div>
  );
}
