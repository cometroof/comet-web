import { Metadata } from "next";
import ProjectPage__List from "./list";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: "en" | "id" }>;
}): Promise<Metadata> {
  const { lang = "en" } = await params;
  let title = `Projects - COMET - PT. Comtech Metalindo Terpadu`;
  let description = `Explore our projects to see the quality of metal COMET. Suitable for all needs like home or commercial buildings.`;
  if (lang === "id") {
    title = `Proyek - COMET - PT. Comtech Metalindo Terpadu`;
    description = `Jelajahi proyek kami untuk melihat kualitas genteng metal modern COMET. Cocok untuk aneka macam kebutuhan seperti rumah atau bangunan komersil.`;
  }
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
  };
}

export default function Projects() {
  return <ProjectPage__List />;
}
