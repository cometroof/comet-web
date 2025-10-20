import { getPageDictionary } from "../dictionaries";
import { ParamsLang } from "../types-general";
import Homepage__CoverThings from "./cover-things";
import type { HomeDictionary } from "@/types/dictionary";

import Icon__Interlocking from "@/components/assets/interlocking";
import Icon__LightWeight from "@/components/assets/lightweight";
import Icon__Sustainable from "@/components/assets/sustainable";
import Icon__NonCombustible from "@/components/assets/non-combustible";
import Icon__DisasterResistant from "@/components/assets/disaster-ressistant";
import Icon__ModernMinimalist from "@/components/assets/modern-minimalist";
import Icon__Warranty from "@/components/assets/warranty";
import Asset__RoofModel from "@/components/assets/roof-model";

const productInfo = [
  {
    key: "warranty",
    icon: <Icon__Warranty />,
    title: "Warranty Backed Quality",
  },
  {
    key: "interlocking",
    icon: <Icon__Interlocking />,
    title: "Precision Interlocking System",
  },
  {
    key: "lightweight",
    icon: <Icon__LightWeight />,
    title: "Lightweight Yet Strong",
  },
  {
    key: "sustainable",
    icon: <Icon__Sustainable />,
    title: "Environmentally Sustainable",
  },
  {
    key: "non-combustible",
    icon: <Icon__NonCombustible />,
    title: "Non-Combustible Materials",
  },
  {
    key: "disaster-resistant",
    icon: <Icon__DisasterResistant />,
    title: "Natural Disaster Resistant",
  },
  {
    key: "modern-minimalist",
    icon: <Icon__ModernMinimalist />,
    title: "Modern Minimalist Design",
  },
];

export default async function Homepage__HeroCoverNewly({ lang }: ParamsLang) {
  const home = (await getPageDictionary(lang, "home")) as HomeDictionary;
  return (
    <section className="relative text-background">
      <div
        className="outer-wrapper !pb-0 relative min-h-screen overflow-x-hidden"
        id="outer-comet-hero-image"
      >
        {/*Cover Thing*/}
        <Homepage__CoverThings lang={lang} />

        {/*Product Info*/}
        <div className="inner-wrapper mt-32 relative pb-14">
          <div className="absolute left-[87%] bottom-0  w-fit">
            <Asset__RoofModel />
          </div>
          <div className="w-3/4 h-px bg-[#fff] relative" />
          <p className="text-caption uppercase max-w-[293px] mt-5 relative">
            {home.cover.poet}:
          </p>
          <div className="grid grid-cols-7 justify-between gap-4 mt-20 relative">
            {productInfo.map((item, index) => {
              return (
                <div key={index} className="flex flex-col gap-6">
                  <div className="h-10 flex items-end justify-center">
                    {item.icon}
                  </div>
                  <div className="text-subheading text-center line-clamp-3">
                    {item.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
