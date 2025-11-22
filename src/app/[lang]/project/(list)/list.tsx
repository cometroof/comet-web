import { LangLink } from "@/components/app/lang-link";
import PaginationBrand from "@/components/app/pagination-brand";
import supabaseClient from "@/supabase/client";
import Image from "next/image";

const ITEMS_PER_PAGE = 8;

const getData = async (categorySlug?: string, page: number = 1) => {
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  if (categorySlug) {
    // Langkah 1: Dapatkan category ID dari slug
    const { data: category, error: categoryError } = await supabaseClient
      .from("project_categories")
      .select("id")
      .eq("slug", categorySlug)
      .is("deleted_at", null)
      .single();

    if (categoryError || !category) return null;

    // Langkah 2: Query projects dengan filter category_id, range, dan count
    const {
      data: projects,
      error: projectsError,
      count,
    } = await supabaseClient
      .from("projects")
      .select(
        `
        *,
        project_images(*),
        project_category_relations!inner(category_id)
      `,
        { count: "exact" }
      )
      .eq("project_category_relations.category_id", category.id)
      .order("order", { ascending: true })
      .range(from, to);

    if (projectsError || !projects) return null;

    return { projects, total: count };
  }

  const { data: projects, count } = await supabaseClient
    .from("projects")
    .select("*, project_images(*)", { count: "exact" })
    .order("order", { ascending: true })
    .range(from, to);

  return { projects, total: count };
};

export default async function ProjectPage__List({
  category,
  searchParams,
}: {
  category?: string;
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const data = await getData(category || "", currentPage);

  const totalPages = Math.ceil((data?.total || 0) / ITEMS_PER_PAGE);

  if (!data || data.projects?.length === 0) {
    return (
      <div className="text-center py-12 text-app-gray">
        No projects found in this category.
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 gap-8">
        {data.projects
          ?.sort((a, b) => a.order - b.order)
          .map((d) => {
            const highlightImage =
              d.project_images?.find((im) => im.is_highlight) ||
              d.project_images?.[0];

            return (
              <LangLink
                href={`/project/${d.slug!}`}
                key={d.id}
                className="group"
              >
                <div className="aspect-[4/3] relative w-full overflow-hidden">
                  {highlightImage && (
                    <Image
                      width={400}
                      height={300}
                      className="size-full object-cover transition-all duration-300 group-hover:scale-125"
                      alt={d.name}
                      src={highlightImage.image_url}
                      unoptimized
                    />
                  )}
                </div>
                <div className="text-subheading mt-3 group-hover:text-primary">
                  {d.name}
                </div>
              </LangLink>
            );
          })}
      </div>
      <div className="inner-wrapper">
        <PaginationBrand currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
