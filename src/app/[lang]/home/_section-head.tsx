import BrandButton from "@/components/app/brand-button";
import { LangLink } from "@/components/app/lang-link";
import { ReactNode } from "react";
import { cleanHTML } from "../utils/utils";

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
        className={`w-full flex flex-col lg:flex-row justify-between gap-10 lg:gap-40 border-b border-b-black pb-[92px] ${className}`}
      >
        <div className="w-full lg:w-2/3 lg:max-w-[640px]">
          <h2 className="hidden">{sanitizeHtml(title)}</h2>
          <div
            className="text-heading1 span-inner-red text-app-gray"
            dangerouslySetInnerHTML={{ __html: title }}
          ></div>
          {undertitle}
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-12">
          <p
            className="text-body text-app-gray"
            dangerouslySetInnerHTML={{ __html: cleanHTML(description) }}
          ></p>
          {link && (
            <LangLink href={link}>
              <BrandButton className="btn-fill">{linkText}</BrandButton>
            </LangLink>
          )}
        </div>
      </div>
      {closerText && (
        <div className="mt-5 text-caption text-app-gray">{closerText}</div>
      )}
    </div>
  );
}
