import supabaseClient from "@/supabase/client";
import { ParamsLang } from "../types-general";
import ProductSectionCard from "@/components/app/product-section-card";

async function getProductsData() {
  return (
    await supabaseClient
      .from("product")
      .select()
      .order("order", { ascending: true })
  ).data;
}

export default async function ProductPage__Products({ lang }: ParamsLang) {
  const data = await getProductsData();
  const managed = [
    ...(data
      ?.filter((p) => p.type === "product")
      .sort((a, b) => (a.order || 0) - (b.order || 0)) || []),
    ...(data?.filter((p) => p.type === "add-on") || []),
    ...(data?.filter((p) => p.type === "accessories") || []),
  ];
  return (
    <section className="outer-wrapper bg-app-white relative  !py-24">
      <div className="inner-wrapper  space-y-[55px]">
        <h2 className="hidden">Products</h2>
        {managed?.map((p) => (
          <ProductSectionCard
            lang={lang}
            product={{
              link: p.is_under_product ? `product/${p.slug}` : `${p.slug}`,
              product_image: p.product_main_image ?? undefined,
              title: p.name,
              description: {
                id: `${p.description_id || p.description_en}`,
                en: `${p.description_en}`,
              },
              order: p.order + 1,
              logo: p.brand_image || undefined,
            }}
            primary={true}
            key={p.id}
            linkText="LEARN MORE"
          />
        ))}
      </div>
    </section>
  );
}
