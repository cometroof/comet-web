import FooterNew from "@/components/app/footer";
import ProjectPage__Category from "./category";
import { ReactNode } from "react";

export default function ProjectPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <section className="bg-app-black text-app-white min-h-[360px] outer-wrapper !py-32">
        <div className="inner-wrapper">
          <h2 className="text-caption">PROJECT</h2>
          <div className="text-heading1 span-inner-red max-w-[674px] mt-6">
            Explore Comet&apos;s <span>diverse range of projects</span> that
            highlight our expertise in elevating buildings with lasting quality,
            functionality, and style.
          </div>
        </div>
      </section>
      <section className="outer-wrapper">
        <div className="flex flex-col lg:flex-row gap-10 inner-wrapper">
          <div className="lg:w-1/4 py-12 lg:py-32">
            <ProjectPage__Category />
          </div>
          <div className="lg:w-3/4 lg:border-l border-l-app-light-gray lg:pl-32 py-12 lg:py-32">
            {children}
          </div>
        </div>
      </section>
      <FooterNew />
    </>
  );
}
