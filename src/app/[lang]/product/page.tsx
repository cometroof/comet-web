import FooterNew from "@/components/app/footer";
import "./product.css";
import { BlueScopeCertifications } from "../home/certifications";
import { ParamsLang } from "../types-general";
import { getPageDictionary } from "../dictionaries";

export default async function ProductPage({
  params,
}: {
  params: Promise<ParamsLang>;
}) {
  const { lang } = await params;
  const home = (await getPageDictionary(lang || "en", "home")) as any;
  return (
    <>
      <section className="top-header sticky min-h-screen  product-cover">
        <div className="outer-wrapper">
          <div className="inner-wrapper">
            <div className="pt-24 space-y-7">
              <h2 className="text-caption">OUR PRODUCTS</h2>
              <p className="span-inner-red text-heading2 max-w-[597px]">
                Explore the <span>key advantages</span> that showcases our
                commitment to delivering reliable, high-quality metal roofing.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative">
        <BlueScopeCertifications
          description={home.certifications.blueScopeDescription}
        />
      </section>
      <section className="bg-amber-100 min-h-screen relative"></section>
      <FooterNew className="bg-app-light-gray" />
    </>
  );
}
