"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TProductItem } from "./product-detail-page";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Icon__LongArrow from "@/components/assets/long-arrow";
import "swiper/css";

export default function ProductItem(item: TProductItem) {
  const specs = item.spec_info as {
    label: { en: string; id: string };
    value: string;
  }[];
  const { lang = "en" } = useParams<{ lang: "en" | "id" }>();
  const images = item.image ? item.image.split(",,,") : [];

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div
          className="relative"
          aria-label={`Product ${item.name}`}
          role="button"
        >
          <div className="aspect-square relative bg-app-light-gray overflow-hidden">
            {images.length > 0 && (
              <img
                alt={item.name}
                src={images[0]}
                className="block size-full object-cover object-center scale-125"
              />
            )}
          </div>
          <div className="text-subheading break-words mt-3 text-left">
            {item.name}
          </div>
          <div className="mt-3 space-y-1">
            {specs &&
              specs.map((item, n) => (
                <div
                  key={n}
                  className="flex justify-strat items-center text-sm font-exo-2 gap-2"
                >
                  <span className="font-bold">{item.label[lang]}:</span>
                  <span className="">{item.value}</span>
                </div>
              ))}
          </div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-5xl w-[90vw] max-h-[90vh] p-6">
        <div className="flex flex-col h-full ">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <AlertDialogTitle className="text-lg font-semibold">
              {item.name}
            </AlertDialogTitle>
            <AlertDialogCancel asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </AlertDialogCancel>
          </div>

          <div className="relative border border-red-500 h-[60vh] bg-gray-100 rounded-lg overflow-hidden min-w-[400px] max-w-[480px]">
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              loop={false}
              navigation={{
                nextEl: ".next-slide-product-image",
                prevEl: ".prev-slide-product-image",
              }}
            >
              {images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center p-4"
                >
                  <img
                    src={image}
                    alt={`${item.name} - Image ${index + 1}`}
                    className="max-h-full max-w-full w-auto h-auto object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {images.length > 1 && (
              <>
                <button
                  className="prev-slide-product-image absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-white/80 hover:bg-white text-primary rounded-full p-2 shadow-lg transition-all"
                  aria-label="Previous image"
                >
                  <Icon__LongArrow className="rotate-y-180 w-6 h-6" />
                </button>
                <button
                  className="next-slide-product-image absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-white/80 hover:bg-white text-primary rounded-full p-2 shadow-lg transition-all"
                  aria-label="Next image"
                >
                  <Icon__LongArrow className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
