import Image from "next/image";
import { ParamsLang } from "../types-general";
import BrandButton from "@/components/app/brand-button";
import Link from "next/link";

interface IArticle {
  date: string; // ISO 8601 with UTC
  title: string;
  description: string;
  link: string;
  image: string;
}

const articles: IArticle[] = [
  {
    date: "2025-09-20T09:00:00Z",
    title: "Sustainable Architecture Trends in 2025",
    description:
      "From sleek looks to unbeatable durability, metal roofs are becoming the top choice for homeowners. Here’s why they’re changing",
    link: "/articles/sustainable-architecture-trends-2025",
    image: "https://placehold.co/600x400/green/white?text=Sustainable+Design",
  },
  {
    date: "2025-08-15T14:30:00Z",
    title: "The Future of Smart Homes",
    description:
      "From sleek looks to unbeatable durability, metal roofs are becoming the top choice for homeowners. Here’s why they’re changing...",
    link: "/articles/future-of-smart-homes",
    image: "https://placehold.co/600x400/blue/white?text=Smart+Homes",
  },
  {
    date: "2025-07-05T07:45:00Z",
    title: "Minimalist Interior Design Ideas",
    description:
      "From sleek looks to unbeatable durability, metal roofs are becoming the top choice for homeowners. Here’s why they’re changing...",
    link: "/articles/minimalist-interior-design-ideas",
    image: "https://placehold.co/600x400/gray/white?text=Minimalist+Design",
  },
];

function getDateAndMonth(dateStr: string): { day: string; month: string } {
  const date = new Date(dateStr);
  const day = date.getUTCDate().toString();
  const month = date.toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  return {
    day,
    month,
  };
}

const ArticleItem = ({ article }: { article: IArticle }) => {
  const { day, month } = getDateAndMonth(article.date);
  return (
    <article
      title={article.title}
      className="flex items-start gap-14 text-app-gray  w-full max-w-[836px]"
    >
      <div className="w-[10%]">
        <time dateTime={article.date} className="block">
          <div className="text-heading1">{day}</div>
          <div className="text-subheading uppercase">{month}</div>
        </time>
      </div>
      <div className="flex-1  flex gap-10 items-start">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            alt={article.title}
            src={article.image}
            className="size-full object-cover"
            width={100}
            height={100}
            unoptimized
          />
        </div>
        <div>
          <h3 className="text-heading2">{article.title}</h3>
          <p className="text-body mt-6">{article.description}</p>
        </div>
      </div>
    </article>
  );
};

export default function Homepage__Article({ lang }: ParamsLang) {
  return (
    <section className="min-h-[400px] relative bg-white text-app-gray">
      <div className="outer-wrapper">
        <div className="inner-wrapper py-14">
          <h2 className="text-heading1 span-inner-red">
            Never miss an <span>update!</span>
          </h2>
          <div className="w-full h-px bg-app-gray" />
          <div className="mt-5 text-caption">
            OUR LIST OF INFORMATIVE ARTICLES:
          </div>
          <div className="mt-10 space-y-10">
            {articles.map((article) => {
              return <ArticleItem key={article.link} article={article} />;
            })}
          </div>
          <div className="mt-20">
            <Link href="/articles">
              <BrandButton className="btn-fill">ALL ARTICLES</BrandButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
