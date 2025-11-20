import { Database } from "@/supabase/supabase";
import { ParamsLang } from "../../types-general";
import BrandButton from "@/components/app/brand-button";
import { Check, Download } from "lucide-react";
import FooterNew from "@/app/footer";
import { getPageDictionary } from "../../dictionaries";
import { ProductDetailDictionary, ProductDictionary } from "@/types/dictionary";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SeparatorBanner from "@/components/app/separator-banner";
import ProductRecommendations from "./product-recommendation";
import ProductHighlighted from "./product-highlighted";
import { LangLink } from "@/components/app/lang-link";
import ProductPremium from "./product-premium";
import { cleanHTML } from "../../utils/utils";
import ProductItem from "./product-item";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Product = Database["public"]["Tables"]["product"]["Row"];
type Certificate = Database["public"]["Tables"]["certificates"]["Row"];
type ProductProfile = Database["public"]["Tables"]["product_profile"]["Row"];
type ProductCategory = Database["public"]["Tables"]["product_category"]["Row"];
type ProductItem = Database["public"]["Tables"]["product_item"]["Row"];
type ProductBadge = Database["public"]["Tables"]["product_badges"]["Row"];
type ProductCertificate =
  Database["public"]["Tables"]["product_certificates"]["Row"];
type ProfileBadge =
  Database["public"]["Tables"]["product_profile_badges"]["Row"];
type ProfileCertificate =
  Database["public"]["Tables"]["product_profile_certificates"]["Row"];

type ProfileCertificatesRelation = ProfileCertificate & {
  certificates?: Certificate;
};

type ProductBadgePartial = Pick<
  ProductBadge,
  "id" | "name" | "image" | "order"
>;

type ProfileBadgeRelation = ProfileBadge & {
  product_badges?: ProductBadgePartial;
};

type ProductCategoryPartial = Pick<
  ProductCategory,
  "id" | "name" | "subtitle" | "subtitle_id" | "order"
>;

type ProductProfileRelations = ProductProfile & {
  product_profile_badges?: ProfileBadgeRelation[];
  product_profile_certificates?: ProfileCertificatesRelation[];
  product_category?: ProductCategoryPartial[];
};

type ProductDataWithItems = Product & {
  product_category?: ProductCategoryPartial[];
  product_profile?: ProductProfileRelations[];
  product_item?: ProductItem[];
  product_badges?: ProductBadge[];
  product_certificates?: ProductCertificate[];
};

type TDimension = {
  rows: { label: { en: string; id: string }; values: string[] }[];
  headers: string[];
};

type TProfileSpesifications = {
  label: { en: string; id: string };
  value: string;
};

interface Props extends ParamsLang {
  data: ProductDataWithItems;
  type?: string;
}

export type TProductItem = ProductItem;
export type TProductProfile = ProductProfileRelations;

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
  return (
    <>
      <section className="outer-wrapper !pt-0  bg-app-light-gray">
        <div className="inner-wrapper">
          <div className="flex flex-col lg:flex-row items-start gap-10 pb-20">
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
                  <div className="w-[124px] lg:w-[154px] relative mt-0 lg:mt-3 mx-auto lg:mx-0">
                    <img
                      alt={`Icon Highlight ${data.name}`}
                      src={data.highlight_icon}
                      className="w-full"
                    />
                  </div>
                )}
                {(data.highlight_section_description_en ||
                  data.highlight_section_description_id) && (
                  <p className="hidden lg:block mt-5 max-w-[336px]">
                    {data.highlight_section_description_en}
                  </p>
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
            </div>
          </div>
        </div>
      </section>
      {data.banner_url && <SeparatorBanner imgUrl={data.banner_url} />}
    </>
  );
}

async function ProductProfiler({
  data,
  lang,
  type,
}: {
  data: ProductDataWithItems;
  lang: ParamsLang["lang"];
  type?: string;
}) {
  const _copy = (await getPageDictionary(lang, "product")) as ProductDictionary;
  const profiles = data.product_profile as ProductProfileRelations[];

  const productRenderer = ({
    products,
    profile,
  }: {
    products: ProductItem[];
    profile: ProductProfileRelations;
  }) => {
    return (
      <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-7">
        {products
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map((item) => (
            <ProductItem
              key={item.id}
              {...item}
              profile={profile}
              type={type}
            />
          ))}
      </div>
    );
  };

  const categorizedView = ({
    category,
    products,
  }: {
    category: ProductCategoryPartial;
    products?: ProductItem[];
  }) => {
    if ((products?.length || 0) < 1) return null;
    const subtitle =
      lang === "id" && category.subtitle_id
        ? category.subtitle_id
        : category.subtitle;
    return (
      <section
        key={`Category ${category.id} ${category.name}`}
        className="outer-wrapper-y relative"
      >
        <div className="inner-wrapper border-t border-t-app-gray pt-5">
          <div className="flex items-center gap-3">
            <h3 className="text-heading2">{category.name}</h3>
            {subtitle && (
              <>
                <div className="text-heading2">|</div>
                <div className="text-caption mt-1 uppercase !tracking-wide">
                  {subtitle}
                </div>
              </>
            )}
          </div>
          {products &&
            productRenderer({
              products,
              profile: profiles.find(
                (p) => p.id === products[0].product_profile_id
              )!,
            })}
        </div>
      </section>
    );
  };

  const profileListView = (
    <>
      <section className="outer-wrapper-y bg-app-light-gray py-[100px] relative">
        <div className="inner-wrapper">
          {profiles && profiles.length >= 4 && (
            <div className="text-subheading uppercase text-center mb-10 lg:mb-[50px]">
              {_copy.profileType}
            </div>
          )}
          <div className="w-full overflow-x-auto hide-scrollbar">
            <div className="flex flex-col lg:flex-row min-w-full w-fit justify-center gap-10 lg:gap-20 pl-10 pr-10 lg:pl-0 lg:pr-0 pb-4 lg:pb-0">
              {profiles
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((p) => (
                  <div
                    key={p.id}
                    className="lg:max-w-[240px] text-center relative"
                  >
                    <div className="h-[120px]  relative">
                      {p.profile_image_url && (
                        <img
                          src={p.profile_image_url}
                          alt={p.name}
                          className="block size-full object-contain"
                        />
                      )}
                    </div>
                    <h3 className="text-heading2 pt-0 lg:pt-5">
                      {p.name}&nbsp;
                      {profiles.length < 4 && (
                        <span className="text-caption text-primary">
                          PROFILE
                        </span>
                      )}
                    </h3>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      {profiles
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((p) => {
          const sizes = (p.size || {}) as TDimension;
          const specification = (p.specification ||
            []) as TProfileSpesifications[];
          return (
            <section key={p.id}>
              <div className="outer-wrapper bg-app-white relative !pt-0">
                <div className="inner-wrapper">
                  <div className="flex flex-col lg:flex-row items-start gap-10 justify-between">
                    <div className="lg:w-2/3">
                      {/* PROFILE IMAGE */}
                      {p.profile_main_image_url && (
                        <div className="relative lg:h-[379px]">
                          <img
                            className="size-full object-contain"
                            src={p.profile_main_image_url}
                            alt={`Profile ${p.name} image`}
                          />
                        </div>
                      )}
                      {/*PRODUCTS*/}
                      {p.product_category &&
                        p.product_category
                          .sort((a, b) => (a.order || 0) - (b.order || 0))
                          .map((c) =>
                            categorizedView({
                              category: c,
                              products: data.product_item?.filter(
                                (i) =>
                                  i.product_profile_id === p.id &&
                                  i.product_category_id === c.id
                              ),
                            })
                          )}
                    </div>
                    {/*INFORMATION*/}
                    <div className="lg:flex-1 space-y-2.5 [&>div]:not-last:border-b [&>div]:border-b-app-gray [&>div]:pb-3 lg:sticky lg:top-header w-full max-w-full overflow-hidden">
                      {/*INFORMATION NAME*/}
                      <div className="pt-5">
                        <div className="flex flex-wrap gap-3 items-center">
                          <h2 className="text-heading1">{p.name}</h2>
                          {profiles && profiles.length < 4 && (
                            <span className="text-caption text-primary">
                              PROFILE
                            </span>
                          )}
                        </div>
                      </div>

                      {/*INFORMATION SIZE*/}
                      {((sizes?.rows?.length || 0) > 0 ||
                        (sizes?.headers?.length || 0) > 0) && (
                        <div>
                          <ScrollArea className="w-full whitespace-normal">
                            <Table className="min-w-full">
                              <TableHeader>
                                <TableRow>
                                  <TableCell className="p-1 pr-2 font-exo-2 text-sm font-bold">
                                    {_copy.availableSize}
                                  </TableCell>
                                  {sizes?.headers?.map((s) => (
                                    <TableCell
                                      key={`${p.id}-${s}`}
                                      className="p-1 font-exo-2 text-sm font-bold"
                                    >
                                      {s}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {sizes.rows?.map((r, n) => (
                                  <TableRow key={n}>
                                    <TableCell className="p-1 pr-2 font-exo-2 text-sm font-bold">
                                      {r.label[lang]}
                                    </TableCell>
                                    {r.values.map((v, n) => (
                                      <TableCell
                                        key={n}
                                        className="p-1 whitespace-normal text-sm"
                                      >
                                        {v}
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                        </div>
                      )}

                      {/*INFORMATION DIMENSION*/}
                      {(specification?.length || 0) > 0 && (
                        <div>
                          <ScrollArea className="w-full whitespace-normal">
                            <Table className="min-w-full">
                              <TableBody>
                                {specification.map(
                                  (s, n) =>
                                    (s.label[lang] || s.value) && (
                                      <TableRow key={n}>
                                        {s.label[lang] && (
                                          <TableCell className="p-1 font-exo-2 text-sm font-bold">
                                            {s.label[lang]}
                                          </TableCell>
                                        )}
                                        <TableCell className="p-1 text-sm break-words whitespace-normal">
                                          {s.value}
                                        </TableCell>
                                      </TableRow>
                                    )
                                )}
                              </TableBody>
                            </Table>
                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                        </div>
                      )}

                      {/*INFORMATION CERTIFICATES*/}
                      {(p.product_profile_certificates?.length || 0) > 0 && (
                        <div>
                          <div className="font-exo-2 text-sm font-bold">
                            {_copy.certifications}
                          </div>
                          <div className="mt-3  grid grid-cols-2">
                            {p?.product_profile_certificates?.map((c) => {
                              let certName =
                                c.certificates?.label_name ||
                                c.certificates?.name;
                              if (
                                lang === "id" &&
                                (c.certificates?.label_name_id ||
                                  c.certificates?.name_id)
                              )
                                certName =
                                  c.certificates?.label_name_id ||
                                  c.certificates?.name_id ||
                                  c.certificates.label_name ||
                                  c.certificates.name;
                              return (
                                <div
                                  key={c.id}
                                  className="text-caption flex items-start gap-2"
                                  title={c.certificates?.name}
                                >
                                  <div className="size-3 flex items-center justify-center rounded-full bg-primary text-background mt-1">
                                    <Check className="size-2" />
                                  </div>
                                  <div className="flex-1 break-words line-clamp-1">
                                    {certName}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          {(p.product_profile_badges?.length || 0) > 0 && (
                            <div className="mt-6 flex gap-5 ">
                              {p.product_profile_badges
                                ?.sort(
                                  (b, a) =>
                                    (b.product_badges?.order || 0) -
                                    (a.product_badges?.order || 0)
                                )
                                .map((b) => (
                                  <div
                                    className="size-[66px] relative"
                                    key={b.id}
                                  >
                                    <img
                                      alt={b.product_badges?.name}
                                      src={b.product_badges?.image}
                                      className="size-full object-contain"
                                    />
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {p.profile_banner_url && (
                <SeparatorBanner imgUrl={p.profile_banner_url} />
              )}
              {/* {p.profile_banner_url ? (
                <SeparatorBanner imgUrl={p.profile_banner_url} />
              ) : (
                <SeparatorBanner imgUrl="https://placehold.co/900x400/ececec/ececec?text=." />
              )} */}
            </section>
          );
        })}
    </>
  );

  const productListView = data.product_item && data.product_item.length > 0 && (
    <section className="outer-wrapper relative">
      <div className="inner-wrapper">
        {data.product_item &&
          productRenderer({
            products: data.product_item,
            profile: profiles.find(
              (p) => p.id === data?.product_item?.[0].product_profile_id
            )!,
          })}
      </div>
    </section>
  );

  return profiles && profiles.length > 0
    ? profileListView
    : data.product_category && (data.product_category?.length || 0) > 0
    ? data.product_category.map((c) =>
        categorizedView({
          category: c,
          products: data.product_item?.filter(
            (i) => i.product_category_id === c.id
          ),
        })
      )
    : productListView;
}

export default async function ProductDetailPage({ lang, data, type }: Props) {
  const _lang = lang || "en";

  const copy = (await getPageDictionary(
    lang,
    "product-detail"
  )) as ProductDetailDictionary;
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

  return (
    <>
      <h1 className="hidden">Cometroof - {data.name}</h1>
      <section
        className={`${
          // data.is_under_product ? "bg-app-white" : "bg-app-light-gray"
          "bg-app-white"
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
              <h2 className="text-heading1">{data.title}</h2>
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
                    <div key={n} className="">
                      <div className="text-primary text-subheading">
                        {String(n + 1).padStart(2, "0")}
                      </div>
                      <div className="w-[213px] mt-2">{s}</div>
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
      <ProductProfiler data={data} lang={lang} type={type} />
      <ProductPremium lang={lang} currentProduct={data} />
      <ProductHighlighted lang={lang} currentProduct={data} />
      <ProductRecommendations
        id={data.id}
        lang={lang}
        isUnderProduct={data.is_under_product}
      />
      <FooterNew className="bg-app-white" />
    </>
  );
}
