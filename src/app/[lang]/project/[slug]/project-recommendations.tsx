import supabaseClient from "@/supabase/client";
import { ParamsLang } from "../../types-general";
import { Database } from "@/supabase/supabase";
import { LangLink } from "@/components/app/lang-link";

type TProject = Partial<Database["public"]["Tables"]["projects"]["Row"]>;
type TProjectWithRelations = TProject & {
  project_images?: Partial<
    Database["public"]["Tables"]["project_images"]["Row"]
  >[];
};

interface Props extends ParamsLang {
  project?: TProjectWithRelations | null;
}

async function getProjectRecommendations(currentId: string) {
  return (
    await supabaseClient
      .from("projects")
      .select("*,project_images(*)")
      .neq("id", currentId)
      .limit(4)
  ).data;
}

export default async function ProjectRecommendation({ lang, project }: Props) {
  if (!project || !project.id) return null;
  const data = await getProjectRecommendations(project.id);
  return (
    <section className="bg-app-light-gray outer-wrapper">
      <div className="inner-wrapper">
        <h2 className="text-heading2">Check out other project</h2>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {data?.map((project) => (
            <LangLink
              key={project.id}
              href={`/project/${project.slug}`}
              className="block w-full spacey-2.5"
            >
              <div className="w-full aspect-[4/2.6] relative">
                <img
                  className="size-full object-cover"
                  alt={`Project ${project.name} image`}
                  src={project.project_images[0].image_url}
                />
              </div>
              <div className="mt-2.5">
                <h3 className="text-subheading">{project.name}</h3>
              </div>
            </LangLink>
          ))}
        </div>
      </div>
    </section>
  );
}
