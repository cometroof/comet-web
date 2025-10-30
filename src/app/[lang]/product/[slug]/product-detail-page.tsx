import { Database } from "@/supabase/supabase";
import { ParamsLang } from "../../types-general";
import Link from "next/link";
import BrandButton from "@/components/app/brand-button";
import { Check, Download } from "lucide-react";
import FooterNew from "@/components/app/footer";
import { getPageDictionary } from "../../dictionaries";
import { ProductDetailDictionary } from "@/types/dictionary";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SeparatorBanner from "@/components/app/separator-banner";
import ProductRecommendations from "./product-recommendation";

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

type ProductBadgePartial = Pick<ProductBadge, "id" | "name" | "image">;

type ProfileBadgeRelation = ProfileBadge & {
  product_badges?: ProductBadgePartial;
};

type ProductCategoryPartial = Pick<ProductCategory, "id" | "name" | "subtitle">;

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

interface Props extends ParamsLang {
  data: ProductDataWithItems;
}

function ProductItem(item: ProductItem) {
  const specs = item.spec_info as { [key: string]: string };
  return (
    <div className="relative" aria-label={`Product ${item.name}`}>
      <div className="aspect-square relative bg-app-light-gray">
        {item.image && (
          <img
            alt={item.name}
            src={item.image}
            className="block size-full object-cover"
          />
        )}
      </div>
      <div className="text-subheading break-words mt-3">{item.name}</div>
      <div className="mt-3 space-y-1">
        {specs &&
          Object.entries(specs).map(([key, value], n) => (
            <div
              key={n}
              className="flex justify-strat items-center text-sm font-exo-2 gap-2"
            >
              <span className="font-bold">{key}:</span>
              <span className="">{value}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

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
                      __html: text.descTop ?? "",
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
                      __html: text.descBottom ?? "",
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

function ProductProfiler({
  data,
  lang,
}: {
  data: ProductDataWithItems;
  lang: ParamsLang["lang"];
}) {
  const profiles = data.product_profile as ProductProfileRelations[];

  const productRenderer = ({ products }: { products: ProductItem[] }) => {
    return (
      <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-7">
        {products.map((item) => (
          <ProductItem key={item.id} {...item} />
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
    return (
      <section
        key={`Category ${category.id} ${category.name}`}
        className="outer-wrapper relative"
      >
        <div className="inner-wrapper border-t border-t-app-gray pt-5">
          <div className="flex items-center gap-3">
            <h3 className="text-heading2">{category.name}</h3>
            {category.subtitle && (
              <>
                <div className="text-heading2">|</div>
                <div className="text-caption">{category.subtitle}</div>
              </>
            )}
          </div>
          {products &&
            productRenderer({
              products,
            })}
        </div>
      </section>
    );
  };

  const profileListView = (
    <>
      <section className="outer-wrapper bg-app-light-gray py-[100px] relative">
        <div className="inner-wrapper">
          <div className="w-full overflow-x-auto hide-scrollbar">
            <div className="flex min-w-full w-fit justify-center gap-10 lg:gap-20">
              {profiles.map((p) => (
                <div key={p.id} className="max-w-[240px] text-center">
                  <div className="h-[120px]  relative">
                    {p.profile_image_url && (
                      <img
                        src={p.profile_image_url}
                        alt={p.name}
                        className="block h-full"
                      />
                    )}
                  </div>
                  <h3 className="text-heading2 pt-5">{p.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {profiles.map((p) => {
        const sizes = p.size as {
          name: string;
          weight: string;
          thickness: string;
        }[];
        return (
          <section key={p.id} className="outer-wrapper bg-app-white relative">
            <div className="inner-wrapper">
              <div className="flex items-start gap-10 justify-between">
                {/*PRODUCTS*/}
                <div className="w-2/3">
                  {p.product_category &&
                    p.product_category.map((c) =>
                      categorizedView({
                        category: c,
                        products: data.product_item?.filter(
                          (i) =>
                            i.product_profile_id === p.id &&
                            i.product_category_id === c.id,
                        ),
                      }),
                    )}
                </div>
                {/*INFORMATION*/}
                <div className="flex-1 space-y-2.5 [&>div]:not-last:border-b [&>div]:border-b-app-gray [&>div]:pb-5">
                  {/*INFORMATION NAME*/}
                  <div>
                    <h2 className="text-heading1">{p.name}</h2>
                  </div>
                  {/*INFORMATION SIZE*/}
                  {sizes.length > 0 && (
                    <div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableCell className="font-exo-2 text-sm font-bold">
                              Available Size
                            </TableCell>
                            {sizes.map((s) => (
                              <TableCell
                                key={`${p.id}-${s.name}`}
                                className="font-exo-2 text-sm font-bold"
                              >
                                {s.name}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-exo-2 text-sm font-bold">
                              Thickness (mm)
                            </TableCell>
                            {sizes.map((s) => (
                              <TableCell key={`${p.id}-${s.name}`}>
                                {s.thickness}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-exo-2 text-sm font-bold">
                              Weight (g)
                            </TableCell>
                            {sizes.map((s) => (
                              <TableCell key={`${p.id}-${s.name}`}>
                                {s.weight}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  {/*INFORMATION DIMENSION*/}
                  <div>
                    <Table>
                      <TableBody>
                        {p.size_per_panel && (
                          <TableRow className="border-b-transparent">
                            <TableCell className="p-1 font-exo-2 text-sm font-bold w-[140px]">
                              Size per panel
                            </TableCell>
                            <TableCell className="p-1">
                              {p.size_per_panel}
                            </TableCell>
                          </TableRow>
                        )}
                        {p.effective_size && (
                          <TableRow className="border-b-transparent">
                            <TableCell className="p-1 font-exo-2 text-sm font-bold w-[140px]">
                              Effective size
                            </TableCell>
                            <TableCell className="p-1">
                              {p.effective_size}
                            </TableCell>
                          </TableRow>
                        )}
                        {p.panel_amount && (
                          <TableRow className="border-b-transparent">
                            <TableCell className="p-1 font-exo-2 text-sm font-bold w-[140px]">
                              Panel Ammount/m
                              <span className="align-super">2</span>
                            </TableCell>
                            <TableCell className="p-1">
                              {p.panel_amount}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  {/*INFORMATION CERTIFICATES*/}
                  <div>
                    <div className="font-exo-2 text-sm font-bold">
                      Certifications
                    </div>
                    <div className="mt-3  grid grid-cols-2">
                      {p?.product_profile_certificates?.map((c) => {
                        let certName =
                          c.certificates?.label_name || c.certificates?.name;
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
                          >
                            <div className="size-3 flex items-center justify-center rounded-full bg-primary text-background mt-1">
                              <Check className="size-2" />
                            </div>
                            <div className="flex-1 break-words">{certName}</div>
                          </div>
                        );
                      })}
                    </div>
                    {(p.product_profile_badges?.length || 0) > 0 && (
                      <div className="mt-6 flex gap-5 ">
                        {p.product_profile_badges?.map((b) => (
                          <div className="size-[66px] relative" key={b.id}>
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
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );

  const productListView = data.product_item && data.product_item.length > 0 && (
    <section className="outer-wrapper relative">
      <div className="inner-wrapper">
        {data.product_item && productRenderer({ products: data.product_item })}
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
              (i) => i.product_category_id === c.id,
            ),
          }),
        )
      : productListView;
}

export default async function ProductDetailPage({ lang, data }: Props) {
  const copy = (await getPageDictionary(
    lang,
    "product-detail",
  )) as ProductDetailDictionary;
  let desc = data.description_en;
  if (lang === "id" && data.description_id) desc = data.description_id;
  const suitables = data.suitables as string[];

  return (
    <>
      <h1 className="hidden">Cometroof - {data.name}</h1>
      <section
        className={`${data.is_under_product ? "bg-app-white" : "bg-app-light-gray"} outer-wrapper-x py-[120px]`}
      >
        <div className="inner-wrapper">
          {/*TOP AREA*/}
          <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-20">
            <div className="w-1/4 min-h-0 flex flex-col justify-between">
              <div className="w-[220px] h-auto relative">
                {data.brand_image && (
                  <img
                    alt={data.name}
                    src={data.brand_image}
                    className="size-full object-contain"
                  />
                )}
              </div>
              <Link
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
                <div>BACK TO ALL PRODUCTS</div>
              </Link>
            </div>
            <div className="w-3/4">
              <h2 className="text-heading1">{data.title}</h2>
              <div className="mt-8 text-body max-w-[572px]">{desc}</div>
              <div className="mt-11">
                {data.catalogue && (
                  <Link
                    href={data.catalogue}
                    target="_blank"
                    aria-label={`Visit catalogue ${data.name} product`}
                  >
                    <BrandButton className="flex items-center">
                      <Download className="size-4 mr-1" /> CATALOGUE
                    </BrandButton>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/*SUITABLES*/}
          {suitables && suitables.length > 0 && (
            <div className="border-t border-t-app-gray pt-5 pb-16 mt-16">
              <div className="text-caption">{copy.suitables_title}:</div>
              <div className="mt-8 overflow-x-auto hide-scrollbar">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-14">
                  {suitables.map((s, n) => (
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
      <ProductProfiler data={data} lang={lang} />
      <ProductRecommendations id={data.id} lang={lang} />
      <FooterNew className="bg-app-white" />
    </>
  );
}
