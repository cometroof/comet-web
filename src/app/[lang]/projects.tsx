import Homepage__SectionHead from "./home/_section-head";
import { ParamsLang } from "./types-general";

export default function Homepage__Projects({ lang }: ParamsLang) {
  return (
    <section className="outer-wrapper bg-white  relative text-app-gray">
      <div className="inner-wrapper py-32">
        <Homepage__SectionHead
          title={`See how our products are installed and <span>showcase both beauty and performance</span> in real-world applications.`}
          description="Designed for lasting value, our roofs combine advanced materials with precision engineering. Whether for residential, commercial, or industrial projects, they deliver dependable protection while enhancing the overall look of the building."
          closerText={`OUR NOTABLE RANGE OF PROJECTS:`}
          link="/projects"
          linkText="ALL PROJECTS"
        />
      </div>
    </section>
  );
}
