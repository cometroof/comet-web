import supabaseClient from "@/supabase/client";
import Image from "next/image";
import Link from "next/link";

const getData = async () =>
  (
    await supabaseClient
      .from("projects")
      .select(
        `
        *,
        project_categories(name,slug),
        project_images(image_url,is_highlight)
      `,
      )
      .order("order", { ascending: true })
  ).data;

export const revalidate = 60 * 5;

export default async function ProjectPage__List() {
  const data = await getData();
  return (
    <div className="grid grid-cols-2 gap-8">
      {data?.map((d) => (
        <Link href={`/project/${d.slug!}`} key={d.id} className="group">
          <div className="aspect-[4/3] relative w-full overflow-hidden">
            <Image
              width={100}
              height={100}
              className="size-full object-cover transition-all group-hover:scale-150 group-hover:border group-hover:border-red-500"
              alt={d.name}
              src={
                (
                  d.project_images.find((im) => im.is_highlight) ||
                  d.project_images[0]
                )?.image_url
              }
              unoptimized
            />
          </div>
          <div className="text-subheading mt-3 group-hover:text-primary">
            {d.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
