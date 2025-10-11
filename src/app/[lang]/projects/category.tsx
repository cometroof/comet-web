import supabaseClient from "@/supabase/client";
import LinkCategory from "./link-category";

const getData = async () =>
  (
    await supabaseClient
      .from("project_categories")
      .select("name,slug")
      .order("order", { ascending: true })
  ).data;

export const revalidate = 60 * 5;

export default async function ProjectPage__Category() {
  const data = await getData();
  return (
    <div className="flex flex-row lg:flex-col flex-wrap gap-6">
      <LinkCategory name="All Projects" link="/" />
      {data?.map((c) => (
        <LinkCategory key={c.slug} name={c.name} link={`/${c.slug}`} />
      ))}
    </div>
  );
}
