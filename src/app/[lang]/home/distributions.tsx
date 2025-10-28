import { HomeDictionary } from "@/types/dictionary";
import { ParamsLang } from "../types-general";
import Homepage__SectionHead from "./_section-head";
import { getPageDictionary } from "../dictionaries";
import Image from "next/image";

export default async function Homepage__Distributions({ lang }: ParamsLang) {
  const _lang = lang || "en";
  const home = (await getPageDictionary(_lang, "home")) as HomeDictionary;
  return (
    <section className="relative">
      <div className="outer-wrapper bg-app-light-gray">
        <div className="inner-wrapper text-app-gray py-20">
          <Homepage__SectionHead
            className="!pb-0 border-b-transparent"
            title={home.distribution.title}
            description={home.distribution.description}
            link="/about-us#distribution"
            linkText={home.distribution.cta}
            undertitle={
              <div className="flex gap-8 items-center flex-wrap mt-8">
                <div className="w-[150px] h-[110px] relative">
                  <Image
                    fill
                    className="size-full object-contain"
                    src="/assets/csa-logo.webp"
                    alt="Logo CSA"
                  />
                </div>
                <div className="w-[154px] h-[70px] relative">
                  <Image
                    fill
                    className="size-full object-contain"
                    src="/assets/mitra-10-logo.webp"
                    alt="Logo Mitra10"
                  />
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
