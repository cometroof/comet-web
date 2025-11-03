import Icon__BlueScope from "@/components/assets/blue-scope";
import { ParamsLang } from "../types-general";
import { getPageDictionary } from "../dictionaries";
import supabaseClient from "@/supabase/client";
import CertificateRender from "@/components/app/certificate-render";

async function getCertificatesData() {
  return (
    await supabaseClient
      .from("certificates")
      .select()
      .order("order", { ascending: true })
  ).data;
}

export const revalidate = 300;

export function BlueScopeCertifications({
  description,
  shapy = false,
}: {
  description: string;
  shapy?: boolean;
}) {
  return (
    <div
      className={`outer-wrapper bg-[#264FA1] text-background sticky top-header ${shapy ? "!p-0 lg:rounded-l-full rounded-l-none" : "min-h-[298px]"} flex flex-col justify-center`}
    >
      <div
        className={`inner-wrapper ${shapy ? "p-6 lg:p-0" : "p-6 md:p-0"} flex flex-col md:flex-row gap-14 items-center`}
      >
        <div>
          <Icon__BlueScope />
        </div>
        <div
          className={`flex-1 font-exo-2 leading-8 text-[18px] ${shapy ? "text-body max-w-[65%]" : "md:text-[22px] max-w-[875px]"}`}
          dangerouslySetInnerHTML={{
            __html: description,
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
      />
      <div className="outer-wrapper-x bg-app-black text-background relative">
        <div className="inner-wrapper pt-20 pb-28">
          <h2
            className="lg:w-3/5 max-w-[586px]  text-heading1 span-inner-red"
            dangerouslySetInnerHTML={{ __html: home.certifications.opening }}
          ></h2>

          <div className="mt-16 text-caption">{home.certifications.cta}</div>

          <div className="mt-6">
            <CertificateRender lang={_lang} certificates={dataCertificates} />
          </div>

          {/*<div className="mt-6">
            {certificates.map((certificate, index) => {
              return (
                <Link
                  key={index}
                  href={certificate.link}
                  target="_blank"
                  className="py-4 border-b border-b-app-light-gray  flex flex-col lg:flex-row gap-4 lg:gap-20  group hover:bg-white/10"
                >
                  <div className="hidden lg:w-1/5 text-app-red lg:flex items-center overflow-x-hidden">
                    <Icon__LongArrow className="transition-all -translate-x-[25%] group-hover:translate-x-0" />
                  </div>
                  <div className="lg:w-2/5 flex items-center gap-4">
                    <div className="size-10 relative">
                      <img
                        src={certificate.icon}
                        alt={certificate.title}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="text-app-white flex-1">
                      <div className="text-subheading">{certificate.title}</div>
                      <div
                        className={`text-subheading ${certificate.isRedInfo ? "text-app-red" : ""}`}
                      >
                        {certificate.info}
                      </div>
                    </div>
                  </div>
                  <div
                    className="lg:w-2/5 flex flex-col justify-end text-body"
                    dangerouslySetInnerHTML={{
                      __html: certificate.description,
                    }}
                  ></div>
                </Link>
              );
            })}
          </div>*/}
        </div>
      </div>
    </>
  );
}
