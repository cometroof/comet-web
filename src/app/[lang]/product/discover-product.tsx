import BrandButton from "@/components/app/brand-button";
import { Download } from "lucide-react";
import { ParamsLang } from "../types-general";
import supabaseClient from "@/supabase/client";
import Link from "next/link";

async function getProductCatalogue() {
  return (
    await supabaseClient
      .from("company_profile")
      .select("*")
      .eq("type", "product_catalogue")
      .single()
  ).data;
}

export default async function ProductPage__DiscoverProduct({
  lang,
}: ParamsLang) {
  const productCatalogue = await getProductCatalogue();
  const desc =
    lang === "id"
      ? "Temukan <span>rangkaian lengkap</span> produk atap metal kami, masing-masing dirancang untuk menyeimbangkan daya tahan, fungsi, dan estetika untuk setiap jenis proyek."
      : "Discover our <span>full range of metal roofing products</span>, each designed to balance durability, function, and style for every type of project.";
  const btn = lang === "id" ? "KATALOG" : "CATALOGUE";
  return (
    <section className="outer-wrapper-x  bg-app-black text-background relative py-[112px]">
      <div className="inner-wrapper">
        <div
          className="text-heading1 span-inner-red max-w-[594px]"
          dangerouslySetInnerHTML={{ __html: desc }}
        ></div>
        <div className="mt-16">
          {productCatalogue?.file_url && (
            <Link href={productCatalogue?.file_url} target="_blank">
              <BrandButton>
                <Download className="size-4 mr-2" />
                <span>{btn}</span>
              </BrandButton>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
