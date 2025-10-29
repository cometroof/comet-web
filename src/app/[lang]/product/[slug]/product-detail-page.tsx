import { Database } from "@/supabase/supabase";
import { ParamsLang } from "../../types-general";
import Link from "next/link";
import BrandButton from "@/components/app/brand-button";
import { Download } from "lucide-react";
import FooterNew from "@/components/app/footer";

interface Props extends ParamsLang {
  data: Partial<Database["public"]["Tables"]["product"]["Row"]>;
}

export default function ProductDetailPage({ lang, data }: Props) {
  let desc = data.description_en;
  if (lang === "id" && data.description_id) desc = data.description_id;
  return (
    <>
      <h1 className="hidden">Cometroof - {data.name}</h1>
      <section className="bg-app-white outer-wrapper">
        <div className="inner-wrapper">
          <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-20">
            <div className="w-1/4 min-h-0 flex flex-col justify-between">
              <div className="w-[220px] h-auto relative">
                {data.brand_image && (
                  <img
                    alt={data.name}
                    src={data.brand_image}
                    className="size-full object-contain"
                  />
                )}
              </div>
              <Link
                href="/product"
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
                  <path
                    d="M11 0L6.57605e-07 7.47788L11 15L11 0Z"
                    fill="#ED1C24"
                  />
                </svg>
                <div>BACK TO ALL PRODUCTS</div>
              </Link>
            </div>
            <div className="w-3/4">
              <h2 className="text-heading1">{data.title}</h2>
              <div className="mt-8 text-body">{desc}</div>
              <div className="mt-11">
                {data.catalogue && (
                  <Link
                    href={data.catalogue}
                    aria-label={`Visit catalogue ${data.name} product`}
                  >
                    <BrandButton className="flex items-center">
                      <Download className="size-4 mr-1" /> CATALOGUE
                    </BrandButton>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterNew className="bg-app-white" />
    </>
  );
}
