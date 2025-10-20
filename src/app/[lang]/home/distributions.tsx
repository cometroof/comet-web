import { ParamsLang } from "../types-general";
import Homepage__SectionHead from "./_section-head";

export default function Homepage__Distributions({}: ParamsLang) {
  // export default function Homepage__Distributions() {
  return (
    <section className="relative">
      <div className="outer-wrapper bg-app-light-gray">
        <div className="inner-wrapper text-app-gray py-20">
          <Homepage__SectionHead
            className="!pb-0 border-b-transparent"
            title={`Our products are available through <span>42 distribution points</span> across Indonesia`}
            description={`Supported by our strategic partners, <b>PT Catur Sentosa Adiprana Tbk. Mitra10 (MTO) and some local distributors</b>, this growing distribution network ensures that our high-quality roofing products are always within reach, making it easier for customers to access our products wherever they are.`}
            link="/about-us#distribution"
            linkText="OUR DISTRIBUTIONS"
            undertitle={
              <div className="flex gap-8 items-center flex-wrap mt-8">
                <div className="w-[150px] h-[110px] bg-app-gray" />
                <div className="w-[154px] h-[70px] bg-app-gray" />
                <div className="w-[144px] h-[90px] bg-app-gray" />
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
