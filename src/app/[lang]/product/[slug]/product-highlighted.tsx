import supabaseClient from "@/supabase/client";
import { ParamsLang } from "../../types-general";
import BrandButton from "@/components/app/brand-button";
import Link from "next/link";
import { Database } from "@/supabase/supabase";

async function getHighlightedProduct(currentId: string) {
  const res = await supabaseClient
    .from("product")
    .select()
    .eq("is_highlight", true)
    .neq("id", currentId)
    .single();
  return res.data;
}

export const revalidate = 300;

export default async function ProductHighlighted({
  lang,
  currentProduct,
}: {
  lang: ParamsLang["lang"];
  currentProduct?: Database["public"]["Tables"]["product"]["Row"];
}) {
  if (!currentProduct?.is_under_product) return null;
  const data = await getHighlightedProduct(currentProduct?.id || "");
  if (!data) return null;
  let description = data?.description_en || "";
  if (lang === "id" && data?.description_id) description = data?.description_id;
  let cta = "LEARN MORE";
  if (lang === "id") cta = "LEBIH LANJUT";
  let link = `/${data?.slug}`;
  if (data?.is_under_product) link = `/product/${data?.slug}`;
  return (
    <section className="outer-wrapper bg-app-light-gray">
      <div className="inner-wrapper  flex flex-col lg:flex-row items-start gap-10 lg:gap-20">
        <div className="lg:w-1/2 order-2 lg:order-1">
          <div className="w-fit h-[67px] max-w-[148px] relative">
            <h2 className="hidden">{data?.name}</h2>
            {data?.brand_image && (
              <img
                src={data?.brand_image}
                alt={`${data.title} logo`}
                className="h-full object-contain"
                loading="lazy"
              />
            )}
          </div>
          <p className="mt-[60px] text-body max-w-[572px]">{description}</p>
          <div className="mt-8">
            <Link href={link} aria-label={`Visit ${data?.name} product`}>
              <BrandButton>{cta}</BrandButton>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 order-1 lg:order-2">
          {data.product_main_image && (
            <div className="w-full xl:w-[90%] -translate-y-[40px] relative">
              <img
                src={data.product_main_image}
                alt={`Product ${data.name} image`}
                className="w-full h-auto block object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
