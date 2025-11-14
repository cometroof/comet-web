import BrandButton from "@/components/app/brand-button";
import { Download } from "lucide-react";
import { ParamsLang } from "../types-general";
import { getPageDictionary } from "../dictionaries";
import { AboutUsDictionary } from "@/types/dictionary";
import { cleanHTML } from "../utils/utils";

export default async function AboutUsPage__Cover({ lang }: ParamsLang) {
  const _lang = lang || "en";
  const { cover } = (await getPageDictionary(
    _lang,
    "about",
  )) as AboutUsDictionary;
  return (
    <section className="outer-wrapper bg-app-light-gray !py-[106px]">
      <div className="inner-wrapper  flex flex-col lg:flex-row gap-20 lg:justify-between items-start">
        <div className="w-full">
          <h2 className="text-caption">{cover.title}</h2>
          <div
            className="mt-4 text-heading1 span-inner-red"
            dangerouslySetInnerHTML={{ __html: cleanHTML(cover.description) }}
          ></div>
        </div>
        <div className="w-full">
          <p
            className="text-body mt-10"
            dangerouslySetInnerHTML={{ __html: cleanHTML(cover.letter) }}
          ></p>
          <BrandButton className="mt-16 btn-fill">
            <Download className="size-5" />
            <span>{cover.cta}</span>
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
