import supabaseClient from "@/supabase/client";
import LinkCategory from "./link-category";
import { getPageDictionary } from "../../dictionaries";
import { ParamsLang } from "../../types-general";
import { ProjectDictionary } from "@/types/dictionary";

const getData = async () =>
  (
    await supabaseClient
      .from("project_categories")
      .select("name,slug,name_id")
      .is("deleted_at", null)
      .order("order", { ascending: true })
  ).data;

export default async function ProjectPage__Category({
  lang,
}: {
  lang: ParamsLang["lang"];
}) {
  const data = await getData();
  const { allProject } = (await getPageDictionary(
    lang,
    "project"
  )) as ProjectDictionary;
  return (
    <div className="flex flex-row lg:flex-col flex-wrap gap-6 items-start  sticky top-header pt-5">
      <LinkCategory name={allProject} link="/" />
      {data?.map((c) => (
        <LinkCategory
          key={c.slug}
          name={lang === "id" && c.name_id ? c.name_id : c.name}
          link={`/${c.slug}`}
        />
      ))}
    </div>
  );
}
