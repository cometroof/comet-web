import supabaseClient from "@/supabase/client";
import { ParamsLang } from "../../types-general";
import ArticleDetailContent from "./content";
import { format } from "date-fns";
import { id, enUS } from "date-fns/locale";
import ArticleLatest from "./latest";
import FooterNew from "@/app/footer";

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
  const title = _lang === "id" && data?.title_id ? data?.title_id : data?.title;
  return (
    <>
      <div className="grid lg:grid-cols-3">
        <section className="col-span-1 lg:col-span-2 p-14 flex justify-end pb-52">
          {/*ARTICLE PART*/}
          <div className="w-full max-w-[781px]">
            {data?.title && <h1 className="text-heading1">{title}</h1>}
            {data?.created_at && (
              <time
                dateTime={data?.created_at}
                className="text-subheading text-primary mt-5 block"
              >
                {format(data?.created_at, "d MMMM yyyy", {
                  locale: _lang === "id" ? id : enUS,
                })}
              </time>
            )}
            <ArticleDetailContent lang={_lang} data={data} />
          </div>
        </section>
        <section className="col-span-1 p-[74px] bg-app-light-gray pb-52">
          <ArticleLatest current={data} lang={_lang} />
        </section>
      </div>
      <div className="-mt-20">
        <FooterNew />
      </div>
    </>
  );
}
