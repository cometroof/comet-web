import Header from "@/components/app/header";
import { ParamsLang } from "../types-general";
import Homepage__HeroCoverNewly from "./cover-newly";

export default async function HomePage({ lang }: ParamsLang) {
  return (
    <div>
      <Header />
      {/*<Homepage__HeroCover lang={lang} />*/}
      <Homepage__HeroCoverNewly lang={lang} />
    </div>
  );
}
