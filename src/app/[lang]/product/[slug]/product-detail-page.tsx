import { ParamsLang } from "../../types-general";
import BrandButton from "@/components/app/brand-button";
import { Check, Download } from "lucide-react";
import FooterNew from "@/app/footer";
import { getPageDictionary } from "../../dictionaries";
import { ProductDetailDictionary, ProductDictionary } from "@/types/dictionary";
import SeparatorBanner from "@/components/app/separator-banner";
import ProductRecommendations from "./product-recommendation";
import ProductHighlighted from "./product-highlighted";
import { LangLink } from "@/components/app/lang-link";
import ProductPremium from "./product-premium";
import { cleanHTML } from "../../utils/utils";
import { ProductProfiler } from "./product-profiler";
import type {
  ProductDataWithItems,
  TProductItem,
  TProductProfile,
} from "./types";

interface Props extends ParamsLang {
  data: ProductDataWithItems;
  type?: string;
}

export type { TProductItem, TProductProfile };

function HighlightSection({
  data,
  lang,
}: {
  data: ProductDataWithItems;
  lang: ParamsLang["lang"];
}) {
  if (
    data &&
    (data.is_highlight_section === false || !data.highlight_section_image_url)
  )
    return null;
  const copy = {
    en: {
      topSide: data.highlight_top_label_en || data.highlight_top_label_id,
      bottomSide:
        data.highlight_bottom_label_en || data.highlight_bottom_label_id,
      descSection:
        data.highlight_section_description_en ||
        data.highlight_section_description_id,
      descTop:
        data.highlight_top_description_en || data.highlight_top_description_id,
      descBottom:
        data.highlight_bottom_description_en ||
        data.highlight_bottom_description_id,
    },
    id: {
      topSide: data.highlight_top_label_id || data.highlight_top_label_en,
      bottomSide:
        data.highlight_bottom_label_id || data.highlight_bottom_label_en,
      descSection:
        data.highlight_section_description_id ||
        data.highlight_section_description_en,
      descTop:
        data.highlight_top_description_id || data.highlight_top_description_en,
      descBottom:
        data.highlight_bottom_description_id ||
        data.highlight_bottom_description_en,
    },
  };
  const hasDescTop =
    data.highlight_top_description_en && data.highlight_top_description_id;
  const hasDescBottom =
    data.highlight_bottom_description_en &&
    data.highlight_bottom_description_id;
  const text = copy[lang];
  const desc =
    lang === "id" && data.highlight_section_description_id
      ? data.highlight_section_description_id
      : data.highlight_section_description_en;
  return (
    <>
      <section className="outer-wrapper !pt-0  bg-app-light-gray">
        <div className="inner-wrapper">
          <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-10 pb-20">
            <div className="lg:w-1/2">
              <div className="w-full max-w-[717px] relative">
                {data.highlight_section_image_url && (
                  <div className="relative w-full">
                    <img
                      className="w-full h-auto"
                      alt={`Image Highlight ${data.name}`}
                      src={data.highlight_section_image_url}
                    />
                    <div className="lg:hidden absolute top-6 right-20 py-1 px-2 bg-primary text-sm text-background rounded-full text-center flex items-center gap-2">
                      <div className="size-3 bg-background rounded-full" />
                      {text.topSide}
                    </div>
                    <div className="lg:hidden absolute bottom-14 right-20 py-1 px-2 bg-primary text-sm text-background rounded-full text-center flex items-center gap-2">
                      <div className="size-3 bg-background rounded-full" />
                      {text.bottomSide}
                    </div>
                  </div>
                )}
                {data.highlight_icon && (
                  <div className="hidden lg:block w-[124px] lg:w-[154px] relative mt-0 lg:mt-3 mx-auto lg:mx-0">
                    <img
                      alt={`Icon Highlight ${data.name}`}
                      src={data.highlight_icon}
                      className="w-full"
                    />
                  </div>
                )}
                {desc && (
                  <p className="hidden lg:block mt-5 max-w-[336px]">{desc}</p>
                )}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              {/*TOP SECTION*/}
              <div className="lg:mt-[120px] lg:ml-20 relative">
                <div className="hidden lg:block absolute top-3 -left-[30%]">
                  <svg
                    width="147"
                    height="6"
                    viewBox="0 0 147 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.667 0a2.667 2.667 0 1 0 0 5.333 2.667 2.667 0 0 0 0-5.333m144 2.667v-.5h-144v1h144z"
                      fill="#ED1C24"
                    />
                  </svg>
                </div>
                <div className="text-heading2">{text.topSide}</div>
                {hasDescTop && (
                  <div
                    className="text-body mt-3"
                    dangerouslySetInnerHTML={{
                      __html: cleanHTML(text.descTop),
                    }}
                  />
                )}
              </div>
              {/*BOTTOM SECTION*/}
              <div className="mt-[20px] lg:mt-[86px] lg:ml-20 relative">
                <div className="hidden lg:block w-[120px] absolute -top-[75%] -left-[50%]">
                  <svg
                    width="238"
                    height="138"
                    viewBox="0 0 238 138"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.667 0a2.667 2.667 0 1 0 0 5.333 2.667 2.667 0 0 0 0-5.333m0 136.667h-.5v.5h.5zm235 0v-.5h-235v1h235zm-235 0h.5v-134h-1v134z"
                      fill="#ED1C24"
                    />
                  </svg>
                </div>
                <div className="text-heading2">{text.bottomSide}</div>
                {hasDescBottom && (
                  <div
                    className="text-body mt-3"
                    dangerouslySetInnerHTML={{
                      __html: cleanHTML(text.descBottom),
                    }}
                  />
                )}
              </div>
              <div className="lg:hidden flex flex-col items-start gap-4 mt-8">
                {data.highlight_icon && (
                  <div className="w-[140px] lg:w-[154px] relative mt-0">
                    <img
                      alt={`Icon Highlight ${data.name}`}
                      src={data.highlight_icon}
                      className="w-full"
                    />
                  </div>
                )}
                {desc && <p className="max-w-[336px]">{desc}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
      {data.banner_url && <SeparatorBanner imgUrl={data.banner_url} />}
    </>
  );
}

export default async function ProductDetailPage({ lang, data, type }: Props) {
  const _lang = lang || "en";

  const copy = (await getPageDictionary(
    lang,
    "product-detail"
  )) as ProductDetailDictionary;

  const productDictionary = (await getPageDictionary(
    lang,
    "product"
  )) as ProductDictionary;
  let desc = data.description_en;
  if (lang === "id" && data.description_id) desc = data.description_id;

  const _suitables = (
    _lang === "id" && data.suitables_id ? data.suitables_id : data.suitables
  ) as string[];

  const _copy = {
    en: {
      backToAllProducts: "BACK TO ALL PRODUCTS",
      catalogue: "CATALOGUE",
    },
    id: {
      backToAllProducts: "LIHAT SEMUA PRODUK",
      catalogue: "KATALOG",
    },
  };

  const displayTitle =
    _lang === "id" && data.title_id ? data.title_id : data.title;

  return (
    <>
      <h1 className="hidden">Cometroof - {data.name}</h1>
      <section
        className={`${
          data.type === "accessories" ? "bg-app-light-gray" : "bg-app-white"
          // "bg-app-white"
        } outer-wrapper-x py-10 lg:py-[120px]`}
      >
        <div className="inner-wrapper">
          {/*TOP AREA*/}
          <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-20">
            <div className="lg:w-1/4 min-h-0 flex flex-col-reverse lg:flex-col gap-12 lg:gap-10 justify-between">
              <div className="w-[220px] h-auto relative">
                {data.brand_image && (
                  <img
                    alt={data.name}
                    src={data.brand_image}
                    className="size-full object-contain"
                  />
                )}
              </div>
              <LangLink
                href="/product"
                className="text-primary font-semibold font-exo-2 text-sm flex items-center gap-3 w-fit group"
              >
                <svg
                  width="11"
                  height="15"
                  viewBox="0 0 11 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-all group-hover:-translate-x-5"
                >
                  <path
                    d="M11 0L6.57605e-07 7.47788L11 15L11 0Z"
                    fill="#ED1C24"
                  />
                </svg>
                <div>{_copy[lang].backToAllProducts}</div>
              </LangLink>
            </div>
            <div className="lg:w-3/4">
              <h2 className="text-heading1">{displayTitle}</h2>
              <div className="mt-8 text-body max-w-[572px]">{desc}</div>
              <div className="mt-11">
                {data.catalogue && (
                  <LangLink
                    href={data.catalogue}
                    target="_blank"
                    aria-label={`Visit catalogue ${data.name} product`}
                  >
                    <BrandButton className="flex items-center">
                      <Download className="size-4 mr-1" />{" "}
                      {_copy[lang].catalogue}
                    </BrandButton>
                  </LangLink>
                )}
              </div>
            </div>
          </div>

          {/*SUITABLES*/}
          {_suitables && _suitables.length > 0 && (
            <div className="border-t border-t-app-gray pt-5 mt-16">
              <div className="text-caption">{copy.suitables_title}:</div>
              <div className="mt-8 overflow-x-auto hide-scrollbar">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-14">
                  {_suitables.map((s, n) => (
                    <div key={n} className="w-full">
                      <div className="text-primary text-subheading">
                        {String(n + 1).padStart(2, "0")}
                      </div>
                      <div className="max-w-[213px] mt-2 text-sm lg:text-base">
                        {s}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/*HIGHLIGHT SECTION*/}
      <HighlightSection data={data} lang={lang} />
      {/*PRODUCT VIEWS*/}
      <ProductProfiler
        data={data}
        lang={lang}
        type={type}
        dictionary={productDictionary}
      />
      <ProductPremium lang={lang} currentProduct={data} />
      <ProductHighlighted lang={lang} currentProduct={data} />
      <ProductRecommendations
        id={data.id}
        lang={lang}
        isUnderProduct={data.is_under_product}
        productType={data.type}
      />
      <FooterNew className="bg-app-white" />
    </>
  );
}
