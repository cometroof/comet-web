import { ParamsLang } from "../types-general";

export default function AboutUsPage__Discover({ lang }: ParamsLang) {
  const _lang = lang || "en";
  return (
    <section className="outer-wrapper bg-app-light-gray !py-32 relative">
      <div className="inner-wrapper">
        <div className="w-full flex items-center justify-between">
          <div className="lg:max-w-[566px]">
            <h2 className="text-heading1 span-inner-red">
              Discover why customers <span>place their</span> trust in our
              expertise and commitment to superior metal roofing solutions.
            </h2>
          </div>
          <div className="lg:max-w-[420px]">
            <p className="text-body">
              Our product is a reflection of our unwavering commitment to
              quality, reliability, and integrity. From innovative design and
              precise engineering to responsive technical support and dependable
              distribution, we ensure every detail earns the trust of our
              partners and customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
