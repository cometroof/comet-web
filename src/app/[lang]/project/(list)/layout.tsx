import FooterNew from "@/app/footer";
import ProjectPage__Category from "./category";
import { ReactNode } from "react";
import { getPageDictionary } from "../../dictionaries";
import { ParamsLang } from "../../types-general";
import { ProjectDictionary } from "@/types/dictionary";
import { cleanHTML } from "../../utils/utils";

export default async function ProjectPageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang = "en" } = (await params) as { lang: ParamsLang["lang"] };
  const { title, description } = (await getPageDictionary(
    lang,
    "project"
  )) as ProjectDictionary;
  return (
    <>
      <section className="bg-app-black text-app-white min-h-[360px] outer-wrapper !py-32">
        <div className="inner-wrapper">
          <h2 className="text-caption">{title}</h2>
          <div
            className="text-heading1 span-inner-red max-w-[674px] mt-6"
            dangerouslySetInnerHTML={{ __html: cleanHTML(description) }}
          />
        </div>
      </section>
      <section className="outer-wrapper-x">
        <div className="flex flex-col lg:flex-row gap-10 inner-wrapper">
          <div className="lg:w-1/4 py-12 lg:py-32">
            <ProjectPage__Category lang={lang} />
          </div>
          <div className="lg:w-3/4 lg:border-l border-l-app-light-gray lg:pl-32 py-12 lg:py-32">
            {children}
          </div>
        </div>
      </section>
      <div className="-mt-12">
        <FooterNew />
      </div>
    </>
  );
}
