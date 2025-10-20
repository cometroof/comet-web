import type { Metadata } from "next";
import supabaseClient from "@/supabase/client";

const getProject = async (slug: string) =>
  (
    await supabaseClient
      .from("projects")
      .select(
        "*,project_categories(name),project_images(image_url,is_highlight)",
      )
      .eq("slug", slug)
      .single()
  ).data;

export async function generateStaticParams() {
  const { data } = await supabaseClient
    .from("projects")
    .select("slug")
    .order("order");
  return data?.map((p) => p.slug) ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabaseClient
    .from("projects")
    .select("name")
    .eq("slug", slug)
    .single();
  if (data) {
    return {
      title: `${data.name} - COMET - PT. Comtech Metalindo Terpadu`,
    };
  }
  return {
    title: "COMET - PT. Comtech Metalindo Terpadu",
  };
}

export const revalidate = process.env.REVALIDATION!;

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await getProject(slug);

  return (
    <>
      <div className="outer-wrapper">
        <div className="inner-wrapper">
          {slug}
          <div>{project?.name}</div>
        </div>
      </div>
    </>
  );
}
