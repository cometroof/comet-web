import { ParamsLang } from "../types-general";
import BrandButton from "@/components/app/brand-button";
import Link from "next/link";
import ArticleItem, { IArticle } from "@/components/app/article-item";
import { getPageDictionary } from "../dictionaries";
import { HomeDictionary } from "@/types/dictionary";

const articles: IArticle[] = [
  {
    created_at: "2025-09-20T09:00:00Z",
    title: "Sustainable Architecture Trends in 2025",
    description:
      "From sleek looks to unbeatable durability, metal roofs are becoming the top choice for homeowners. Here’s why they’re changing",
    link: "/articles/sustainable-architecture-trends-2025",
    image: "https://placehold.co/600x400/green/white?text=Sustainable+Design",
  },
  {
    created_at: "2025-08-15T14:30:00Z",
    title: "The Future of Smart Homes",
    description:
      "From sleek looks to unbeatable durability, metal roofs are becoming the top choice for homeowners. Here’s why they’re changing...",
    link: "/articles/future-of-smart-homes",
    image: "https://placehold.co/600x400/blue/white?text=Smart+Homes",
  },
  {
    created_at: "2025-07-05T07:45:00Z",
    title: "Minimalist Interior Design Ideas",
    description:
      "From sleek looks to unbeatable durability, metal roofs are becoming the top choice for homeowners. Here’s why they’re changing...",
    link: "/articles/minimalist-interior-design-ideas",
    image: "https://placehold.co/600x400/gray/white?text=Minimalist+Design",
  },
];

export default async function Homepage__Article({ lang }: ParamsLang) {
  const _lang = lang || "en";
  const home = (await getPageDictionary(_lang, "home")) as HomeDictionary;
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
            {articles.map((article) => {
              return <ArticleItem key={article.link} article={article} />;
            })}
          </div>
          <div className="mt-20">
            <Link href="/articles">
              <BrandButton className="btn-fill">{home.article.cta}</BrandButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
