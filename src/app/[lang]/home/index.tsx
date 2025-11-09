import FooterNew from "@/app/footer";
import { ParamsLang } from "../types-general";
import Homepage__HeroCoverNewly from "./cover-newly";

import dynamic from "next/dynamic";

const Homepage__Article = dynamic(() => import("./article"));
const Homepage__Projects = dynamic(() => import("./projects"));
const Homepage__Certifications = dynamic(() => import("./certifications"));
const Homepage__Distributions = dynamic(() => import("./distributions"));
const Homepage__Products = dynamic(() => import("./products"));
const DynamicBanner = dynamic(() => import("@/components/app/dynamic-banner"));

export default async function HomePage({ lang }: ParamsLang) {
  return (
    <>
      {/*<Homepage__HeroCover lang={lang} />*/}
      <Homepage__HeroCoverNewly lang={lang} />
      <Homepage__Products lang={lang} />
      <Homepage__Certifications lang={lang} />
      <DynamicBanner typeValue="home-project" optimized />
      <Homepage__Projects lang={lang} />
      <Homepage__Distributions lang={lang} />
      <DynamicBanner typeValue="home-distribution" optimized />
      <Homepage__Article lang={lang} />
      <FooterNew className="bg-app-white" />
    </>
  );
}
