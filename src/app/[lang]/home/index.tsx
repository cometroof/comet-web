import Homepage__Projects from "../projects";
import { ParamsLang } from "../types-general";
import Homepage__Article from "./article";
import Homepage__Certifications from "./certifications";
import Homepage__HeroCoverNewly from "./cover-newly";
import Homepage__Distributions from "./distributions";
import Homepage__Products from "./products";

export default async function HomePage({ lang }: ParamsLang) {
  return (
    <>
      {/*<Homepage__HeroCover lang={lang} />*/}
      <Homepage__HeroCoverNewly lang={lang} />
      <Homepage__Products lang={lang} />
      <Homepage__Certifications lang={lang} />
      <div className="h-[600px] bg-cyan-900 sticky top-header">
        COVER PROJECTS
      </div>
      <Homepage__Projects lang={lang} />
      <Homepage__Distributions lang={lang} />
      <div className="h-[600px] bg-pink-900 sticky top-header">
        COVER DISTRIBUTIONS
      </div>
      <Homepage__Article lang={lang} />
    </>
  );
}
