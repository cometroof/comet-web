import { ParamsLang } from "../types-general";
import { getPageDictionary } from "../dictionaries";
import { AboutUsDictionary } from "@/types/dictionary";
import { cleanHTML } from "../utils/utils";

export default async function AboutUsPage__Inclusive({
  lang,
}: {
  lang: ParamsLang["lang"];
}) {
  const _lang = lang || "en";
  const { inclusive } = (await getPageDictionary(
    _lang,
    "about"
  )) as AboutUsDictionary;
  const content = `<p>${inclusive.description1}</p>
  <p>${inclusive.description2}</p>`;
  return (
    <section className="outer-wrapper-x py-10 lg:py-24 bg-app-white relative">
      <div className="inner-wrapper">
        <h2 className="text-heading1 text-primary">4. {inclusive.title}</h2>
        <div className="flex flex-col lg:flex-row items-end gap-6 lg:gap-20 mt-2 lg:mt-10">
          <div
            className="text-body max-w-[572px] [&>p]:my-4"
            dangerouslySetInnerHTML={{ __html: cleanHTML(content) }}
          ></div>
          <div className="w-full">
            <div className="bg-app-black aspect-square max-w-[186px] relative">
              <img
                className="size-full object-cover"
                alt="Inclusive Sustainability"
                src="https://comet-roof.my.id/images/about-sustainability-1762703250870.webp"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
