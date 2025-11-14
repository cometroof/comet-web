import Image from "next/image";
import { ParamsLang } from "../types-general";
import { getPageDictionary } from "../dictionaries";
import { AboutUsDictionary } from "@/types/dictionary";
import { cleanHTML } from "../utils/utils";

export default async function AboutUsPage__Trust({
  lang,
}: {
  lang: ParamsLang["lang"];
}) {
  const _lang = lang || "en";
  const { trust } = (await getPageDictionary(
    _lang,
    "about",
  )) as AboutUsDictionary;
  const content = `<p>${trust.description1}</p>
    <p>${trust.description2}</p>
  <p>${trust.description3}</p>`;
  return (
    <section className="outer-wrapper-x py-24 bg-app-light-gray relative">
      <div className="inner-wrapper">
        <h2 className="text-heading1 text-primary">3. {trust.title}</h2>
        <div className="flex flex-col-reverse lg:flex-row items-end gap-10 lg:gap-20 mt-10 lg:mt-10">
          <div
            className="text-body max-w-[572px] [&>p]:my-4"
            dangerouslySetInnerHTML={{ __html: cleanHTML(content) }}
          ></div>
          <div className="w-full">
            <div className="bg-app-black aspect-[3.3/2] w-full relative">
              <img
                className="size-full object-cover"
                alt="Trust & Integrity"
                src="https://comet-roof.my.id/images/about-trust-integrity-1762703250427.webp"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
