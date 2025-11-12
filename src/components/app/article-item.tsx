import Image from "next/image";
import Link from "next/link";

export interface IArticle {
  created_at: string; // ISO 8601 with UTC
  updated_at?: string; // ISO 8601 with UTC
  title: string;
  description: string;
  link: string;
  image: string;
}

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
  const { day, month } = getDateAndMonth(article.created_at);
  return (
    <Link
      href={article.link}
      aria-label={`Read ${article.title}`}
      className="block"
    >
      <article
        title={article.title}
        className="flex items-start gap-7 text-app-gray  w-full max-w-[836px]"
      >
        <div className="w-[10%]">
          <time dateTime={article.created_at} className="block">
            <div className="text-heading1">{day}</div>
            <div className="text-subheading uppercase">{month}</div>
          </time>
          <div className="mt-9">
            <svg
              width={31}
              height={15}
              viewBox="0 0 31 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m20 15 11-7.478L20 0z" fill="#ed1c24" />
              <path d="M22 8H0" stroke="#ed1c24" strokeWidth={2} />
            </svg>
          </div>
        </div>
        <div className="flex-1  flex gap-10 items-start group">
          {/*PART IMAGE*/}
          <div className="aspect-[4/3] w-1/3 relative overflow-hidden bg-app-light-gray">
            <Image
              alt={article.title}
              src={article.image}
              className="size-full object-cover  group-hover:scale-125 transition-all"
              width={100}
              height={100}
              unoptimized
            />
          </div>
          {/*PART CONTENT*/}
          <div className="flex-1">
            <h3 className="text-heading2">{article.title}</h3>
            <p className="text-body mt-6">{article.description}</p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleItem;
