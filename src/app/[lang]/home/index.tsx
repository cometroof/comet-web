import { ParamsLang } from "../types-general";
import Homepage__HeroCoverNewly from "./cover-newly";

export default async function HomePage({ lang }: ParamsLang) {
  return (
    <>
      {/*<Homepage__HeroCover lang={lang} />*/}
      <Homepage__HeroCoverNewly lang={lang} />
    </>
  );
}
