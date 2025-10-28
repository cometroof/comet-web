import BrandButton from "@/components/app/brand-button";
import { Download } from "lucide-react";
import { ParamsLang } from "../types-general";

export default function ProductPage__DiscoverProduct({ lang }: ParamsLang) {
  return (
    <section className="outer-wrapper-x  bg-app-black text-background relative py-[112px]">
      <div className="inner-wrapper">
        <div className="text-heading1 span-inner-red max-w-[594px]">
          Discover our <span>full range of metal roofing products</span>, each
          designed to balance durability, function, and style for every type of
          project.
        </div>
        <div className="mt-16">
          <BrandButton>
            <Download className="size-4 mr-2" />
            <span>CATALOGUE</span>
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
