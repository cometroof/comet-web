import supabaseClient from "@/supabase/client";
import { ParamsLang } from "../../types-general";
import ArticleDetailContent from "./content";
import { format } from "date-fns";
import { id, enUS } from "date-fns/locale";
import ArticleLatest from "./latest";
import FooterNew from "@/app/footer";
import { Metadata } from "next";
import { LangLink } from "@/components/app/lang-link";

interface Props {
  slug?: string;
  lang: ParamsLang["lang"];
}

async function getData(slug: string) {
  return (
    await supabaseClient
      .from("articles")
      .select()
      .is("publish", true)
      .eq("slug", slug)
      .single()
  ).data;
}

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: "en" | "id" }>;
}): Promise<Metadata> {
  const { slug, lang = "en" } = await params;
  const { data } = await supabaseClient
    .from("articles")
    .select("seo_title,seo_description,seo_title_id,seo_description_id")
    .is("publish", true)
    .eq("slug", slug)
    .single();
  if (data) {
    const title =
      lang === "id" && data.seo_title_id ? data.seo_title_id : data.seo_title;
    const metaTitle = `${title} - COMET - PT. Comtech Metalindo Terpadu`;
    const metaDesc = `${
      lang === "id" && data.seo_description_id
        ? data.seo_description_id
        : data.seo_description
    }`;
    return {
      title: metaTitle,
      description: metaDesc,
      openGraph: { title: metaTitle, description: metaDesc },
      twitter: { title: metaTitle, description: metaDesc },
    };
  }
  return {};
}

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
        <section className="col-span-1 lg:col-span-2 flex justify-end pb-24 lg:pb-52">
          {/*ARTICLE PART*/}
          <div className="relative w-full max-w-[781px]">
            {data?.title && (
              <div className="text-heading1  pt-14 px-7 lg:px-14">{title}</div>
            )}
            {data?.created_at && (
              <time
                dateTime={data?.created_at}
                className="text-subheading text-primary mt-5 block  px-7 lg:px-14"
              >
                {format(data?.created_at, "d MMMM yyyy", {
                  locale: _lang === "id" ? id : enUS,
                })}
              </time>
            )}
            <ArticleDetailContent lang={_lang} data={data} />
            <div className="pt-20 lg:pt-60  px-7 lg:px-14">
              <LangLink
                href="/article"
                className="text-primary font-semibold font-exo-2 text-sm flex items-center gap-3 w-fit group"
              >
                <svg
                  width="11"
                  height="15"
                  viewBox="0 0 11 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-all group-hover:-translate-x-5"
                >
                  <path
                    d="M11 0L6.57605e-07 7.47788L11 15L11 0Z"
                    fill="#ED1C24"
                  />
                </svg>
                <div>
                  {lang === "id"
                    ? "KEMBALI KE DAFTAR ARTIKEL"
                    : "BACK TO ALL ARTICLES"}
                </div>
              </LangLink>
            </div>
            <div className="hidden absolute left-0 bottom-0">
              <LangLink
                href="/article"
                className="text-primary font-semibold font-exo-2 text-sm flex items-center gap-3 w-fit group"
              >
                <svg
                  width="11"
                  height="15"
                  viewBox="0 0 11 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-all group-hover:-translate-x-5"
                >
                  <path
                    d="M11 0L6.57605e-07 7.47788L11 15L11 0Z"
                    fill="#ED1C24"
                  />
                </svg>
                <div>
                  {lang === "id"
                    ? "KEMBALI KE DAFTAR ARTIKEL"
                    : "BACK TO ALL ARTICLES"}
                </div>
              </LangLink>
            </div>
          </div>
        </section>
        <section className="col-span-1 p-7 lg:p-[74px] bg-app-light-gray pb-52">
          <ArticleLatest current={data} lang={_lang} />
        </section>
      </div>
      <div className="-mt-20">
        <FooterNew />
      </div>
    </>
  );
}
