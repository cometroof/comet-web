import Header from "@/components/app/header";
import { ParamsLang } from "../types-general";
import Homepage__HeroCover from "./hero-cover-new";

export default async function HomePage({ lang }: ParamsLang) {
  return (
    <div>
      <Header />
      <Homepage__HeroCover lang={lang} />
    </div>
  );
}
