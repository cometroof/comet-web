import FooterNew from "@/components/app/footer";
import "./product.css";
import { BlueScopeCertifications } from "../home/certifications";
import { ParamsLang } from "../types-general";
import { getPageDictionary } from "../dictionaries";
import BrandButton from "@/components/app/brand-button";
import Link from "next/link";
import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: Promise<ParamsLang>;
}) {
  const { lang } = await params;
  const home = (await getPageDictionary(lang || "en", "home")) as any;
  return (
    <>
      <section className="top-header sticky min-h-screen  product-cover">
        <div className="outer-wrapper">
          <div className="inner-wrapper">
            <div className="pt-24 space-y-7">
              <h2 className="text-caption">OUR PRODUCTS</h2>
              <p className="span-inner-red text-heading2 max-w-[597px]">
                Explore the <span>key advantages</span> that showcases our
                commitment to delivering reliable, high-quality metal roofing.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative">
        <BlueScopeCertifications
          description={home.certifications.blueScopeDescription}
        />
      </section>
      <section className="bg-app-white outer-wrapper relative">
        <div className="inner-wrapper">
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-20 lg:justify-between">
            <div>
              <h2 className="text-heading1 span-inner-red lg:w-[418px]">
                Guaranteed Quality, <span>Backed by Warranty</span>
              </h2>
            </div>
            <div className="space-y-[55px]">
              <p className="mt-2 max-w-[467px]">
                Every panel comes with a 10-year corrosion warranty and a 5-year
                warranty on sand adhesive and colors, giving you confidence in
                long-lasting performance. To make it clear and easy, each
                product carries a sticker that details these warranty terms for
                quick reference.
              </p>
              <Link href="/guarantee-claim">
                <BrandButton>HOW TO CLAIM</BrandButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="relative outer-wrapper bg-app-light-gray min-h-[794px] overflow-x-clip  ">
        <div className="inner-wrapper">
          <div className="flex flex-col gap-10 lg:gap-20 lg:justify-between lg:flex-row lg:items-end">
            <div className="lg:w-1/2">
              <h2 className="text-heading2">How to read our stickers</h2>
            </div>
            <div className="absolute -right-20 bottom-0 w-1/2 aspect-[4/2.6]">
              <div className="relative size-full border border-red-500 flex items-end justify-end">
                <Image
                  className="size-full object-contain"
                  alt="sticker-product-information"
                  src="/assets/roof-sticker-info-cropped.webp"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-amber-100 min-h-screen relative"></section>
      <FooterNew className="bg-app-light-gray" />
    </>
  );
}
