import Icon__BlueScope from "@/components/assets/blue-scope";
import { ParamsLang } from "../types-general";
import { getPageDictionary } from "../dictionaries";
import supabaseClient from "@/supabase/client";
import CertificateRender from "@/components/app/certificate-render";
import { cleanHTML } from "../utils/utils";

async function getCertificatesData() {
  return (
    await supabaseClient
      .from("certificates")
      .select()
      .order("order", { ascending: true })
  ).data;
}

export function BlueScopeCertifications({
  description,
  shapy = false,
  layouted,
}: {
  description: string;
  shapy?: boolean;
  layouted?: boolean;
}) {
  return layouted ? (
    <div
      className={`outer-wrapper bg-[#264FA1] text-background ${
        shapy ? "!p-0 lg:rounded-l-full rounded-l-none" : "min-h-[298px]"
      } flex flex-col justify-center`}
    >
      <div
        className={`inner-wrapper ${
          shapy ? "p-6 lg:p-0" : "p-6 md:p-0"
        } flex flex-col md:flex-row gap-14 items-center`}
      >
        <div className="mr-auto">
          <Icon__BlueScope />
        </div>
        <div
          className={`flex-1 font-exo-2 leading-8 text-[18px] ${
            shapy ? "text-body lg:max-w-[65%]" : "md:text-[22px] max-w-[875px]"
          }`}
          dangerouslySetInnerHTML={{
            __html: cleanHTML(description),
          }}
        ></div>
      </div>
    </div>
  ) : (
    <div
      className={`outer-wrapper bg-[#264FA1] text-background ${
        shapy ? "!p-0 lg:rounded-l-full rounded-l-none" : "min-h-[298px]"
      } flex flex-col justify-center  mt-24 lg:mt-0`}
    >
      <div
        className={`inner-wrapper ${
          shapy ? "p-6 lg:p-0" : "p-6 md:p-0"
        } flex flex-col md:flex-row gap-14 items-center`}
      >
        <div className="absolute left-[50%] top-0 -translate-x-[50%] -translate-y-[50%] [&>svg]:w-[120px] [&>svg]:h-[120px]  lg:static lg:left-auto lg:top-auto lg:translate-x-0 lg:translate-y-0">
          <Icon__BlueScope />
        </div>
        <div
          className={`flex-1 font-exo-2 leading-8 text-[18px] pt-16 lg:pt-0  ${
            shapy ? "text-body lg:max-w-[65%]" : "md:text-[22px] max-w-[875px]"
          }`}
          dangerouslySetInnerHTML={{
            __html: cleanHTML(description),
          }}
        ></div>
      </div>
    </div>
  );
}

export default async function Homepage__Certifications({ lang }: ParamsLang) {
  const _lang = lang || "en";
  /* eslint-disable-next-line */
  const home = (await getPageDictionary(_lang, "home")) as any;
  const dataCertificates = await getCertificatesData();
  return (
    <>
      <BlueScopeCertifications
        description={home.certifications.blueScopeDescription}
        layouted
      />
      <div className="outer-wrapper-x bg-app-black text-background relative">
        <div className="inner-wrapper pt-20 pb-28">
          <h2
            className="lg:w-3/5 max-w-[586px]  text-heading1 span-inner-red"
            dangerouslySetInnerHTML={{
              __html: cleanHTML(home.certifications.opening),
            }}
          ></h2>

          <div className="mt-16 text-caption">{home.certifications.cta}</div>

          <div className="mt-6">
            <CertificateRender lang={_lang} certificates={dataCertificates} />
          </div>
        </div>
      </div>
    </>
  );
}
