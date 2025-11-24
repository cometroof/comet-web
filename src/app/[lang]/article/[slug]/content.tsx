"use client";

import { ParamsLang } from "../../types-general";
import { Database } from "@/supabase/supabase";
import { cleanHTML } from "../../utils/utils";

type TArticle = Partial<Database["public"]["Tables"]["articles"]["Row"]>;

export default function ArticleDetailContent({
  lang,
  data,
}: {
  lang: ParamsLang["lang"];
  data?: TArticle | null;
}) {
  const content =
    lang === "id" && data?.content_id ? data?.content_id : data?.content;
  return (
    <>
      {data?.cover_image && (
        <img
          className="block w-full my-5"
          alt={lang === "id" && data?.title_id ? data.title_id : data?.title}
          src={data?.cover_image}
        />
      )}
      <div
        className="mt-5 prose prose-a:text-primary  px-7 lg:px-14"
        dangerouslySetInnerHTML={{ __html: cleanHTML(content) }}
      ></div>
    </>
  );
}
