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
    <div
      className="mt-8 prose prose-a:text-primary"
      dangerouslySetInnerHTML={{ __html: cleanHTML(content) }}
    ></div>
  );
}
