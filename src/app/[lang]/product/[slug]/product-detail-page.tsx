import { Database } from "@/supabase/supabase";
import { ParamsLang } from "../../types-general";
import Link from "next/link";
import BrandButton from "@/components/app/brand-button";
import { Download } from "lucide-react";
import FooterNew from "@/components/app/footer";
import { getPageDictionary } from "../../dictionaries";
import { ProductDetailDictionary } from "@/types/dictionary";

type Product = Database["public"]["Tables"]["product"]["Row"];
type ProductProfile = Database["public"]["Tables"]["product_profile"]["Row"];
type ProductCategory = Database["public"]["Tables"]["product_category"]["Row"];
type ProductItem = Database["public"]["Tables"]["product_item"]["Row"];

export type ProductData = Product & {
  product_profile: (ProductProfile & {
    product_category?: ProductCategory[];
  })[];
};

export type ProductDataWithItems = Product & {
  product_category?: ProductCategory[];
  product_profile?: ProductProfile[];
  product_item?: ProductItem[];
};

interface ProductFetch extends Product {
  product_profile: Partial<ProductProfile>[];
}

interface Props extends ParamsLang {
  data: ProductDataWithItems;
}

export default async function ProductDetailPage({ lang, data }: Props) {
  const copy = (await getPageDictionary(
    lang,
    "product-detail",
  )) as ProductDetailDictionary;
  let desc = data.description_en;
  if (lang === "id" && data.description_id) desc = data.description_id;
  const suitables = data.suitables as string[];
  return (
    <>
      <h1 className="hidden">Cometroof - {data.name}</h1>
      <section className="bg-app-white outer-wrapper">
        <div className="inner-wrapper">
          {/*TOP AREA*/}
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
              <div className="mt-8 text-body max-w-[572px]">{desc}</div>
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

          {/*SUITABLES*/}
          {suitables && suitables.length > 0 && (
            <div className="border-t border-t-app-gray pt-5 pb-16 mt-16">
              <div className="text-caption">{copy.suitables_title}:</div>
              <div className="mt-8 overflow-x-auto hide-scrollbar">
                <div className="w-fit flex gap-8 md:gap-14">
                  {suitables.map((s, n) => (
                    <div key={n} className="w-[250px]">
                      <div className="text-primary text-subheading">
                        {String(n + 1).padStart(2, "0")}
                      </div>
                      <div className="w-[213px] mt-2">{s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <FooterNew className="bg-app-white" />
    </>
  );
}
