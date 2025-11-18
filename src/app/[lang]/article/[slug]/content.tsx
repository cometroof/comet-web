"use client";

// import GoogleTranslateScript from "@/components/app/google-translate-script";
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
      {/* <GoogleTranslateScript lang={lang} includedLanguages="en,id" /> */}
      <div dangerouslySetInnerHTML={{ __html: cleanHTML(content) }}></div>
    </>
  );
}
