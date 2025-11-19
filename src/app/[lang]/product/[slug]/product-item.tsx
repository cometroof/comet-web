"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TProductItem, TProductProfile } from "./product-detail-page";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Icon__LongArrow from "@/components/assets/long-arrow";
import "swiper/css";
import "swiper/css/navigation";

interface Props extends TProductItem {
  profile: TProductProfile;
}

export default function ProductItem({ profile, ...item }: Props) {
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
          <div className="aspect-square relative bg-app-light-gray overflow-hidden group">
            {images.length > 0 && (
              <img
                alt={item.name}
                src={images[0]}
                className="block size-full object-cover object-center scale-200 transition-all group-hover:scale-[230%]"
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
      <AlertDialogContent>
        <AlertDialogHeader className="relative">
          <AlertDialogTitle asChild>
            <div>
              {profile && profile.name && (
                <div className="text-caption text-primary">{profile.name}</div>
              )}
              <div className="text-heading2 text-app-gray">{item.name}</div>
            </div>
          </AlertDialogTitle>
          <div className="absolute top-[50%] -translate-y-[50%] right-0">
            <AlertDialogCancel asChild>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer size-8 border-transparent"
              >
                <X className="size-8" />
              </Button>
            </AlertDialogCancel>
          </div>
        </AlertDialogHeader>
        <div className="block w-full min-w-0 px-10">
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
              <SwiperSlide key={index} className="!h-[320px]">
                <div className="size-full">
                  <img
                    src={image}
                    alt={`${item.name} - Image ${index + 1}`}
                    className="size-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="prev-slide-product-image absolute top-1/2 -translate-y-1/2 left-3 z-10 text-primary transition-all  overflow-hidden aspect-square group cursor-pointer [&.swiper-button-disabled]:opacity-50 [&.swiper-button-disabled]:pointer-events-none"
                aria-label="Previous image"
              >
                <Icon__LongArrow className="rotate-y-180  transition-all translate-x-2 group-hover:translate-x-0" />
              </button>
              <button
                type="button"
                className="next-slide-product-image absolute top-1/2 -translate-y-1/2 right-3 z-10 text-primary transition-all  overflow-hidden aspect-square group cursor-pointer [&.swiper-button-disabled]:opacity-50 [&.swiper-button-disabled]:pointer-events-none"
                aria-label="Next image"
              >
                <Icon__LongArrow className="  transition-all -translate-x-2 group-hover:translate-x-0" />
              </button>
            </>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
