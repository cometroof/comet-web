import supabaseClient from "@/supabase/client";
import { ParamsLang } from "../../types-general";
import ProductSectionCard from "@/components/app/product-section-card";
import { getPageDictionary } from "../../dictionaries";
import { ProductDictionary } from "@/types/dictionary";

async function getProductRecommendations({ id }: { id: string }) {
  const res = await supabaseClient
    .from("product")
    .select("*")
    .neq("id", id)
    .limit(2);
  return res.data;
}

export default async function ProductRecommendations({
  id,
  lang,
}: {
  id: string;
  lang: ParamsLang["lang"];
}) {
  const copy = (await getPageDictionary(lang, "product")) as ProductDictionary;
  const data = await getProductRecommendations({ id });
  return (
    <section className="outer-wrapper-x py-[120px] bg-app-white relative">
      <div className="inner-wrapper">
        <h2 className="text-heading1">{copy.detail.otherBrandsTitle}</h2>
        <div className="mt-8 grid lg:grid-cols-2 gap-14">
          {data?.map((d) => (
            <ProductSectionCard
              key={d.id}
              product={{
                link: d.is_under_product ? `/product/${d.slug}` : `/${d.slug}`,
                order: d.order + 1,
                title: `${d.title}`,
                description: {
                  id: `${d.description_id || d.description_en}`,
                  en: `${d.description_en}`,
                },
                logo: d.brand_image || undefined,
                product_image: d.product_main_image || undefined,
              }}
              primary={false}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
