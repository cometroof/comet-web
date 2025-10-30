import supabaseClient from "@/supabase/client";
import { ParamsLang } from "../types-general";
import { notFound } from "next/navigation";
import ProductDetailPage from "../product/[slug]/product-detail-page";

interface Props extends ParamsLang {
  slug: string;
}

async function getProductData(slug: string) {
  const res = await supabaseClient
    .from("product")
    .select(
      `*,product_category(*),product_profile(*,product_category(*),product_profile_badges(*,product_badges(id,name,image)),product_profile_certificates(*,certificates(*))),product_item(*)`,
    )
    .eq("slug", slug)
    .is("is_under_product", false)
    .single();
  const managed = res.data;
  if (managed?.product_profile) {
    managed.product_profile.forEach((profile) => {
      if (profile.product_profile_certificates) {
        profile.product_profile_certificates.sort((a, b) => {
          const orderA = a.certificates?.order ?? Number.MAX_SAFE_INTEGER;
          const orderB = b.certificates?.order ?? Number.MAX_SAFE_INTEGER;
          return orderA - orderB;
        });
      }
    });
  }
  return managed || null;
}

export async function generateStaticParams() {
  const res = (
    await supabaseClient
      .from("product")
      .select("slug")
      .is("is_under_product", false)
      .order("order", { ascending: true })
  ).data;
  return res?.map((i) => ({ slug: i.slug })) ?? [];
}

export const revalidate = 300;

export default async function ProductDetail({
  params,
}: {
  params: Promise<Props>;
}) {
  const { lang, slug } = await params;
  const data = await getProductData(slug);
  if (!data) return notFound();
  return <ProductDetailPage data={data} lang={lang} />;
}
