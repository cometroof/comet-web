import { ParamsLang } from "../types-general";
import Homepage__Certifications from "./certifications";
import Homepage__HeroCoverNewly from "./cover-newly";
import Homepage__Products from "./products";

export default async function HomePage({ lang }: ParamsLang) {
  return (
    <>
      {/*<Homepage__HeroCover lang={lang} />*/}
      <Homepage__HeroCoverNewly lang={lang} />
      <Homepage__Products lang={lang} />
      <Homepage__Certifications lang={lang} />
      <div className="bg-white min-h-screen text-black relative">SECTION 2</div>
      <div className="h-40 bg-cyan-900 sticky top-header">SECTION CERT. 2</div>
      <div className="bg-white min-h-screen text-black relative">SECTION 3</div>
      <div className="h-40 bg-pink-900 sticky top-header">SECTION CERT. 3</div>
      <div className="bg-white min-h-screen text-black relative">SECTION 4</div>
    </>
  );
}
