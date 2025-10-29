import supabaseClient from "@/supabase/client";
import { ParamsLang } from "../../types-general";
import { notFound } from "next/navigation";
import ProductDetailPage from "./product-detail-page";

interface Props extends ParamsLang {
  slug: string;
}

async function getProductData(slug: string) {
  return (
    await supabaseClient
      .from("product")
      .select("*,product_profile(*)")
      .eq("slug", slug)
      .is("is_under_product", true)
      .single()
  ).data;
}

export async function generateStaticParams() {
  const res = (
    await supabaseClient
      .from("product")
      .select("slug")
      .is("is_under_product", true)
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
