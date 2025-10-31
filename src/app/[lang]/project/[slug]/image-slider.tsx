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
    (a, b) => (a?.order || 0) - (b?.order || 0),
  );

  if (sortedImages.length === 0) {
    return (
      <div className="w-full">
        <div className="flex gap-10 items-start">
          <div className="lg:w-2/3">
            <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">No images available</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-4">
          {/* MAIN IMAGE */}
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            navigation={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="rounded-lg overflow-hidden shadow-lg w-full"
          >
            {sortedImages.map((image) => (
              <SwiperSlide key={image.id}>
                <div className="relative w-full aspect-video bg-gray-100">
                  <img
                    src={image.image_url}
                    alt={`Project image ${image.order}`}
                    className="w-full h-full object-cover"
                  />
                  {image.is_highlight && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Highlight
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="lg:col-span-1">
          {/* THUMBNAIL */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={28}
            slidesPerView={"auto"}
            direction="vertical"
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            breakpoints={{
              120: {
                slidesPerView: 2.5,
                direction: "horizontal",
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: "auto",
                direction: "vertical",
                spaceBetween: 28,
              },
            }}
          >
            {sortedImages.map((image, n) => (
              <SwiperSlide key={`thumb-${image.id || n + 1}`}>
                <div className="relative w-full aspect-[4/3] cursor-pointer hover:opacity-80 transition-opacity">
                  <img
                    src={image.image_url}
                    alt={`Thumbnail ${image.order}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
