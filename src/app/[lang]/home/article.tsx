import { ParamsLang } from "../types-general";
import BrandButton from "@/components/app/brand-button";
import ArticleItem from "@/components/app/article-item";
import { getPageDictionary } from "../dictionaries";
import { HomeDictionary } from "@/types/dictionary";
import supabaseClient from "@/supabase/client";
import { LangLink } from "@/components/app/lang-link";

async function getArticles() {
  return (
    await supabaseClient
      .from("articles")
      .select()
      .is("publish", true)
      .order("created_at", { ascending: false })
      .limit(3)
  ).data;
}

export default async function Homepage__Article({ lang }: ParamsLang) {
  const _lang = lang || "en";
  const home = (await getPageDictionary(_lang, "home")) as HomeDictionary;
  const articles = await getArticles();

  return (
    <section className="min-h-[400px] relative bg-white text-app-gray">
      <div className="outer-wrapper">
        <div className="inner-wrapper py-14">
          <h2
            className="text-heading1 span-inner-red"
            dangerouslySetInnerHTML={{ __html: home.article.title }}
          ></h2>
          <div className="w-full h-px bg-app-gray" />
          <div className="mt-5 text-caption">{home.article.note}</div>
          <div className="mt-10 space-y-10">
            {articles?.map((article) => {
              return (
                <ArticleItem
                  key={`/article/${article.slug}`}
                  article={{
                    created_at: article.created_at,
                    title: article.title,
                    description: `${article.seo_description}`,
                    link: `/article/${article.slug}`,
                    image: article.cover_image!,
                    title_id: article.title_id,
                    description_id: article.seo_description_id,
                  }}
                  lang={_lang}
                />
              );
            })}
          </div>
          <div className="mt-20">
            <LangLink href="/article">
              <BrandButton className="btn-fill">{home.article.cta}</BrandButton>
            </LangLink>
          </div>
        </div>
      </div>
    </section>
  );
}
