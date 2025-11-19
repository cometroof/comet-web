import { Metadata } from "next";
import ProjectPage__List from "../../list";
import supabaseClient from "@/supabase/client";

export const revalidate = 300;

export async function generateStaticParams() {
  const { data: categories } = await supabaseClient
    .from("project_categories")
    .select("slug")
    .is("deleted_at", null)
    .order("order");

  return (
    categories?.map((category) => ({
      slug: category.slug,
    })) ?? []
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: "en" | "id" }>;
}): Promise<Metadata> {
  const { lang = "en", slug } = await params;
  const { data } = await supabaseClient
    .from("project_categories")
    .select("name")
    .eq("slug", slug)
    .single();
  if (data) {
    let title = `Projects ${data.name} - PT. Comtech Metalindo Terpadu`;
    let description = `Explore our ${data.name} projects to see the quality of metal COMET. Suitable for all needs like home or commercial buildings.`;
    if (lang === "id") {
      title = `Proyek - ${data.name} - PT. Comtech Metalindo Terpadu`;
      description = `Jelajahi proyek ${data.name} kami untuk melihat kualitas genteng metal modern COMET. Cocok untuk aneka macam kebutuhan seperti rumah atau bangunan komersil.`;
    }
    return {
      title,
      description,
      openGraph: { title, description },
      twitter: { title, description },
    };
  }
  return {};
}

export default async function ProjectCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectPage__List category={slug} />;
}
