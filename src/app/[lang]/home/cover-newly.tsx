import { getPageDictionary } from "../dictionaries";
import { ParamsLang } from "../types-general";
import Homepage__CoverThings from "./cover-things";
import supabaseClient from "@/supabase/client";
import type { HomeDictionary } from "@/types/dictionary";

import Icon__Interlocking from "@/components/assets/interlocking";
import Icon__LightWeight from "@/components/assets/lightweight";
import Icon__Sustainable from "@/components/assets/sustainable";
import Icon__DisasterResistant from "@/components/assets/disaster-ressistant";
import Icon__ModernMinimalist from "@/components/assets/modern-minimalist";
import Icon__Warranty from "@/components/assets/warranty";
import Asset__RoofModel from "@/components/assets/roof-model";
import Icon__LowerSound from "@/components/assets/lower-sound";

const getCoverData = async () => {
  return (
    await supabaseClient
      .from("slider")
      .select("*")
      .eq("type", "home-cover")
      .order("order", { ascending: true })
  ).data;
};

export default async function Homepage__HeroCoverNewly({ lang }: ParamsLang) {
  const home = (await getPageDictionary(lang, "home")) as HomeDictionary;
  const coverData = await getCoverData();
  const productInfo = [
    {
      key: "warranty",
      icon: <Icon__Warranty />,
      title: home.cover.about_us_warranty,
    },
    {
      key: "interlocking",
      icon: <Icon__Interlocking />,
      title: home.cover.about_us_precision,
    },
    {
      key: "lightweight",
      icon: <Icon__LightWeight />,
      title: home.cover.about_us_lightweight,
    },
    {
      key: "sustainable",
      icon: <Icon__Sustainable />,
      title: home.cover.about_us_environmentally,
    },
    {
      key: "non-combustible",
      icon: <Icon__LowerSound />,
      title: home.cover.about_us_combustible,
    },
    {
      key: "disaster-resistant",
      icon: <Icon__DisasterResistant />,
      title: home.cover.about_us_disaster,
    },
    {
      key: "modern-minimalist",
      icon: <Icon__ModernMinimalist />,
      title: home.cover.about_us_design,
    },
  ];
  return (
    <section className="relative text-background">
      <div
        className="outer-wrapper !pb-0 relative min-h-screen overflow-x-hidden"
        id="outer-comet-hero-image"
      >
        {/*Cover Thing*/}
        <Homepage__CoverThings lang={lang} coverData={coverData || []} />

        {/*Product Info*/}
        <div className="inner-wrapper mt-32 relative pb-14">
          <div className="absolute left-[87%] bottom-0  w-fit">
            <Asset__RoofModel />
          </div>
          <div className="w-[86.5%] h-px bg-[#fff] relative" />
          <p className="text-caption uppercase max-w-[293px] mt-5 relative">
            {home.cover.about_us_title}:
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
