import { Database } from "@/supabase/supabase";
import { ParamsLang } from "../../types-general";
import supabaseClient from "@/supabase/client";
import { format } from "date-fns";
import { id, enUS } from "date-fns/locale";
import { LangLink } from "@/components/app/lang-link";

type TArticle = Partial<Database["public"]["Tables"]["articles"]["Row"]>;

async function getArticleLates(currentId?: string) {
  if (!currentId) return null;
  return (
    await supabaseClient
      .from("articles")
      .select()
      .neq("id", currentId)
      .is("publish", true)
      .order("created_at", { ascending: false })
      .limit(3)
  ).data;
}

export default async function ArticleLatest({
  lang,
  current,
}: {
  lang: ParamsLang["lang"];
  current: TArticle | null;
}) {
  const articles = await getArticleLates(current?.id);
  return (
    <div className="space-y-8">
      <div className="text-subheading">
        {lang === "id" ? "Artikel Lainnya" : "Latest Updates"}
      </div>
      <div className="flex flex-col gap-6 lg:gap-12">
        {articles?.map((item) => {
          const title =
            lang === "id" && item.title_id ? item.title_id : item.title;
          return (
            <LangLink
              href={`/article/${item.slug}`}
              key={item.id}
              className="w-full lg:max-w-[286px] block group"
            >
              <div className="w-full aspect-[4/3] relative overflow-hidden">
                {item.cover_image ? (
                  <img
                    src={item.cover_image}
                    alt={`Image of ${item.title}`}
                    className="w-full h-full object-cover transition-all group-hover:scale-125"
                  />
                ) : (
                  <div className="size-full bg-app-light-gray" />
                )}
              </div>
              <div className="mt-[18px] text-subheading group-hover:text-primary">
                {title}
              </div>
              <div className="mt-0.5">
                <time
                  dateTime={item.created_at}
                  className="text-[#8C8C8C] group-hover:text-app-black text-sm"
                >
                  {format(item?.created_at, "d MMMM yyyy", {
                    locale: lang === "id" ? id : enUS,
                  })}
                </time>
              </div>
            </LangLink>
          );
        })}
      </div>
    </div>
  );
}
