import Link from "next/link";
import Homepage__SectionHead from "./_section-head";
import { ParamsLang } from "../types-general";
import Image from "next/image";
import Icon__LongArrow from "../../../components/assets/long-arrow";
import supabaseClient from "@/supabase/client";

export const revalidate = process.env.REVALIDATION!;

const getProjectData = async (limit: number) => {
  return (
    await supabaseClient
      .from("projects")
      .select("*,project_images(*),project_categories(*)")
      .order("order", { ascending: true })
      .limit(limit)
  ).data;
};

interface IProject {
  name: string;
  link: string;
  image: string;
  description?: string;
}

const ProjectItem = (_p: IProject) => {
  return (
    <Link
      href={_p.link}
      title={_p.name}
      className="aspect-square relative flex flex-col group"
    >
      <div className="w-full flex-1 relative overflow-hidden">
        <Image
          src={_p.image}
          alt={`Image ${_p.name}`}
          className="size-full object-cover  transition-all group-hover:scale-110"
          fill
          unoptimized
        />
      </div>
      <div className="bg-app-black text-app-white flex justify-between gap-4 py-3 px-5 pr-7">
        <div className="uppercase text-subheading">{_p.name}</div>
        <div className="text-app-white hidden lg:block">
          <Icon__LongArrow className="transition-all group-hover:translate-x-[25%]" />
        </div>
      </div>
    </Link>
  );
};

export default async function Homepage__Projects({ lang }: ParamsLang) {
  const projectData = await getProjectData(6);

  // Map Supabase data to IProject format or use empty array if no data
  const projects =
    projectData?.map((project) => {
      // Find highlighted image or use the first image
      const primaryImage =
        project.project_images.find((img) => img.is_highlight)?.image_url ||
        project.project_images[0]?.image_url ||
        "https://placehold.co/600x400/ED1C24/FFFFFF?text=Project";

      return {
        name: project.name,
        link: `/project/${project.slug || ""}`,
        image: primaryImage,
      };
    }) || [];

  return (
    <section className="outer-wrapper bg-white  relative text-app-gray">
      <div className="inner-wrapper py-32">
        <Homepage__SectionHead
          title={`See how our products are installed and <span>showcase both beauty and performance</span> in real-world applications.`}
          description="Designed for lasting value, our roofs combine advanced materials with precision engineering. Whether for residential, commercial, or industrial projects, they deliver dependable protection while enhancing the overall look of the building."
          closerText={`OUR NOTABLE RANGE OF PROJECTS:`}
          link="/projects"
          linkText="ALL PROJECTS"
        />
        <div className="mt-12  grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14">
          {projects.map((item, index) => (
            <ProjectItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
