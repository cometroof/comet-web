import ProjectPage__List from "../../list";
import supabaseClient from "@/supabase/client";

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

export default async function ProjectCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectPage__List category={slug} />;
}
