import supabaseClient from "@/supabase/client";
import { ParamsLang } from "../../types-general";
import ArticleDetailContent from "./content";

interface Props {
  slug?: string;
  lang: ParamsLang["lang"];
}

async function getData(slug: string) {
  return (
    await supabaseClient.from("articles").select().eq("slug", slug).single()
  ).data;
}

export const revalidate = 300;

export default async function ArticleDetail({
  params,
}: {
  params: Promise<Props>;
}) {
  const { slug, lang } = await params;
  const _lang = lang || "en";
  const data = await getData(slug!);
  return (
    <>
      <div className="grid grid-cols-3">
        <section className="col-span-2 p-14 flex justify-end">
          {/*ARTICLE PART*/}
          <div className="w-full max-w-[781px]">
            <ArticleDetailContent lang={_lang} data={data} />
          </div>
        </section>
        <section className="col-span-1 p-[74px] bg-app-light-gray">
          COL SPAN 2
        </section>
      </div>
    </>
  );
}
