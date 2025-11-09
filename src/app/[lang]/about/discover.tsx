import { AboutUsDictionary } from "@/types/dictionary";
import { getPageDictionary } from "../dictionaries";
import { ParamsLang } from "../types-general";

// export default function AboutUsPage__Discover() {
export default async function AboutUsPage__Discover({ lang }: ParamsLang) {
  const _lang = lang || "en";
  const { discovery: copy } = (await getPageDictionary(
    _lang,
    "about",
  )) as AboutUsDictionary;
  return (
    <section className="outer-wrapper bg-app-light-gray !py-32 relative">
      <div className="inner-wrapper">
        <div className="w-full flex flex-col lg:flex-row gap-10 items-center justify-between">
          <div className="lg:max-w-[566px]">
            <h2
              className="text-heading1 span-inner-red"
              dangerouslySetInnerHTML={{ __html: copy.title }}
            ></h2>
          </div>
          <div className="lg:max-w-[420px]">
            <p className="text-body">{copy.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
