import supabaseClient from "@/supabase/client";
import { ParamsLang } from "../types-general";
import CertificateRender from "@/components/app/certificate-render";
import { BlueScopeCertifications } from "../home/certifications";
import { getPageDictionary } from "../dictionaries";
import { AboutUsDictionary, HomeDictionary } from "@/types/dictionary";

async function getCertificatesData() {
  return (
    await supabaseClient
      .from("certificates")
      .select()
      .order("order", { ascending: true })
  ).data;
}

export default async function AboutUs__Certificates({ lang }: ParamsLang) {
  const _lang = lang || "en";
  const certificates = await getCertificatesData();
  const home = (await getPageDictionary(_lang, "home")) as HomeDictionary;
  const { superior } = (await getPageDictionary(
    _lang,
    "about"
  )) as AboutUsDictionary;
  return (
    <section className="outer-wrapper-x py-12 lg:py-24 bg-app-black text-app-white relative">
      <div className="inner-wrapper">
        <h2 className="text-heading1 text-primary">1. {superior.title}</h2>
        <p className="mt-10 text-body max-w-[572px]">{superior.description}</p>
        <div className="mt-14 text-caption">{superior.cta}</div>
        <div className="mt-6">
          <CertificateRender lang={_lang} certificates={certificates} />
        </div>
        <div className="mt-20">
          <BlueScopeCertifications
            description={home.certifications.blueScopeDescription}
            shapy
          />
        </div>
      </div>
    </section>
  );
}
