import Link from "next/link";
import Homepage__SectionHead from "./home/_section-head";
import { ParamsLang } from "./types-general";
import Image from "next/image";
import Icon__LongArrow from "./long-arrow";

interface IProject {
  name: string;
  link: string;
  image: string;
  description?: string;
}

const projects: IProject[] = [
  {
    name: "Residential",
    link: "/projects/residential",
    image: "https://placehold.co/600x400/ED1C24/FFFFFF?text=Project+A",
    description: "Residential building and housing projects.",
  },
  {
    name: "Private Residential",
    link: "/projects/private-residential",
    image: "https://placehold.co/600x400/1B75BC/FFFFFF?text=Project+B",
    description: "Exclusive private housing and residential developments.",
  },
  {
    name: "Government",
    link: "/projects/government",
    image: "https://placehold.co/600x400/39B54A/FFFFFF?text=Project+C",
    description: "Infrastructure and facilities built for government purposes.",
  },
  {
    name: "Hotel & Villa",
    link: "/projects/hotel-villa",
    image: "https://placehold.co/600x400/F7941D/FFFFFF?text=Project+D",
    description: "Hospitality projects including hotels, resorts, and villas.",
  },
  {
    name: "Warehouse & Commercial",
    link: "/projects/warehouse-commercial",
    image: "https://placehold.co/600x400/662D91/FFFFFF?text=Project+E",
    description: "Industrial warehouses and commercial facilities.",
  },
  {
    name: "Public Buildings",
    link: "/projects/public-buildings",
    image: "https://placehold.co/600x400/00A99D/FFFFFF?text=Project+F",
    description:
      "Public facilities including schools, hospitals, and community centers.",
  },
];

const ProjectItem = (_p: IProject) => {
  return (
    <Link href={_p.link} className="aspect-square relative flex flex-col group">
      <div className="w-full flex-1 relative overflow-hidden">
        <Image
          src={_p.image}
          alt={_p.name}
          className="size-full object-cover  transition-all group-hover:scale-110"
          fill
          unoptimized
        />
      </div>
      <div className="bg-app-black text-app-white flex justify-between gap-4 py-3 px-5 pr-7">
        <div className="uppercase text-subheading">{_p.name}</div>
        <div className="text-app-white">
          <Icon__LongArrow className="transition-all group-hover:translate-x-[25%]" />
        </div>
      </div>
    </Link>
  );
};

export default function Homepage__Projects({ lang }: ParamsLang) {
  return (
    <section className="outer-wrapper bg-white  relative text-app-gray">
      <div className="inner-wrapper py-32">
        <Homepage__SectionHead
          title={`See how our products are installed and <span>showcase both beauty and performance</span> in real-world applications.`}
          description="Designed for lasting value, our roofs combine advanced materials with precision engineering. Whether for residential, commercial, or industrial projects, they deliver dependable protection while enhancing the overall look of the building."
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
