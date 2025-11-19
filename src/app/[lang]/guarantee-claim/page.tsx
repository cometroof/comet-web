import FooterNew from "@/app/footer";
import { ParamsLang } from "../types-general";
import Guarantee__ClaimForm from "./claim-form";
import Guarantee__Steps from "./steps";
import { getPageDictionary } from "../dictionaries";
import { GuaranteeDictionary } from "@/types/dictionary";
import { cleanHTML } from "../utils/utils";
import { Metadata } from "next";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "id" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  let description = `Proof of our quality assurance for each of our products. Easy warranty claims for metal roof tiles with a complete guide.`;
  if (lang === "id") {
    description = `Bukti jaminan kualitas setiap produk kami. Cara mudah klaim garansi genteng metal dengan panduan lengkapnya.`;
  }
  return {
    description,
    openGraph: { description },
    twitter: { description },
  };
}

export default async function Guarantee({
  params,
}: {
  params: Promise<ParamsLang>;
}) {
  const { lang = "en" } = await params;
  const dictionary = (await getPageDictionary(
    lang,
    "guarantee-claim"
  )) as GuaranteeDictionary;
  const copy = dictionary;
  return (
    <>
      <section className="sticky top-header h-[calc(566px-80px)] bg-dash">
        <div className="outer-wrapper h-full  relative">
          <div
            className="absolute bottom-0 right-0 h-full w-1/2 pointer-events-none  flex items-end"
            style={{
              backgroundImage: `url(https://comet-roof.my.id/images/roof-guarantee-lg-1762942654362.webp)`,
              backgroundPosition: "left center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="relative  h-full flex justify-center flex-col inner-wrapper">
            <div className="w-full lg:w-1/2 max-w-[542px]">
              <h2 className="text-caption">{copy.title}</h2>
              <div
                className="text-heading1 span-inner-red mt-6"
                dangerouslySetInnerHTML={{
                  __html: cleanHTML(copy.description),
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative  outer-wrapper !py-32 bg-app-white">
        <div className="inner-wrapper">
          <h2
            className="text-heading1 span-inner-red w-1/3 lg:w-full"
            dangerouslySetInnerHTML={{
              __html: cleanHTML(copy.claim_steps.title),
            }}
          ></h2>
          <Guarantee__Steps lang={lang} dictionary={dictionary} />
        </div>
      </section>
      <section className="relative  outer-wrapper bg-black text-app-white !py-32">
        <div className="inner-wrapper">
          <div className="flex flex-col lg:flex-row gap-10 items-start pb-20 border-b border-app-gray">
            <div className="w-full lg:w-1/2">
              <h2
                className="text-heading1 span-inner-red"
                dangerouslySetInnerHTML={{
                  __html: cleanHTML(copy.authorization.title),
                }}
              ></h2>
            </div>
            <div className="w-full lg:w-1/2">
              <div
                className="max-w-[460px]"
                dangerouslySetInnerHTML={{
                  __html: cleanHTML(copy.authorization.description),
                }}
              ></div>
            </div>
          </div>
          <Guarantee__ClaimForm lang={lang} dictionary={dictionary} />
        </div>
      </section>
      <FooterNew className="bg-app-black" />
    </>
  );
}
