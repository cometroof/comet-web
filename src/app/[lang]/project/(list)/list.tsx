import { LangLink } from "@/components/app/lang-link";
import supabaseClient from "@/supabase/client";
import Image from "next/image";

const getData = async (categorySlug?: string) => {
  if (categorySlug) {
    const { data, error } = await supabaseClient
      .from("project_categories")
      .select(
        `id,project_category_relations!inner(projects!inner(*,project_images(*)))`
      )
      .eq("slug", categorySlug)
      .is("deleted_at", null)
      .single();

    if (error || !data) return null;

    return data.project_category_relations.map((rel) => rel.projects);
  }

  const { data: projects } = await supabaseClient
    .from("projects")
    .select("*, project_images(*)")
    .order("order", { ascending: true });

  return projects;
};

export default async function ProjectPage__List({
  category,
}: {
  category?: string;
}) {
  const data = await getData(category || "");

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-app-gray">
        No projects found in this category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      {data
        .sort((a, b) => a.order - b.order)
        .map((d) => {
          const highlightImage =
            d.project_images?.find((im) => im.is_highlight) ||
            d.project_images?.[0];

          return (
            <LangLink href={`/project/${d.slug!}`} key={d.id} className="group">
              <div className="aspect-[4/3] relative w-full overflow-hidden">
                {highlightImage && (
                  <Image
                    width={400}
                    height={300}
                    className="size-full object-cover transition-all group-hover:scale-125"
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
  );
}
