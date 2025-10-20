import supabaseClient from "@/supabase/client";
import Image from "next/image";
import Link from "next/link";

const getData = async (categorySlug?: string) => {
  let query = supabaseClient
    .from("projects")
    .select(
      `
        *,
        project_categories!projects_category_id_fkey(name, slug),
        project_images(image_url, is_highlight, order)
      `,
    )
    .order("order", { ascending: true });

  // Filter by category slug if provided
  if (categorySlug) {
    // First get category_id from slug
    const { data: category } = await supabaseClient
      .from("project_categories")
      .select("id")
      .eq("slug", categorySlug)
      .single();

    if (category) {
      query = query.eq("category_id", category.id);
    }
  }

  return (await query).data;
};

export const revalidate = process.env.REVALIDATION!;

export default async function ProjectPage__List({
  category,
}: {
  category?: string;
}) {
  const data = await getData(category);

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-app-gray">
        No projects found in this category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      {data.map((d) => {
        const highlightImage =
          d.project_images?.find((im) => im.is_highlight) ||
          d.project_images?.[0];

        return (
          <Link href={`/project/${d.slug!}`} key={d.id} className="group">
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
          </Link>
        );
      })}
    </div>
  );
}
