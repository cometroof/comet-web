"use client";

import { ParamsLang } from "../types-general";
import { HomeDictionary, ProductDictionary } from "@/types/dictionary";

import Icon__Interlocking from "@/components/assets/interlocking";
import Icon__LightWeight from "@/components/assets/lightweight";
import Icon__Sustainable from "@/components/assets/sustainable";
import Icon__DisasterResistant from "@/components/assets/disaster-ressistant";
import Icon__ModernMinimalist from "@/components/assets/modern-minimalist";
import Icon__Warranty from "@/components/assets/warranty";
import Asset__RoofModel from "@/components/assets/roof-model";
import Icon__LowerSound from "@/components/assets/lower-sound";
import { useState } from "react";
import { cleanHTML } from "../utils/utils";
import { cn } from "@/lib/utils";

interface Props {
  lang: ParamsLang["lang"];
  homeCopy: HomeDictionary;
  productCopy: ProductDictionary;
}

function WarrantyContent({ copy }: { copy: ProductDictionary }) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 py-6 lg:py-20">
      <div className="lg:w-2/3 space-y-5">
        <div className="text-heading2">{copy.warrantyContent.title}</div>
        <div
          className="text-body"
          dangerouslySetInnerHTML={{
            __html: cleanHTML(copy.warrantyContent.description),
          }}
        />
      </div>
      <div className="flex gap-5 lg:gap-8 flex-wrap">
        <div className="size-24 relative">
          <img
            alt="10 Years Corrosive Protection"
            src="https://comet-roof.my.id/images/10years-corossive-protection-1761163275906.png"
          />
        </div>
        <div className="size-24 relative">
          <img
            alt="5 Years Warranty"
            src="https://comet-roof.my.id/images/5years-warranty-1761163275023.png"
          />
        </div>
      </div>
    </div>
  );
}

function InterlockingContent({ copy }: { copy: ProductDictionary }) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 py-6 lg:py-20">
      <div className="lg:w-1/2 space-y-5">
        <div className="text-heading2">{copy.interlockingContent.title}</div>
        <div
          className="text-body [&>p]:my-4"
          dangerouslySetInnerHTML={{
            __html: cleanHTML(copy.interlockingContent.description),
          }}
        />
      </div>
      <div className="lg:w-1/2 flex gap-5 lg:gap-8 flex-wrap">
        <img
          className="block w-full"
          alt="Interlocking visual"
          src="https://comet-roof.my.id/images/interlocking-visual-1762968182945.webp"
        />
      </div>
    </div>
  );
}

function LightweightContent({ copy }: { copy: ProductDictionary }) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 py-6 lg:py-20">
      <div className="lg:w-1/2 space-y-5">
        <div className="text-heading2">{copy.lightweightContent.title}</div>
        <div
          className="text-body [&>p]:my-4"
          dangerouslySetInnerHTML={{
            __html: cleanHTML(copy.lightweightContent.description),
          }}
        />
      </div>
      <div className="w-full lg:max-w-[280px]">
        <div className="font-exo-2 font-bold text-sm">
          {copy.lightweightContent.weightPanel}
        </div>
        <div className="mt-4 space-y-2.5">
          <div className="text-sm">
            <b className="font-exo-2 font-bold">S</b> 1,60 kg
          </div>
          <div className="text-sm">
            <b className="font-exo-2 font-bold">M</b> 1,80 kg
          </div>
          <div className="text-sm">
            <b className="font-exo-2 font-bold">L</b> 2,00 kg
          </div>
          <div className="text-sm">
            <b className="font-exo-2 font-bold">XL</b> 2,25 kg
          </div>
          <div className="text-sm">
            <b className="font-exo-2 font-bold">XXL</b> 2,50 kg
          </div>
        </div>
      </div>
    </div>
  );
}

function SustainableContent({ copy }: { copy: ProductDictionary }) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 py-6 lg:py-20">
      <div className="lg:w-1/2 space-y-5">
        <div className="text-heading2">{copy.sustainableContent.title}</div>
        <div className="text-body [&>p]:my-4">
          {copy.sustainableContent.description}
        </div>
      </div>
    </div>
  );
}

function NonCombustibleContent({ copy }: { copy: ProductDictionary }) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 py-6 lg:py-20">
      <div className="lg:w-1/2 space-y-5">
        <div className="text-heading2">{copy.lowerNoise.title}</div>
        <div className="text-body [&>p]:my-4">
          {copy.lowerNoise.description}
        </div>
      </div>
    </div>
  );
}

function DisasterResistantContent({ copy }: { copy: ProductDictionary }) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 py-6 lg:py-20">
      <div className="lg:w-1/2 space-y-5">
        <div className="text-heading2">{copy.disasterResistant.title}</div>
        <div
          className="text-body [&>p]:my-4"
          dangerouslySetInnerHTML={{
            __html: cleanHTML(copy.disasterResistant.description),
          }}
        ></div>
      </div>
    </div>
  );
}

function ModernDesignContent({ copy }: { copy: ProductDictionary }) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 py-6 lg:py-20">
      <div className="lg:w-1/2 space-y-5">
        <div className="text-heading2">{copy.modernDesign.title}</div>
        <div
          className="text-body [&>p]:my-4"
          dangerouslySetInnerHTML={{
            __html: cleanHTML(copy.modernDesign.description),
          }}
        ></div>
      </div>
    </div>
  );
}

export default function ProductInfo({ lang, productCopy, homeCopy }: Props) {
  const [active, setActive] = useState(0);
  const home = homeCopy;
  const productInfo = [
    {
      key: "warranty",
      icon: <Icon__Warranty />,
      title: home.cover.about_us_warranty,
      content: <WarrantyContent copy={productCopy} />,
    },
    {
      key: "interlocking",
      icon: <Icon__Interlocking />,
      title: home.cover.about_us_precision,
      content: <InterlockingContent copy={productCopy} />,
    },
    {
      key: "lightweight",
      icon: <Icon__LightWeight />,
      title: home.cover.about_us_lightweight,
      content: <LightweightContent copy={productCopy} />,
    },
    {
      key: "sustainable",
      icon: <Icon__Sustainable />,
      title: home.cover.about_us_environmentally,
      content: <SustainableContent copy={productCopy} />,
    },
    {
      key: "non-combustible",
      icon: <Icon__LowerSound />,
      title: home.cover.about_us_combustible,
      content: <NonCombustibleContent copy={productCopy} />,
    },
    {
      key: "disaster-resistant",
      icon: <Icon__DisasterResistant />,
      title: home.cover.about_us_disaster,
      content: <DisasterResistantContent copy={productCopy} />,
    },
    {
      key: "modern-minimalist",
      icon: <Icon__ModernMinimalist />,
      title: home.cover.about_us_design,
      content: <ModernDesignContent copy={productCopy} />,
    },
  ];
  return (
    <>
      <section
        className={`hidden lg:block outer-wrapper text-app-white relative !pb-0 !pt-6 border-b-2 ${
          active === productInfo.length - 1
            ? "border-primary"
            : "border-app-white"
        } overflow-x-clip`}
      >
        <div className="hidden lg:block w-[94%] bg-app-black h-full absolute left-0 top-0" />
        <div className="hidden lg:block inner-wrapper relative lg:pt-10">
          <div className="absolute left-[87%] bottom-0  w-fit translate-y-[4px]">
            <Asset__RoofModel className="w-[274px] h-[95px] md:w-[297px] md:h-[106px] lg:w-[724px] lg:h-[256px]" />
          </div>
          <div className="grid grid-cols-7 justify-between gap-4 mt-0 lg:mt-20 relative">
            {productInfo.map((item, index) => {
              return (
                <div
                  key={index}
                  role="button"
                  className={`flex flex-col gap-6 pb-2 md:pb-4 relative cursor-pointer after:absolute after:z-10 after:left-[50%] after:-translate-x-[50%] after:-bottom-[2.5px] after:h-[3px] after:transition-all after:bg-primary ${
                    index === active
                      ? " after:w-full after:duration-300"
                      : " after:w-0"
                  }`}
                  onClick={() => setActive(index)}
                >
                  <div
                    className={`h-10 flex items-end justify-center ${
                      index !== active ? "opacity-40 hover:opacity-70" : ""
                    }`}
                  >
                    {item.icon}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="-mt-20 lg:mt-0 lg:hidden outer-wrapper-x pt-0 text-app-white relative">
        {/* <div
          className={`${
            active === productInfo.length - 1 ? "w-[94%]" : "w-full"
          } transition-all bg-app-black h-full absolute left-0 top-0`}
        /> */}
        <div className="lg:hidden inner-wrapper relative">
          <div className="overflow-x-auto hide-scrollbar overflow-y-hidden -mx-5 px-5 relative">
            <div className="w-[24%] bg-app-black h-full absolute left-0 top-0" />
            <div className="flex gap-5 relative w-fit">
              <div className="w-[96.5%] bg-app-black h-full absolute left-0 top-0" />
              {productInfo.map((item, index) => {
                return (
                  <div
                    key={index}
                    role="button"
                    className={cn(
                      `flex flex-col gap-6 pb-4 pt-3 relative z-20 cursor-pointer`,
                      `after:absolute after:z-20 after:left-[50%] after:-translate-x-[50%] after:-bottom-0 after:h-[3px] after:transition-all after:bg-primary`,
                      index === active
                        ? " after:w-full after:duration-300"
                        : " after:w-0"
                    )}
                    onClick={() => setActive(index)}
                  >
                    <div
                      className={`h-12 flex items-end justify-center ${
                        index !== active ? "opacity-40 hover:opacity-70" : ""
                      }`}
                    >
                      {item.icon}
                    </div>
                  </div>
                );
              })}
              <div className="absolute left-[87%] bottom-0 w-[140px] overflow-hidden">
                <Asset__RoofModel className="w-[219px] h-[76px]" />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`h-[3px] ${
            active === productInfo.length - 1 ? "bg-primary" : "bg-app-white"
          } absolute left-0 bottom-0 w-full`}
        />
      </section>
      <section
        className={`${
          active === productInfo.length - 1 ? "bg-primary" : "bg-app-black"
        } outer-wrapper relative text-app-white`}
      >
        <div className="inner-wrapper">
          <div className="max-w-6xl mx-auto">
            {productInfo[active].content ?? "No Content"}
          </div>
        </div>
      </section>
    </>
  );
}
