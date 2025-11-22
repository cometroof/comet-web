import BrandButton from "@/components/app/brand-button";
import { Download } from "lucide-react";
import { ParamsLang } from "../types-general";

export default function ProductPage__DiscoverProduct({ lang }: ParamsLang) {
  const desc =
    lang === "id"
      ? "Temukan <span>rangkaian lengkap</span> produk atap metal kami, masing-masing dirancang untuk menyeimbangkan daya tahan, fungsi, dan estetika untuk setiap jenis proyek."
      : "Discover our <span>full range of metal roofing products</span>, each designed to balance durability, function, and style for every type of project.";
  const btn = lang === "id" ? "KATALOG" : "CATALOGUE";
  return (
    <section className="outer-wrapper-x  bg-app-black text-background relative py-[112px]">
      <div className="inner-wrapper">
        <div
          className="text-heading1 span-inner-red max-w-[594px]"
          dangerouslySetInnerHTML={{ __html: desc }}
        ></div>
        <div className="mt-16">
          <BrandButton>
            <Download className="size-4 mr-2" />
            <span>{btn}</span>
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
