import { Database } from "@/supabase/supabase";
import { ParamsLang } from "../../types-general";
import supabaseClient from "@/supabase/client";
import { cleanHTML } from "../../utils/utils";

async function getProductPremium(id: string) {
  return (
    await supabaseClient
      .from("product_premium")
      .select()
      .eq("product_id", id)
      .single()
  ).data;
}

export default async function ProductPremium({
  lang,
  currentProduct,
}: {
  lang: ParamsLang["lang"];
  currentProduct?: Database["public"]["Tables"]["product"]["Row"];
}) {
  if (!currentProduct?.id) return <></>;
  const premiumData = await getProductPremium(currentProduct.id);

  const desc = cleanHTML(
    lang === "id" && premiumData?.description_id
      ? premiumData.description_id
      : premiumData?.description_en
  );

  return (
    <section className="bg-app-black text-app-white outer-wrapper mb-10 lg:mb-20">
      <div className="inner-wrapper flex flex-col lg:flex-row gap-20 lg:gap-40">
        <div className="lg:w-1/3">
          {premiumData?.premium_image_url && (
            <img
              className="block w-full h-auto max-h-[90px]"
              alt="Premium Image"
              src={premiumData?.premium_image_url}
            />
          )}
          {premiumData?.material_name && (
            <div className="mt-32">
              <div className="text-caption">
                {lang === "id" ? "SPESIFIKASI" : "SPECIFICATIONS"}:
              </div>
              <div className="mt-6 font-exo-2 font-medium text-3xl max-w-[224px]">
                {premiumData?.material_name}
              </div>
              <div className="text-caption mt-2">
                {lang === "id" ? "BAHAN" : "MATERIALS"}
              </div>
            </div>
          )}
        </div>
        <div className="lg:w-2/3">
          <div className="h-0 lg:h-16" />
          {desc && (
            <div
              className="[&>p]:mb-4 [&>img]:block [&>img]:max-w-[418px]"
              dangerouslySetInnerHTML={{ __html: cleanHTML(desc) }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
