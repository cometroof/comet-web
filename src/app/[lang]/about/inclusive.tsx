import { ParamsLang } from "../types-general";

export default function AboutUsPage__Inclusive({
  lang,
}: {
  lang: ParamsLang["lang"];
}) {
  const content = `<p>We promote environmentally responsible practices by using sustainable raw materials and low-impact production methods.  Our roofing systems are carefully designed to suit Indonesia’s diverse geographic conditions including peatlands while enhancing structural safety and adding to the visual harmony of urban environments.</p>
  <p>We are committed to contributing to the Sustainable Development Goals (SDGs), particularly Goal 11: making cities and human settlements inclusive, safe, resilient, and sustainable.</p>`;
  return (
    <section className="outer-wrapper-x py-24 bg-app-white relative">
      <div className="inner-wrapper">
        <h2 className="text-heading1 text-primary">
          4. Inclusive Sustainability
        </h2>
        <div className="flex flex-col-reverse lg:flex-row items-end gap-10 lg:gap-20 mt-10 lg:mt-10">
          <div
            className="text-body max-w-[572px] [&>p]:my-4"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <div className="w-full">
            <div className="bg-app-black aspect-square max-w-[186px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
