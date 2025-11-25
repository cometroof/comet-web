import Homepage__SectionHead from "./_section-head";
import { ParamsLang } from "../types-general";
import Image from "next/image";
import Icon__LongArrow from "../../../components/assets/long-arrow";
import supabaseClient from "@/supabase/client";
import { getPageDictionary } from "../dictionaries";
import { HomeDictionary } from "@/types/dictionary";
import { Database } from "@/supabase/supabase";
import { ImageIcon } from "lucide-react";
import { LangLink } from "@/components/app/lang-link";

const getProjectData = async (limit: number) => {
  return (
    await supabaseClient
      .from("project_categories")
      .select()
      .is("deleted_at", null)
      .order("order", { ascending: true })
      .limit(limit)
  ).data;
};

type TProject = Partial<
  Database["public"]["Tables"]["project_categories"]["Row"]
>;

const ProjectItem = ({
  lang,
  ..._p
}: TProject & { lang: ParamsLang["lang"] }) => {
  const displayName = lang === "id" && _p.name_id ? _p.name_id : _p.name;
  const fols = (
    <>
      <div className="w-full flex-1 relative overflow-hidden">
        {_p.thumbnail ? (
          <Image
            src={_p.thumbnail}
            alt={`Image ${_p.name}`}
            className="block size-full object-cover transition-all group-hover:scale-110"
            fill
            unoptimized
          />
        ) : (
          <div className="size-full object-cover bg-gray-100 flex items-center justify-center">
            <ImageIcon className="size-20" strokeWidth={1.25} />
          </div>
        )}
      </div>
      <div className="bg-app-black text-app-white flex justify-between gap-4 py-3 px-5 pr-7">
        <div className="flex flex-col">
          {displayName && (
            <div className="uppercase text-subheading">{displayName}</div>
          )}
        </div>
        <div className="text-app-white hidden lg:block">
          <Icon__LongArrow className="transition-all group-hover:translate-x-[25%]" />
        </div>
      </div>
    </>
  );
  if (_p.slug)
    return (
      <LangLink
        href={`/project/category/${_p.slug}`}
        title={_p.name}
        className="aspect-square relative flex flex-col group"
      >
        {fols}
      </LangLink>
    );
  return (
    <div className="aspect-square relative flex flex-col group">{fols}</div>
  );
};

export default async function Homepage__Projects({ lang }: ParamsLang) {
  const projectData = await getProjectData(6);
  const _lang = lang || "en";

  const home = (await getPageDictionary(_lang, "home")) as HomeDictionary;

  return (
    <section className="outer-wrapper bg-white relative text-app-gray">
      {/* <div className="inner-wrapper py-32"> */}
      <div className="inner-wrapper py-28">
        <Homepage__SectionHead
          title={home.project.title}
          description={home.project.description}
          closerText={home.project.noteText}
          link="/project"
          linkText={home.project.cta}
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14">
          {projectData?.map((item, index) => (
            <ProjectItem key={index} {...item} lang={_lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
