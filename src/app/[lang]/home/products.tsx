import { ParamsLang } from "../types-general";
import { getPageDictionary } from "../dictionaries";
import Homepage__SectionHead from "./_section-head";
import type { HomeDictionary } from "@/types/dictionary";
import supabaseClient from "@/supabase/client";
import ProductSectionCard from "@/components/app/product-section-card";

// const products: IProduct[] = [
//   {
//     logo: "https://placehold.co/109x67/E30613/E30613",
//     product_image: "/assets/zigzag-roof.webp",
//     title: "Minimalist Modern Metal Roof",
//     description: {
//       id: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
//       en: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
//     },
//     link: "/products/zigzag",
//     order: 1,
//   },
//   {
//     logo: "https://placehold.co/109x67/E30613/E30613",
//     product_image: "/assets/zigzag-roof.webp",
//     title: "Versatile Long Spandek",
//     description: {
//       id: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
//       en: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
//     },
//     link: "/products/zigzag",
//     order: 2,
//   },
//   {
//     logo: "https://placehold.co/109x67/E30613/E30613",
//     product_image: "/assets/zigzag-roof.webp",
//     title: "Stylish Dual Tone Roofing",
//     description: {
//       id: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
//       en: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
//     },
//     link: "/products/zigzag",
//     order: 3,
//   },
//   {
//     logo: "https://placehold.co/109x67/E30613/E30613",
//     product_image: "/assets/zigzag-roof.webp",
//     title: "Double Coating Protection",
//     description: {
//       id: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
//       en: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
//     },
//     link: "/products/zigzag",
//     order: 4,
//   },
//   {
//     logo: "https://placehold.co/109x67/E30613/E30613",
//     product_image: "/assets/zigzag-roof.webp",
//     title: "Premium Lightweight Steel",
//     description: {
//       id: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
//       en: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
//     },
//     link: "/products/zigzag",
//     order: 5,
//   },
//   {
//     product_image: "/assets/zigzag-roof.webp",
//     title: "High-Quality Roofing Accessories",
//     description: {
//       id: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
//       en: "Roofing line designed with a modern minimalist style and clean lines, ideal for buildings that emphasize a sleek and premium appearance.",
//     },
//     link: "/products/zigzag",
//     order: 6,
//   },
// ];

async function getProductData() {
  return (
    (
      await supabaseClient
        .from("product")
        .select(
          "id,order,is_under_product,slug,product_main_image,name,description_id,description_en,brand_image",
        )
        // .select("*,product_item!product_item_product_id_fkey(*)")
        .order("order", { ascending: true })
    ).data
  );
}

export const revalidate = 300;

export default async function Homepage__Products({ lang }: ParamsLang) {
  const home = (await getPageDictionary(lang, "home")) as HomeDictionary;
  const _lang = lang || "en";
  const productData = await getProductData();
  return (
    <div className="bg-white min-h-screen text-black outer-wrapper">
      <div className="inner-wrapper py-32">
        <Homepage__SectionHead
          title={home.product.title}
          description={home.product.description}
          closerText={`${home.product.head}:`}
          link="/product"
          linkText={home.product.cta}
        />

        <div className="grid grid-cols-2 gap-12 mt-16">
          {productData?.map((p) => (
            <ProductSectionCard
              key={p.id}
              product={{
                link: p.is_under_product ? `/product/${p.slug}` : `${p.slug}`,
                product_image: p.product_main_image ?? undefined,
                title: p.name,
                description: {
                  id: `${p.description_id || p.description_en}`,
                  en: `${p.description_en}`,
                },
                order: p.order + 1,
                logo: p.brand_image || undefined,
              }}
              primary={p.order + 1 === 1}
              lang={_lang}
            />
          ))}
        </div>

        {/*<div className="grid grid-cols-2 gap-12 mt-16">
          {products
            .sort((a, b) => a.order - b.order)
            .map((p) => (
              <ProductCard
                key={p.order}
                product={p}
                primary={p.order === 1}
                lang={_lang}
              />
            ))}
        </div>*/}
      </div>
    </div>
  );
}
