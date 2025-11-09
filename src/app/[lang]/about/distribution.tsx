import Image from "next/image";
import { ParamsLang } from "../types-general";
import { getPageDictionary } from "../dictionaries";
import { AboutUsDictionary } from "@/types/dictionary";

export default async function AboutUsPage__Distribution({ lang }: ParamsLang) {
  const _lang = lang || "en";
  const { distribution: copy } = (await getPageDictionary(
    _lang,
    "about",
  )) as AboutUsDictionary;
  return (
    <section className="outer-wrapper-x py-24 bg-app-white relative">
      <div className="inner-wrapper">
        <h2 className="text-heading1 text-primary">5. {copy.title}</h2>
        <div className="flex flex-col lg:flex-row mt-8 gap-10 lg:gap-[100px]">
          <div className="lg:w-2/5">
            <p>{copy.description}</p>
          </div>
          <div className="lg:w-3/5">
            <div className="aspect-[3/1] relative">
              <Image
                fill
                className="size-full object-contain"
                alt="Inclusive Sustainability"
                src="https://comet-roof.my.id/images/nation-wide-map-1762703485651.webp"
              />
            </div>
          </div>
        </div>
        <div className="h-px w-full mt-20 bg-app-gray"></div>
        <div className="text-caption mt-5">{copy.label_partners}</div>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[100px] mt-8">
          <div className="lg:w-2/3">
            <p
              className="max-w-[658px]"
              dangerouslySetInnerHTML={{ __html: copy.desc_partners }}
            ></p>
          </div>
          <div className="lg:w-1/3 flex items-center gap-10">
            <img
              src="/assets/csa-logo.webp"
              alt="CSA Logo"
              className="w-[154px] h-auto"
            />
            <img
              src="/assets/mitra-10-logo.webp"
              alt="Mitra10 Logo"
              className="w-[154px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
