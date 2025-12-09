import BrandButton from "@/components/app/brand-button";
import { Download } from "lucide-react";
import { ParamsLang } from "../types-general";
import { getPageDictionary } from "../dictionaries";
import { AboutUsDictionary } from "@/types/dictionary";
import { cleanHTML } from "../utils/utils";
import supabaseClient from "@/supabase/client";
import Link from "next/link";

export async function getCompanyProfile() {
  return (
    await supabaseClient
      .from("company_profile")
      .select()
      .eq("type", "company_profile")
      .order("uploaded_at", { ascending: true })
      .single()
  ).data;
}

export default async function AboutUsPage__Cover({ lang }: ParamsLang) {
  const _lang = lang || "en";
  const { cover } = (await getPageDictionary(
    _lang,
    "about",
  )) as AboutUsDictionary;
  const companyProfile = await getCompanyProfile();
  return (
    <section className="outer-wrapper-x bg-app-light-gray py-[64px] lg:py-[106px]">
      <div className="inner-wrapper  flex flex-col lg:flex-row gap-10 lg:gap-20 lg:justify-between items-start">
        <div className="w-full">
          <h2 className="text-caption">{cover.title}</h2>
          <div
            className="mt-4 text-heading1 span-inner-red"
            dangerouslySetInnerHTML={{ __html: cleanHTML(cover.description) }}
          ></div>
        </div>
        <div className="w-full">
          <p
            className="text-body lg:mt-10"
            dangerouslySetInnerHTML={{ __html: cleanHTML(cover.letter) }}
          ></p>
          {companyProfile?.file_url && (
            <Link href={companyProfile.file_url} target="_blank">
              <BrandButton className="mt-10 lg:mt-16 btn-fill">
                <Download className="size-5" />
                <span>{cover.cta}</span>
              </BrandButton>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
