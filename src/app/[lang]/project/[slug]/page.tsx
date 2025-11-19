import type { Metadata } from "next";
import supabaseClient from "@/supabase/client";
import FooterNew from "@/app/footer";
import { ParamsLang } from "../../types-general";
import { getPageDictionary } from "../../dictionaries";
import { ProjectDetailDictionary } from "@/types/dictionary";
import ProjectImageSlider from "./image-slider";
import ProjectRecommendation from "./project-recommendations";
import { LangLink } from "@/components/app/lang-link";

const getProject = async (slug: string) =>
  (
    await supabaseClient
      .from("projects")
      .select(
        "*,project_categories(name),project_images(image_url,is_highlight)"
      )
      .eq("slug", slug)
      .single()
  ).data;

export async function generateStaticParams() {
  const { data } = await supabaseClient
    .from("projects")
    .select("slug")
    .order("order");
  return data?.map((p) => p.slug) ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabaseClient
    .from("projects")
    .select("name,roof_type")
    .eq("slug", slug)
    .single();
  if (data) {
    return {
      title: `${data.name} ${data.roof_type} - COMET - PT. Comtech Metalindo Terpadu`,
    };
  }
  return {
    title: "COMET - PT. Comtech Metalindo Terpadu",
  };
}

export const revalidate = 300;

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string; lang: ParamsLang["lang"] }>;
}) {
  const { slug, lang } = await params;
  const _lang = lang || "en";

  const project = await getProject(slug);

  const text = (await getPageDictionary(
    _lang,
    "project"
  )) as ProjectDetailDictionary;

  return (
    <>
      <section className="outer-wrapper">
        <div className="inner-wrapper">
          <h1 className="hidden">Comet Roof Project</h1>
          <h2 className="text-heading1">{project?.name}</h2>
          <div className="lg:w-1/2  mt-8 gap-8 flex flex-row items-start">
            <div className="lg:w-1/2 text-caption">
              <h3 className="text-subheading">{text.detail.location}</h3>
              {project?.location_link ? (
                <div className="mt-2">
                  <LangLink
                    href={project.location_link}
                    aria-label={`Visit project ${project.name} location`}
                    className="text-caption"
                  >
                    {project.location_text}
                  </LangLink>
                </div>
              ) : (
                <p className="text-caption mt-2">{project?.location_text}</p>
              )}
            </div>
            <div className="lg:w-1/2 text-caption">
              <h3 className="text-subheading">{text.detail.roofType}</h3>
              <div className="mt-2">{project?.roof_type}</div>
            </div>
          </div>
        </div>
      </section>
      <section className="outer-wrapper !pt-0">
        <div className="inner-wrapper">
          <ProjectImageSlider project={project} lang={_lang} />
        </div>
        <div className="inner-wrapper py-[60px]">
          <LangLink
            href="/project"
            className="text-primary font-semibold font-exo-2 text-sm flex items-center gap-3 w-fit group"
          >
            <svg
              width="11"
              height="15"
              viewBox="0 0 11 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-all group-hover:-translate-x-5"
            >
              <path d="M11 0L6.57605e-07 7.47788L11 15L11 0Z" fill="#ED1C24" />
            </svg>
            <div>{text.detail.backToAll}</div>
          </LangLink>
        </div>
      </section>
      <ProjectRecommendation lang={_lang} project={project} />
      <FooterNew className="bg-app-light-gray" />
    </>
  );
}
