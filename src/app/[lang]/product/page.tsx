import FooterNew from "@/app/footer";
import "./product.css";
import { BlueScopeCertifications } from "../home/certifications";
import { ParamsLang } from "../types-general";
import { getPageDictionary } from "../dictionaries";
import BrandButton from "@/components/app/brand-button";
import Link from "next/link";
import { HomeDictionary, ProductDictionary } from "@/types/dictionary";
import ProductPage__StickerRecognizing from "./sticker-recognizing";
import ProductPage__Certificates from "./certificates";
import ProductPage__DiscoverProduct from "./discover-product";
import ProductPage__Products from "./product";
import ProductPage__MetalRoofTable from "./metal-roof-table";

const BlueCert = async ({ lang }: ParamsLang) => {
  const home = (await getPageDictionary(lang, "home")) as HomeDictionary;
  return (
    <BlueScopeCertifications
      description={home.certifications.blueScopeDescription}
    />
  );
};

export default async function ProductPage({
  params,
}: {
  params: Promise<ParamsLang>;
}) {
  const { lang } = await params;
  const _lang = lang || "en";
  const product = (await getPageDictionary(
    _lang,
    "product",
  )) as ProductDictionary;
  return (
    <>
      <section className="top-header sticky min-h-[83vh]  product-cover">
        <div className="outer-wrapper">
          <div className="inner-wrapper">
            <div className="pt-16 space-y-7">
              <h2 className="text-caption">{product.cover.title}</h2>
              <p
                className="span-inner-red text-heading1 max-w-[597px]"
                dangerouslySetInnerHTML={{ __html: product.cover.head }}
              ></p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative">
        <BlueCert lang={_lang} />
      </section>
      <section className="bg-app-white outer-wrapper-x py-12 lg:py-20 relative">
        <div className="inner-wrapper">
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-20 lg:justify-between">
            <div>
              <h2
                className="text-heading1 span-inner-red lg:w-[418px]"
                dangerouslySetInnerHTML={{ __html: product.guarantee.title }}
              ></h2>
            </div>
            <div className="space-y-[55px]">
              <p className="mt-2 max-w-[467px]">
                {product.guarantee.description}
              </p>
              <Link href="/guarantee-claim">
                <BrandButton>{product.guarantee.claim_cta}</BrandButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="relative outer-wrapper bg-app-light-gray min-h-[794px] overflow-x-clip  product-sticker-section ">
        <div className="inner-wrapper">
          <ProductPage__StickerRecognizing lang={_lang} />
        </div>
      </section>
      <ProductPage__Certificates lang={_lang} />
      <ProductPage__DiscoverProduct lang={_lang} />
      <ProductPage__Products lang={lang} />
      <ProductPage__MetalRoofTable lang={_lang} />
      <FooterNew className="bg-app-light-gray" />
    </>
  );
}
