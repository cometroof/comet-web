import supabaseClient from "@/supabase/client";
import { ParamsLang } from "../types-general";
import Image from "next/image";

const getCertificatesData = async () => {
  return (
    await supabaseClient
      .from("certificates")
      .select()
      .order("order", { ascending: true })
  ).data;
};

export default async function ProductPage__Certificates({ lang }: ParamsLang) {
  const data = await getCertificatesData();

  return (
    <section className="relative bg-primary text-background pt-[65px] pb-[84px]  outer-wrapper">
      <div className="inner-wrapper">
        <div className="w-full overflow-x-auto hide-scrollbar">
          <div className="flex w-fit md:w-full justify-center md:justify-between gap-5 md:gap-10">
            {data?.map((cert) => {
              let nameDisplay = cert.label_name || cert.name;
              if (lang === "id")
                nameDisplay =
                  cert.label_name_id ||
                  cert.name_id ||
                  cert.label_name ||
                  cert.name;
              return (
                <div
                  key={cert.id}
                  className="w-[84px] flex flex-col items-center justify-start text-center"
                >
                  <div
                    className="size-10 relative text-white"
                    style={{ filter: "brightness(0) invert(1)" }}
                  >
                    <Image
                      width={400}
                      height={400}
                      alt={cert.name}
                      src={cert.image!}
                    />
                  </div>
                  {(cert.label_name || cert.name) && (
                    <div className="text-sm font-exo-2">{nameDisplay}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
