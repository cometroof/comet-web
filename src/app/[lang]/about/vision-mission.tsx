import { ParamsLang } from "../types-general";

const mission = [
  "Producing minimalist metal roof tiles with advanced technology that provides maximum durability and modern design",
  "Providing products that meet international quality standards at competitive specs",
  "Committed to reducing environmental impact by using environmentally friendly raw materials and efficient production processes.",
  "Building long-term relationships with customers and business partners through trusted and professional services.",
  "Providing the best solution for future roofing needs.",
];

const missions = {
  en: mission,
  id: mission,
};

export default function AboutUsPage__VisionMission({ lang }: ParamsLang) {
  const _lang = lang || "en";
  return (
    <section className="outer-wrapper bg-app-black text-app-white !py-20 relative">
      <div className="inner-wrapper">
        <div className="w-full  flex flex-col lg:flex-row items-start gap-20">
          <div className="w-full lg:w-3/5">
            <h2 className="text-caption">OUR VISION</h2>
            <p className="mt-32 font-exo-2 font-medium text-[34px] leading-[1.35em] span-inner-red max-w-[600px]">
              <span>To become a market leader</span> in providing high-quality
              minimalist metal roofing by offering innovative, aesthetic, and
              durable roofing solutions to support environmentally friendly and
              sustainable development
            </p>
          </div>
          <div className="w-full lg:w-2/5">
            <h2 className="text-caption">OUR MISSION</h2>
            <ul className="mt-12">
              {missions[lang].map((mission, n) => (
                <li key={n} className="not-last:mb-10">
                  <div className="text-subheading text-primary">
                    {n < 9 ? `0${n + 1}` : n + 1}
                  </div>
                  <p className="mt-2 max-w-[360px]">{mission}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
