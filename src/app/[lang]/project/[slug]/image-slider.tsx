"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Database } from "@/supabase/supabase";
import { ParamsLang } from "../../types-general";

type TProject = Partial<Database["public"]["Tables"]["projects"]["Row"]>;
type TProjectRelations = TProject & {
  project_images?:
    | Partial<Database["public"]["Tables"]["project_images"]["Row"]>[]
    | null;
};

interface Props {
  lang: ParamsLang["lang"];
  project?: TProjectRelations | null;
}

export default function ProjectImageSlider({ project, lang }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const images = project?.project_images ?? [];

  // Sort images by order
  const sortedImages = [...images].sort(
    (a, b) => (a?.order || 0) - (b?.order || 0)
  );

  if (sortedImages.length === 0) {
    return (
      <div className="w-full">
        <div className="flex gap-10 items-start">
          <div className="lg:w-2/3">
            <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
              <p className="text-gray-400">No images available</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8  ">
        <div className="lg:col-span-4  ">
          {/* MAIN IMAGE */}
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            navigation={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Thumbs]}
            className="overflow-hidden w-full h-full"
          >
            {sortedImages.map((image) => (
              <SwiperSlide key={image.id}>
                <div className="relative w-full aspect-video h-full">
                  <img
                    src={image.image_url}
                    alt={`Project image ${image.order}`}
                    className="size-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="lg:col-span-1">
          {/* THUMBNAIL */}
          <Swiper
            className="relative max-h-[540px]"
            onSwiper={setThumbsSwiper}
            spaceBetween={28}
            slidesPerView={"auto"}
            direction="vertical"
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            navigation={{
              nextEl: ".project-thumb-next",
              prevEl: ".project-thumb-prev",
            }}
            breakpoints={{
              120: {
                slidesPerView: 2.2,
                direction: "horizontal",
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                direction: "vertical",
                spaceBetween: 28,
              },
            }}
          >
            {sortedImages.map((image, n) => (
              <SwiperSlide key={`thumb-${image.id || n + 1}`}>
                <div className="relative w-full aspect-[4/3] cursor-pointer transition-opacity after:size-full after:transition-all after:absolute after:left-0 after:top-0 after:border-0 after:border-transparent hover:after:border-4 hover:after:border-primary">
                  <img
                    src={image.image_url}
                    alt={`Thumbnail ${image.order}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
            <>
              <div
                role="button"
                className="[&.swiper-button-disabled_svg]:opacity-60 cursor-pointer absolute bg-primary p-2 size-10 lg:size-12 flex items-center lg:items-end justify-center rounded-full z-10 left-0 top-[50%] -translate-y-[50%] lg:left-[50%] lg:-top-5 lg:-translate-x-[50%] lg:translate-y-0 project-thumb-prev"
              >
                <svg
                  width={15}
                  height={11}
                  viewBox="0 0 15 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="-rotate-90 lg:rotate-0 lg:mb-1"
                >
                  <path
                    d="M15 11L7.52212 -3.28802e-07L0 11L15 11Z"
                    fill="white"
                  />
                </svg>
              </div>

              <div
                role="button"
                className="[&.swiper-button-disabled_svg]:opacity-60 cursor-pointer absolute bg-primary p-2 size-10 lg:size-12 flex items-center lg:items-start justify-center rounded-full z-10 right-0 top-[50%] -translate-y-[50%] lg:left-[50%] lg:top-auto lg:-bottom-4 lg:-translate-x-[50%] lg:translate-y-0 project-thumb-next"
              >
                <svg
                  width={15}
                  height={11}
                  viewBox="0 0 15 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-90 lg:rotate-180 lg:mt-1.5"
                >
                  <path
                    d="M15 11L7.52212 -3.28802e-07L0 11L15 11Z"
                    fill="white"
                  />
                </svg>
              </div>
            </>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
