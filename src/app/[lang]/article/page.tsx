import ArticleItem from "@/components/app/article-item";
import FooterNew from "@/components/app/footer";
import Pagination from "@/components/app/pagination";
import supabaseClient from "@/supabase/client";
import { ParamsLang } from "../types-general";
import { getPageDictionary } from "../dictionaries";
import { ArticleDictionary } from "@/types/dictionary";

const ARTICLES_PER_PAGE = 3;

async function getArticles(page: number = 1) {
  const from = (page - 1) * ARTICLES_PER_PAGE;
  const to = from + ARTICLES_PER_PAGE - 1;

  return (
    await supabaseClient
      .from("articles")
      .select()
      .order("created_at", { ascending: false })
      .range(from, to)
  ).data;
}

async function getTotalArticles() {
  const { count } = await supabaseClient
    .from("articles")
    .select("id", { count: "exact", head: true });
  return count || 0;
}

export const revalidate = 300;

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<ParamsLang>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { lang } = await params;
  const _lang = lang || "en";
  const { page: pageParam } = await searchParams;
  const currentPage = Number(pageParam) || 1;

  const [articles, totalArticles] = await Promise.all([
    getArticles(currentPage),
    getTotalArticles(),
  ]);

  const { pageTitle, pageDescription } = (await getPageDictionary(
    _lang,
    "article",
  )) as ArticleDictionary;

  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);
  return (
    <>
      <section className="bg-app-black text-app-white h-[360px]  outer-wrapper ">
        <div className="inner-wrapper">
          <h2 className="text-caption">{pageTitle}</h2>
          <div
            className="text-heading1 span-inner-red max-w-[600px] mt-6"
            dangerouslySetInnerHTML={{ __html: pageDescription }}
          ></div>
        </div>
      </section>
      <section className="outer-wrapper bg-app-white">
        <div className="inner-wrapper">
          <div className="space-y-8 lg:space-y-12">
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
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="inner-wrapper">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </section>
      <FooterNew />
    </>
  );
}
