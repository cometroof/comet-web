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
      <div className="text-subheading break-words">{item.name}</div>
    </div>
  );
}

export default async function ProductDetailPage({ lang, data }: Props) {
  const copy = (await getPageDictionary(
    lang,
    "product-detail",
  )) as ProductDetailDictionary;
  let desc = data.description_en;
  if (lang === "id" && data.description_id) desc = data.description_id;
  const suitables = data.suitables as string[];
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
    category: ProductCategory;
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
                <div key={p.id} className="w-[240px] text-center">
                  {p.profile_image_url && (
                    <img
                      src={p.profile_image_url}
                      alt={p.name}
                      className="block"
                    />
                  )}
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

  const productListView = (
    <section className="outer-wrapper relative">
      <div className="inner-wrapper">
        <div>{data.product_item?.length} Item</div>
        {data.product_item && productRenderer({ products: data.product_item })}
      </div>
    </section>
  );

  return (
    <>
      <h1 className="hidden">Cometroof - {data.name}</h1>
      <section className="bg-app-white outer-wrapper">
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
      {/*PROFILE THUMBS*/}
      {profiles && profiles.length > 0
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
          : productListView}
      <FooterNew className="bg-app-white" />
    </>
  );
}
