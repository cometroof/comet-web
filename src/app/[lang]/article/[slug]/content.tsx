"use client";

import GoogleTranslateScript from "@/components/app/google-translate-script";
import { ParamsLang } from "../../types-general";
import { Database } from "@/supabase/supabase";

type TArticle = Partial<Database["public"]["Tables"]["articles"]["Row"]>;

export default function ArticleDetailContent({
  lang,
  data,
}: {
  lang: ParamsLang["lang"];
  data?: TArticle | null;
}) {
  return (
    <>
      <GoogleTranslateScript lang={lang} />
      <div dangerouslySetInnerHTML={{ __html: `${data?.content}` }}></div>
    </>
  );
}
