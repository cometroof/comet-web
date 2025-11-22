import { ParamsLang } from "../types-general";
import { getPageDictionary } from "../dictionaries";
import Homepage__SectionHead from "./_section-head";
import type { HomeDictionary } from "@/types/dictionary";
import supabaseClient from "@/supabase/client";
import ProductSectionCard from "@/components/app/product-section-card";

async function getProductData() {
  return (
    (
      await supabaseClient
        .from("product")
        .select()
        // .select("*,product_item!product_item_product_id_fkey(*)")
        .order("order", { ascending: true })
    ).data
  );
}

export default async function Homepage__Products({ lang }: ParamsLang) {
  const home = (await getPageDictionary(lang, "home")) as HomeDictionary;
  const _lang = lang || "en";
  const productData = await getProductData();
  const managed = [
    ...(productData
      ?.filter((p) => p.type === "product")
      .sort((a, b) => (a.order || 0) - (b.order || 0)) || []),
    ...(productData?.filter((p) => p.type === "add-on") || []),
    ...(productData?.filter((p) => p.type === "accessories") || []),
  ];
  return (
    <div className="bg-white min-h-screen text-black outer-wrapper">
      <div className="inner-wrapper py-20 lg:py-32">
        <Homepage__SectionHead
          title={home.product.title}
          description={home.product.description}
          closerText={`${home.product.head}:`}
          link="/product"
          linkText={home.product.cta}
        />

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 mt-16">
          {managed?.map((p) => (
            <ProductSectionCard
              key={p.id}
              product={{
                link: p.is_under_product ? `/product/${p.slug}` : `${p.slug}`,
                product_image: p.product_main_image ?? undefined,
                title: `${lang === "id" && p.title_id ? p.title_id : p.title}`,
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
      </div>
    </div>
  );
}
