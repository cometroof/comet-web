import FooterNew from "@/components/app/footer";
import { ParamsLang } from "../types-general";
import Homepage__HeroCoverNewly from "./cover-newly";

import dynamic from "next/dynamic";
import SeparatorBanner from "@/components/app/separator-banner";

const Homepage__Article = dynamic(() => import("./article"));
const Homepage__Projects = dynamic(() => import("./projects"));
const Homepage__Certifications = dynamic(() => import("./certifications"));
const Homepage__Distributions = dynamic(() => import("./distributions"));
const Homepage__Products = dynamic(() => import("./products"));

export default async function HomePage({ lang }: ParamsLang) {
  return (
    <>
      {/*<Homepage__HeroCover lang={lang} />*/}
      <Homepage__HeroCoverNewly lang={lang} />
      <Homepage__Products lang={lang} />
      <Homepage__Certifications lang={lang} />
      <SeparatorBanner imgUrl="https://placehold.co/900x400/104e64/FFFFFF?text=Cover\nProjects%20Us" />
      <Homepage__Projects lang={lang} />
      <Homepage__Distributions lang={lang} />
      <SeparatorBanner imgUrl="https://placehold.co/900x400/861043/FFFFFF?text=Cover\nDistributions%20" />
      <Homepage__Article lang={lang} />
      <FooterNew className="bg-app-white" />
    </>
  );
}
