"use client";

import { ParamsLang } from "../types-general";
import { memo, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import BrandButton from "@/components/app/brand-button";
import Image from "next/image";
import { Database } from "@/supabase/supabase";
import { LangLink } from "@/components/app/lang-link";

interface IHeroImage {
  src: string;
  alt: string;
  isActive: boolean;
}

interface IHeroContent {
  item: {
    title: { id: string | null | undefined; en: string | null | undefined };
    description: {
      id: string | null | undefined;
      en: string | null | undefined;
    };
    link: {
      text: string | null | undefined;
      target: string | null | undefined;
    };
    image: string | null | undefined;
  };
  isActive: boolean;
  lang: ParamsLang["lang"];
}

const HeroImage = ({ src, alt, isActive }: IHeroImage) => (
  <Image
    alt={alt}
    src={src}
    className={cn(
      "absolute left-0 top-0 size-full object-cover transition-all",
      isActive ? "opacity-100 duration-700" : "opacity-0 duration-700"
    )}
    width={100}
    height={100}
    unoptimized
  />
);

const MemoizedHeroImage = memo(HeroImage, (prev, next) => {
  // Only re-render if isActive status changes
  return prev.isActive === next.isActive;
});

const HeroContent = ({ item, isActive, lang }: IHeroContent) => (
  <div
    className={cn(
      "col-start-1 row-start-1 transition-all",
      isActive
        ? "opacity-100 z-10 duration-500 delay-75 translate-y-0"
        : "opacity-0 z-0 pointer-events-none duration-300 translate-y-10"
    )}
  >
    <h2
      className="mt-16 lg:mt-32 line-clamp-2 text-hero"
      dangerouslySetInnerHTML={{ __html: item.title[lang] ?? "" }}
    />
    <p className="line-clamp-5 text-[17px] leading-[1.5em] mt-8">
      {item.description[lang] ?? ""}
    </p>
    <div className="mt-12">
      {item.link.target && (
        <LangLink href={item.link.target}>
          <BrandButton className="btn-fill">
            {item.link.text || "LEARN MORE"}
          </BrandButton>
        </LangLink>
      )}
    </div>
  </div>
);

const MemoizedHeroContent = memo(HeroContent, (prev, next) => {
  // Only re-render if isActive changes
  return prev.isActive === next.isActive && prev.lang === next.lang;
});

interface Props extends ParamsLang {
  coverData?: Partial<Database["public"]["Tables"]["slider"]["Row"]>[];
}

export default function Homepage__CoverThings({ lang, coverData }: Props) {
  const [step, setStep] = useState(0);
  const _lang = lang ?? "en";

  // Memoize coverdata length untuk stabilitas
  const coverdata = coverData?.map((i) => ({
    image: i?.image,
    title: {
      id: i?.title_id,
      en: i?.title_en,
    },
    description: {
      id: i?.description_id,
      en: i?.description_en,
    },
    link: {
      text: i?.link_text,
      target: i?.link,
    },
  }));
  const dataLength = useMemo(() => coverdata?.length || 0, [coverdata]);

  useEffect(() => {
    const inter = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % dataLength);
    }, 5000);

    return () => {
      clearInterval(inter);
    };
  }, [dataLength]);

  return (
    <>
      {/* IMAGE DISPLAY AREA */}
      <div
        id="comet-hero-image"
        className="absolute left-0 top-0 right-0 bottom-0 size-full pointer-events-none"
      >
        <div className="relative size-full">
          {coverdata?.map(
            (item, index) =>
              item.image && (
                <MemoizedHeroImage
                  key={index}
                  src={item.image}
                  alt={item.title[_lang]!}
                  isActive={index === step}
                />
              )
          )}
        </div>
      </div>

      {/* OVERLAY */}
      <div className="pointer-events-none bg-gradient-to-r from-black/90 via-black/60 to-black/30 absolute left-0 top-0 size-full" />

      {/* CONTENT DISPLAY AREA */}
      <div className="inner-wrapper">
        <div className="w-full lg:w-2/3 max-w-[640px] relative grid">
          {coverdata?.map((item, index) => (
            <MemoizedHeroContent
              key={index}
              item={item}
              isActive={index === step}
              lang={_lang}
            />
          ))}
        </div>
      </div>
    </>
  );
}
