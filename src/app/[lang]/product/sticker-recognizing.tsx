import Image from "next/image";
import { ParamsLang } from "../types-general";
import { getPageDictionary } from "../dictionaries";
import { ProductDictionary } from "@/types/dictionary";
import StickerList from "./sticker-list";

export default async function ProductPage__StickerRecognizing({
  lang,
}: ParamsLang) {
  const product = (await getPageDictionary(
    lang,
    "product",
  )) as ProductDictionary;

  const stickers = [
    {
      title: product.sticker.sticker_bluescope_title,
      description: product.sticker.sticker_bluescope_description,
      left: 6,
      leftMobile: 3.5,
    },
    {
      title: product.sticker.sticker_brandlogo_title,
      description: product.sticker.sticker_brandlogo_description,
      left: 15,
      leftMobile: 15,
    },
    {
      title: product.sticker.sticker_qr_title,
      description: product.sticker.sticker_qr_description,
      left: 23.5,
      leftMobile: 30,
    },
    {
      title: product.sticker.sticker_corrosion_warranty_title,
      description: product.sticker.sticker_corrosion_warranty_description,
      left: 29.3,
      leftMobile: 39,
    },
    {
      title: product.sticker.sticker_colors_warranty_title,
      description: product.sticker.sticker_colors_warranty_description,
      left: 34,
      leftMobile: 46,
    },
    {
      title: product.sticker.sticker_thickness_title,
      description: product.sticker.sticker_thickness_description,
      left: 38.5,
      leftMobile: 52,
    },
  ];

  const thicknessCopies = {
    label: product.sticker.available_thickness,
    sizeS: product.sticker.thickness_s,
    sizeM: product.sticker.thickness_m,
    sizeL: product.sticker.thickness_l,
    sizeXl: product.sticker.thickness_xl,
    sizeXxl: product.sticker.thickness_xxl,
  };

  return (
    <div className="flex flex-col gap-10 lg:gap-20 lg:justify-between lg:flex-row lg:items-end pb-20 md:pb-0">
      <div className="lg:w-1/2">
        <h2 className="text-heading2">How to read our stickers</h2>
        <StickerList stickers={stickers} thicknessCopies={thicknessCopies} />
      </div>
      <div className="sticky right-0 -bottom-10 w-full  md:absolute md:-right-20 md:bottom-0 md:w-1/2 aspect-[4/2.6]">
        <div className="relative">
          <div className="relative size-full flex items-start justify-start">
            <Image
              className="size-full object-contain scale-150 mt-20 ml-20 md:scale-100 md:mt-0 md:ml-0"
              alt="sticker-product-information"
              src="/assets/roof-sticker-info-cropped.webp"
              // fill
              width={1000}
              height={1000}
              quality={100}
            />
          </div>
          {stickers.map((s, n) => {
            const left = ``;
            return (
              <div key={n} className={`sticker-marker-${n + 1} group`}>
                <div
                  className={`md:hidden absolute -top-[7%] ${left} flex flex-col items-center group-[.sticker-marker-active]:-top-[calc(7%+16px)] transition-all`}
                  style={{ left: `${s.leftMobile}%` }}
                >
                  <div className="size-7 rounded-full bg-primary text-background font-exo-2 flex items-center justify-center leading-[1em] text-sm">
                    {String(n + 1).padStart(2, "0")}
                  </div>
                  <div className="w-px h-5 bg-primary group-[.sticker-marker-active]:h-10 transition-all" />
                  <div className="size-1.5 rounded-full bg-primary"></div>
                </div>
                <div
                  className={`hidden md:flex absolute -top-[7%] ${left} flex-col items-center group-[.sticker-marker-active]:-top-[calc(7%+16px)] transition-all`}
                  style={{ left: `${s.left - 1}%` }}
                >
                  <div className="size-7 rounded-full bg-primary text-background font-exo-2 flex items-center justify-center leading-[1em] text-sm">
                    {String(n + 1).padStart(2, "0")}
                  </div>
                  <div className="w-px h-5 bg-primary group-[.sticker-marker-active]:h-10 transition-all" />
                  <div className="size-1.5 rounded-full bg-primary"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
