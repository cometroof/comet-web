import ArticleItem, { IArticle } from "@/components/app/article-item";
import FooterNew from "@/components/app/footer";

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

export default function ArticlePage() {
  return (
    <>
      <section className="bg-app-black text-app-white h-[360px]  outer-wrapper ">
        <div className="inner-wrapper">
          <h2 className="text-caption">ARTICLES</h2>
          <div className="text-heading1 span-inner-red max-w-[600px] mt-6">
            Expert <span>roofing articles</span> to guide your home improvement
            decisions
          </div>
        </div>
      </section>
      <section className="outer-wrapper bg-app-white">
        <div className="inner-wrapper">
          <div className="space-y-4">
            {articles.map((article) => {
              return <ArticleItem key={article.link} article={article} />;
            })}
          </div>
        </div>
      </section>
      <FooterNew />
    </>
  );
}
