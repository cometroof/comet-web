import Icon__BlueScope from "@/components/assets/blue-scope";
import { ParamsLang } from "../types-general";
import { getPageDictionary } from "../dictionaries";
import Link from "next/link";
import Icon__LongArrow from "../../../components/assets/long-arrow";

const certificates = [
  {
    title: "Corrosion Resistance",
    description: "Salt Spray Test – 1000 Hours\nCertificate No.: 4-07-20-00105",
    info: "Certified by B4T",
    isRedInfo: true,
    icon: "https://placehold.co/40x40/ED1C24/ED1C24",
    link: "/certificates/corrosion-resistance.pdf",
  },
  {
    title: "Color Durability",
    description: "Certificate No.: 4-09-20-00172",
    info: "Certified by B4T",
    isRedInfo: true,
    icon: "https://placehold.co/40x40/ED1C24/ED1C24",
    link: "/certificates/color-durability.pdf",
  },
  {
    title: "Accelerated Weather Resistance using QUV Test",
    description:
      "Q-UV Accelerated Weathering Test – 2000 Hours\nCertificate No.: 4-09-21-00566",
    info: "Certified by B4T",
    isRedInfo: true,
    icon: "https://placehold.co/40x40/ED1C24/ED1C24",
    link: "/certificates/accelerated-weather-resistance.pdf",
  },
  {
    title: "Adhesive Strength",
    description: "Certificate No.: 4-09-20-00170",
    info: "Certified by B4T",
    isRedInfo: true,
    icon: "https://placehold.co/40x40/ED1C24/ED1C24",
    link: "/certificates/adhesive-strength.pdf",
  },
  {
    title: "Sand Coating Quality",
    description:
      "Compliant with SNI 03-4255-1996 –\nCertificate No.: 53271/FNBPA0",
    info: "Certified by Sucofindo",
    isRedInfo: true,
    icon: "https://placehold.co/40x40/ED1C24/ED1C24",
    link: "/certificates/sand-coating-quality.pdf",
  },
  {
    title: "Tested for Sound Reduction",
    description: "Helping to reduce noise from rain and external impact",
    info: "Performance",
    isRedInfo: false,
    icon: "https://placehold.co/40x40/ED1C24/ED1C24",
    link: "/certificates/sound-reduction.pdf",
  },
  {
    title: "Certified for TKDN",
    description:
      "Issued by the Ministry of Industry of the Republic of Indonesia",
    info: "(Local Content Requirement)",
    isRedInfo: false,
    icon: "https://placehold.co/40x40/ED1C24/ED1C24",
    link: "/certificates/tkdn.pdf",
  },
];

export function BlueScopeCertifications({
  description,
}: {
  description: string;
}) {
  return (
    <div className="outer-wrapper bg-[#264FA1] text-background sticky top-header min-h-[298px] flex flex-col justify-center">
      <div className="inner-wrapper flex flex-col lg:flex-row gap-14 items-center">
        <div>
          <Icon__BlueScope />
        </div>
        <div
          className="flex-1 max-w-[875px] font-exo-2 text-[22px]"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        ></div>
      </div>
    </div>
  );
}

export default async function Homepage__Certifications({ lang }: ParamsLang) {
  /* eslint-disable-next-line */
  const home = (await getPageDictionary(lang || "en", "home")) as any;
  return (
    <>
      <BlueScopeCertifications
        description={home.certifications.blueScopeDescription}
      />
      <div className="outer-wrapper-x bg-app-black text-background relative">
        <div className="inner-wrapper pt-20 pb-28">
          <div className="lg:w-3/5 max-w-[586px]">
            <h2
              className="text-heading1 span-inner-red"
              dangerouslySetInnerHTML={{ __html: home.certifications.opening }}
            ></h2>
            <div className="mt-16 text-caption">{home.certifications.cta}</div>
          </div>

          <div className="mt-6">
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
          </div>
        </div>
      </div>
    </>
  );
}
