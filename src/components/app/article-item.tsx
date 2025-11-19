import Image from "next/image";
import Icon__LongArrow from "../assets/long-arrow";
import { LangLink } from "./lang-link";
import { truncateAtWord } from "@/lib/utils";

export interface IArticle {
  created_at: string; // ISO 8601 with UTC
  updated_at?: string; // ISO 8601 with UTC
  title: string;
  description: string;
  link: string;
  image: string;
  title_id?: string | null;
  description_id?: string | null;
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

const ArticleItem = ({
  article,
  lang,
}: {
  article: IArticle;
  lang?: "en" | "id";
}) => {
  const { day, month } = getDateAndMonth(article.created_at || "");
  const title =
    lang === "id" && article.title_id ? article.title_id : article.title;
  const description =
    lang === "id" && article.description_id
      ? article.description_id
      : article.description;
  return (
    <LangLink
      href={article?.link}
      aria-label={`Read ${title}`}
      className="block group"
    >
      <article
        title={title}
        className="flex items-start gap-7 text-app-gray  w-full max-w-[836px]"
      >
        <div className="w-[10%]">
          <time dateTime={article.created_at} className="block">
            <div className="text-heading1">{day}</div>
            <div className="text-subheading uppercase">{month}</div>
          </time>
          <div className="mt-9 overflow-hidden text-primary">
            <Icon__LongArrow className="transition-all -translate-x-[25%] group-hover:translate-x-0" />
          </div>
        </div>
        <div className="flex-1  flex gap-10 items-start">
          {/*PART IMAGE*/}
          <div className="aspect-[4/3] w-1/3 relative overflow-hidden bg-app-light-gray">
            <Image
              alt={title}
              src={article.image}
              className="size-full object-cover  group-hover:scale-125 transition-all"
              width={100}
              height={100}
              unoptimized
            />
          </div>
          {/*PART CONTENT*/}
          <div className="flex-1">
            <h3 className="text-heading2">{truncateAtWord(title, 70)}</h3>
            <p className="text-body mt-6">{description}</p>
          </div>
        </div>
      </article>
    </LangLink>
  );
};

export default ArticleItem;
