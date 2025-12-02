"use client";

import { ProductDictionary } from "@/types/dictionary";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ParamsLang } from "../../types-general";
import SeparatorBanner from "@/components/app/separator-banner";
import ProductItem from "./product-item";
import { Check } from "lucide-react";
import type {
  ProductDataWithItems,
  ProductProfileRelations,
  ProductItem as ProductItemType,
  ProductCategoryPartial,
  TDimension,
  TProfileSpesifications,
} from "./types";

export function ProductProfiler({
  data,
  lang,
  type,
  dictionary,
}: {
  data: ProductDataWithItems;
  lang: ParamsLang["lang"];
  type?: string;
  dictionary: ProductDictionary;
}) {
  const _copy = dictionary;
  const profiles = data.product_profile as ProductProfileRelations[];

  const productRenderer = ({
    products,
    profile,
  }: {
    products: ProductItemType[];
    profile: ProductProfileRelations;
  }) => {
    return (
      <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7">
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
    products?: ProductItemType[];
  }) => {
    if ((products?.length || 0) < 1) return null;
    const subtitle =
      lang === "id" && category.subtitle_id
        ? category.subtitle_id
        : category.subtitle;
    return (
      <section
        key={`Category ${category.id} ${category.name}`}
        className="relative"
      >
        <div className="inner-wrapper border-t border-t-app-gray pt-5 pb-5 lg:pb-20 mt-10 lg:px-0">
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
          {/* {profiles && profiles.length >= 4 && ( */}
          <div className="text-subheading uppercase text-center mb-3 lg:mb-[50px]">
            {_copy.profileType}
          </div>
          {/* )} */}
          <div className="w-full overflow-x-auto hide-scrollbar">
            <div className="flex flex-row min-w-full w-fit justify-between lg:justify-center gap-8 lg:gap-20 pl-10 pr-10 lg:pl-0 lg:pr-0 pb-4 lg:pb-0 flex-wrap">
              {profiles
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((p) => (
                  <div
                    key={p.id}
                    // className="lg:max-w-[240px] text-center relative"
                    className="w-[calc(50%-1rem)] lg:w-[calc(25%-5rem)] text-center relative cursor-pointer"
                    role="button"
                    onClick={() => {
                      const el = document.getElementById(
                        `section-profile-${p.id}`
                      );
                      if (el) {
                        // const top = el.getBoundingClientRect().top + window.scrollY - 80;
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                        });
                      }
                    }}
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
                      {/* {profiles.length < 4 && (
                        <span className="text-caption text-primary">
                          PROFILE
                        </span>
                      )} */}
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
          const productInfo = (
            <>
              {/*INFORMATION NAME*/}
              <div className="pt-5 flex flex-wrap gap-3 items-center">
                <h2 className="text-heading1">{p.name}</h2>
                {/* {profiles && profiles.length < 4 && (
                    <span className="text-caption text-primary">
                      PROFILE
                    </span>
                  )} */}
              </div>

              {/*INFORMATION SIZE*/}
              {((sizes?.rows?.length || 0) > 0 ||
                (sizes?.headers?.length || 0) > 0) && (
                <div>
                  <ScrollArea className="w-full whitespace-normal  [&_[data-slot='scroll-area-thumb']]:bg-transparent">
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
                  <ScrollArea className="w-full whitespace-normal  [&_[data-slot='scroll-area-thumb']]:bg-transparent">
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
              )}
            </>
          );
          return (
            <section key={p.id} id={`section-profile-${p.id}`}>
              <div className="outer-wrapper bg-app-white relative !pt-0">
                <div className="inner-wrapper">
                  <div className="flex flex-col lg:flex-row items-start gap-10 justify-between">
                    <div className="w-full lg:w-2/3">
                      {/* PROFILE IMAGE */}
                      {p.profile_main_image_url && (
                        <div className="relative w-full lg:h-[379px] lg:-translate-y-0.5">
                          <img
                            className="size-full object-contain"
                            src={p.profile_main_image_url}
                            alt={`Profile ${p.name} image`}
                          />
                        </div>
                      )}
                      <div className="block lg:hidden w-full max-w-full overflow-hidden [&>div]:not-last:border-b [&>div]:border-b-app-gray [&>div]:py-3">
                        {productInfo}
                      </div>
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
                    <div className="hidden lg:block lg:flex-1 space-y-2.5 [&>div]:not-last:border-b [&>div]:border-b-app-gray [&>div]:pb-3 lg:sticky lg:top-header w-full max-w-full overflow-hidden">
                      {productInfo}
                    </div>
                  </div>
                </div>
              </div>
              {/* {p.profile_banner_url && (
                <SeparatorBanner imgUrl={p.profile_banner_url} />
              )} */}
              {p.profile_banner_url ? (
                <SeparatorBanner imgUrl={p.profile_banner_url} />
              ) : (
                <SeparatorBanner
                  imgUrl="https://placehold.co/900x400/ececec/ececec?text=."
                  height={280}
                />
              )}
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

  return profiles && profiles.length > 0 ? (
    profileListView
  ) : data.product_category && (data.product_category?.length || 0) > 0 ? (
    <div className="outer-wrapper">
      {data.product_category.map((c) =>
        categorizedView({
          category: c,
          products: data.product_item?.filter(
            (i) => i.product_category_id === c.id
          ),
        })
      )}
    </div>
  ) : (
    productListView
  );
}
