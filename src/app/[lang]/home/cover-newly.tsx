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
        className="outer-wrapper !pb-0 relative min-h-screen overflow-x-hidden overflow-y-hidden"
        id="outer-comet-hero-image"
      >
        {/*Cover Thing*/}
        <Homepage__CoverThings lang={lang} coverData={coverData || []} />

        {/*Product Info*/}
        <div className="inner-wrapper z-10 mt-16 lg:mt-32 relative pb-6 lg:pb-14 !-mx-5 !w-[calc(100%+40px)] md:!mx-auto md:w-full bg-app-black md:bg-transparent px-5 lg:px-0">
          <div className="absolute -left-[5.5%] lg:left-[87%] bottom-0 translate-y-4 lg:translate-y-0 w-fit">
            <Asset__RoofModel className="w-[500px] h-[177px] lg:w-[724px] lg:h-[256px]" />
          </div>
          <div className="h-2 md:hidden" />
          <div className="w-[86.5%] h-px bg-[#fff] relative" />
          <p className="text-caption uppercase max-w-[293px] mt-5 relative">
            {home.cover.about_us_title}:
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-7 justify-between gap-8 lg:gap-4 mt-20 relative">
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
