import supabaseClient from "@/supabase/client";
import { ParamsLang } from "../../types-general";

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
  const { slug } = await params;
  const data = await getData(slug!);
  return (
    <div className="grid grid-cols-3">
      <section className="col-span-2 p-14 flex justify-end border border-app-gray">
        {/*ARTICLE PART*/}
        <div className="w-full max-w-[781px] border border-dashed">
          <p>{slug}</p>
          <div dangerouslySetInnerHTML={{ __html: `${data?.content}` }}></div>
        </div>
      </section>
      <section className="col-span-1 p-20 bg-app-light-gray">
        COL SPAN 2
      </section>
    </div>
  );
}
