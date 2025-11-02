import { ParamsLang } from "@/app/[lang]/types-general";
import { Database } from "@/supabase/supabase";
import Link from "next/link";
import Icon__LongArrow from "../assets/long-arrow";

type TCertificate = Partial<
  Database["public"]["Tables"]["certificates"]["Row"]
>;

interface Props {
  lang: ParamsLang["lang"];
  certificates: TCertificate[] | null;
}

export default function CertificateRender({ certificates, lang }: Props) {
  return (
    <>
      {certificates?.map((cert) => {
        let desc = `${cert.description_en}`;
        if (lang === "id" && cert.description_id)
          desc = `${cert.description_id}`;
        const render = (
          <>
            <div className="hidden lg:w-1/5 text-app-red lg:flex items-center overflow-x-hidden">
              <Icon__LongArrow className="transition-all -translate-x-[25%] group-hover:translate-x-0" />
            </div>
            <div className="lg:w-2/5 flex items-center gap-4">
              {cert.image && (
                <div className="size-10 relative">
                  <img
                    src={cert.image}
                    alt={`Certificate of ${cert.name}`}
                    className="size-full object-cover"
                  />
                </div>
              )}
              <div className="text-app-white flex-1">
                <div className="text-subheading">{cert.name}</div>
                <div
                  className={`text-subheading ${cert.is_important_info ? "text-app-red" : ""}`}
                >
                  {cert.info}
                </div>
              </div>
            </div>
            <div
              className="lg:w-2/5 flex flex-col justify-end text-body"
              dangerouslySetInnerHTML={{
                __html: desc,
              }}
            ></div>
          </>
        );
        return cert.file_url ? (
          <Link
            key={cert.id}
            href={`${cert.file_url}`}
            target="_blank"
            className="py-4 border-b border-b-app-light-gray  flex flex-col lg:flex-row gap-4 lg:gap-20  group hover:bg-white/10"
          >
            {render}
          </Link>
        ) : (
          <div
            key={cert.id}
            className="py-4 border-b border-b-app-light-gray  flex flex-col lg:flex-row gap-4 lg:gap-20  group hover:bg-white/10"
          >
            {render}
          </div>
        );
      })}
    </>
  );
}
